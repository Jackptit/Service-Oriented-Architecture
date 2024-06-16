import { SubmisstionModel } from "../models/submisstion.model.js";
import axios from 'axios';
import { io } from "../socket.js";

export const SUBMITION_STATUS = {
  'CHECK_INVALID_INVOICE': 'CHECK_INVALID_INVOICE',
  'CHECK_INVALID_TIME': 'CHECK_INVALID_TIME',
  'CONFIRM_OT': 'CONFIRM_OT',
  'CHECK_OVER_LIMIT_HOURS': 'CHECK_OVER_LIMIT_HOURS',
  'SEND_MAIL': 'SEND_MAIL',
  'APPROVED': 'APPROVED',
  'REJECTED': 'REJECTED'
};

export const SUBMITION_STATUS_INDEX = {
  'CHECK_INVALID_INVOICE': 0,
  'CHECK_INVALID_TIME': 1,
  'CONFIRM_OT': 2,
  'CHECK_OVER_LIMIT_HOURS': 3,
  'SEND_MAIL': 4,
  'APPROVED': 5,
  'REJECTED': 6
};

// different time < 15 minutes => return true
const isSameTime = (time_1, time_2) => {
  const time1 = new Date(time_1).getTime();
  const time2 = new Date(time_2).getTime();
  return Math.abs(time1 - time2) < 15 * 60 * 1000;
}

async function getSubmission(req, res) {
  const { id } = req.params;
  const result = await SubmisstionModel.getSubmission(id);
  res.send(result);
}

async function submitTimesheet(req, res) {
  // Khởi tạo dữ liệu
  let { timesheets, employeeId, _id } = req.body;
  if (!_id) {
    const submissionData = {
      employeeId: employeeId,
      status: SUBMITION_STATUS.CHECK_INVALID_INVOICE,
      created_at: new Date(),
    }
    const submission = await SubmisstionModel.createSubmission(submissionData);
    _id = submission.insertedId;
    timesheets = timesheets.map(item => ({ ...item, submissionId: submission.insertedId }));
    await axios.post('http://localhost:3005/timesheet/create-many', timesheets);
  }
  const timesheetSubmissionData = await SubmisstionModel.getSubmission(_id);
  employeeId = timesheetSubmissionData.employeeId;
  const timesheetData = timesheetSubmissionData.timesheets;
  const invoiceIds = timesheetData.map(item => item.invoiceId);
  const invoiceData = await Promise.resolve(
    axios.post('http://localhost:3002/invoice/get-many', {
      invoiceIds: invoiceIds
    }).then(data => data.data)
  )
  const employee = await Promise.resolve(
    axios.get(`http://localhost:3003/employee/${employeeId}`).then(data => data.data)
  )
  console.log('invoiceData', invoiceData);
  res.send(timesheetSubmissionData);

  // Kiểm tra hóa đơn đã được tạo cho một bảng chấm công khác chưa
  if (SUBMITION_STATUS_INDEX[timesheetSubmissionData.status] === SUBMITION_STATUS_INDEX[SUBMITION_STATUS.CHECK_INVALID_INVOICE]) {
    await delay(3000);
    const isExistInvalidInvoice = invoiceData.some(item => item.timesheetId || item.employeeId);
    if (isExistInvalidInvoice) {
      await rejectTimesheet(timesheetSubmissionData);
      return;
    } 
    await updateTimesheetSubmissionStatus(_id, SUBMITION_STATUS.CHECK_INVALID_TIME);
    timesheetSubmissionData.status = SUBMITION_STATUS.CHECK_INVALID_TIME;
  }

  // Kiểm tra trùng thời gian giữa bảng chấm công và hóa đơn
  if (SUBMITION_STATUS_INDEX[timesheetSubmissionData.status] === SUBMITION_STATUS_INDEX[SUBMITION_STATUS.CHECK_INVALID_TIME]) {
    await delay(3000);
    const invalidTimesheets = [];
    timesheetData.forEach(element => {
      const invoice = invoiceData.find(item => item._id === element.invoiceId);
      if (!isSameTime(element.startTime, invoice.startTime) || !isSameTime(element.endTime, invoice.endTime)) {
        invalidTimesheets.push(element._id);
      }
    });
    if (invalidTimesheets.length > 0) {
      await rejectTimesheet(timesheetSubmissionData);
      return;
    }
    await updateTimesheetSubmissionStatus(_id, SUBMITION_STATUS.CONFIRM_OT);
    timesheetSubmissionData.status = SUBMITION_STATUS.CONFIRM_OT;
  }

  // Xác nhận làm thêm giờ
  await delay(3000);
  if (SUBMITION_STATUS_INDEX[timesheetSubmissionData.status] === SUBMITION_STATUS_INDEX[SUBMITION_STATUS.CONFIRM_OT]) {
    const isHasOverTime = timesheetData.some(item => item.overTime && item.overTime > 0 && !item.isConfirmed);
    if (isHasOverTime) {
      await axios.post('http://localhost:3001/notification/send-mail', {
        email: "phonvan128@gmail.com",
        message: `Bảng chấm công cần được xác thực (http://localhost:3004/confirm-timesheet/${timesheetSubmissionData._id}).`,
        subject: "Xác thực bảng chấm công."
      });
      return;
    }
    await updateTimesheetSubmissionStatus(_id, SUBMITION_STATUS.CHECK_OVER_LIMIT_HOURS);
    timesheetSubmissionData.status = SUBMITION_STATUS.CHECK_OVER_LIMIT_HOURS;
  }

  // Kiểm tra giới hạn làm việc trong 1 tuần
  if (SUBMITION_STATUS_INDEX[timesheetSubmissionData.status] === SUBMITION_STATUS_INDEX[SUBMITION_STATUS.CHECK_OVER_LIMIT_HOURS]) {
    await delay(3000);
    const limtHours = employee.limit_hours;
    const overTime = timesheetData.reduce((acc, item) => {
      const startTime = new Date(item.startTime).getTime();
      const endTime = new Date(item.endTime).getTime();
      const diff = (endTime - startTime) / 1000 / 60 / 60;
      const overTime = item.overTime || 0;
      return acc + diff + overTime;
    }, 0);

    if (overTime > limtHours) {
      rejectTimesheet(timesheetSubmissionData);
      return;
    }
    await updateTimesheetSubmissionStatus(_id, SUBMITION_STATUS.SEND_MAIL);
  }

  // Gửi mail thông báo
  await delay(3000);
  await axios.post('http://localhost:3001/notification/send-mail', {
    email: "phonvan128@gmail.com",
    message: "Bảng chấm công của bạn đã được duyệt.",
    subject: "Thông báo nộp bảng chấm công đã được duyệt."
  });

  // Duyệt bảng chấm công
  await delay(3000);
  await updateTimesheetSubmissionStatus(_id, SUBMITION_STATUS.APPROVED);
}

export function delay(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

async function updateTimesheetSubmissionStatus(submissionId, status) {
  await SubmisstionModel.updateSubmission(submissionId, {
    status: status
  });
  io.emit('change_status', { submissionId, status, type: 'change_status' });
}

async function rejectTimesheet(timesheetSubmissionData) {
  await SubmisstionModel.updateSubmission(timesheetSubmissionData._id, {
    isReject: true
  });
  await Promise.resolve(
    axios.post('http://localhost:3001/notification/send-mail', {
      email: "phonvan128@gmail.com",
      message: `Bảng chấm công của bạn đã bị hủy. Lý do bảng chấm công không hợp lệ`,
      subject: "Thông báo nộp bảng chấm công bị hủy."
    })
  );
  io.emit('reject', { submissionId: timesheetSubmissionData._id, type: 'reject' });
  // Socket
}

async function deleteTimesheetSubmission(req, res) {
  const { id } = req.params;
  const result = await SubmisstionModel.deleteTimesheetSubmission(id);
  res.send(result);
}

async function getTimesheetSubmissions(req, res) {
  const { employeeId } = req.query;
  const result = await SubmisstionModel.getTimesheetSubmissions(employeeId);
  res.send(result);
}

export {
  submitTimesheet,
  getSubmission,
  getTimesheetSubmissions,
  deleteTimesheetSubmission
}