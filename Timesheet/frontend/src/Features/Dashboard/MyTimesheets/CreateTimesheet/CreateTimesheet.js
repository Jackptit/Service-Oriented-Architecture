import { Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Input, LinearProgress, MenuItem, Select, Stack, Step, StepContent, StepLabel, Stepper } from '@mui/material';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../../Api';
import { SUBMITION_STATUS, SUBMITION_STATUS_INDEX, baseEmployeeUrl, baseInvoiceUrl, baseSubmissiontUrl } from '../../../../Shared/constants/constants';
import '../../ConfirmTimesheets/ConfirmTimesheets.css';
import './CreateTimesheet.css';

export const steps = [
  {
    label: 'Đang kiểm tra hóa đơn'
  },
  {
    label: 'Đang so sánh thời gian làm việc với hóa đơn'
  },
  {
    label: 'Đang chờ xác thực làm thêm giờ'
  },
  {
    label: 'Đang kiểm tra tổng giờ làm có vượt qua giới hạn không'
  },
  {
    label: 'Đang gửi email thông báo'
  },
  {
    label: 'Hoàn thành'
  }
];

const defaultForm = {
  invoiceId: null,
  startTime: null,
  endTime: null,
  overTime: 0
}

function CreateTimesheet({ readOnly, timesheetData, handleDeleteTimesheetSubmit }) {
  const navigate = useNavigate();

  const [isShowCreateSheet, setIsShowCreateSheet] = React.useState(false);
  const [createSheetForm, setCreateSheetForm] = React.useState(defaultForm);
  const [invoices, setInvoices] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [timesheets, setTimesheets] = React.useState(timesheetData?.timesheets || []);
  const [status, setStatus] = React.useState(timesheetData?.status ? SUBMITION_STATUS_INDEX[timesheetData?.status] : -1);
  const [selectUser, setSelectUser] = React.useState(timesheetData?.employeeId || null);

  const fetchInvoices = async () => {
    const invoices = await axiosInstance.get(baseInvoiceUrl + '/invoice/get-all');
    if (readOnly) {
      setTimesheets(timesheets.map((item) => ({
        ...item,
        customer: invoices.data.find((it) => it._id === item.invoiceId).customer,
        price: invoices.data.find((it) => it._id === item.invoiceId).price
      })))
    }
    setInvoices(invoices.data)
  }

  useEffect(() => {
    if (timesheetData) {
      setStatus(timesheetData.status ? SUBMITION_STATUS_INDEX[timesheetData.status] : -1);
    }
  }, [timesheetData])

  const fetchUsers = async () => {
    const users = await axiosInstance.get(baseEmployeeUrl + '/employee/get-all');
    setUsers(users.data)
  }

  useEffect(() => {
    fetchInvoices();
    fetchUsers();
  }, [])

  const handleAddSheet = () => {
    setIsShowCreateSheet(false);
    const invoice = invoices.find((item) => item._id === createSheetForm.invoiceId);
    const newData = {
      ...createSheetForm,
      customer: invoice.customer,
      price: invoice.price
    }
    setTimesheets([
      ...timesheets,
      newData
    ]);
    setCreateSheetForm({
      ...defaultForm
    })
  }

  const handleSubmit = async () => {
    if (timesheets.length === 0) {
      alert('Vui lòng thêm công');
      return;
    }
    await axiosInstance.post(baseSubmissiontUrl + '/task-service/submit', {
      employeeId: selectUser,
      timesheets: timesheets.map((item) => {
        console.log(item);
        return {
          employeeId: selectUser,
          startTime: item.startTime,
          invoiceId: item.invoiceId,
          endTime: item.endTime,
          overTime: item.overTime || 0
        }
      }),
    });
    navigate('../');
  }

  const handleDelete = async () => {
    await axiosInstance.delete(baseSubmissiontUrl + '/task-service/submissions/' + timesheetData._id);
    handleDeleteTimesheetSubmit();
  }

  return (
    <div>
      {
        !readOnly && 
          <div className='header' style={{
            borderBottom: "1px solid #ccc",
            paddingBottom: "16px",
          }}>
            <h1 style={{
              fontSize: "20px",
              fontWeight: "600",
            }}>Tạo bảng chấm công</h1>
          </div>
      }

      <div style={
        readOnly ? 
        {
          padding: "24px 16px",
          border: "1px solid #ccc",
          display: "flex",
          borderRadius: "8px",
        } : 
        {
          padding: "24px 0",
          borderBottom: "1px solid #ccc",
          display: "flex",
        }} 
        className='container'
      >
        <div style={{
          width: "40%",
          borderRight: "1px solid #ccc",
          paddingRight: "24px"
        }}>
          {
            timesheetData?.isReject &&  <Chip style={{ marginBottom: '8px' }} label="Đã bị hủy" color="error" variant="outlined" />
          }
          {
            timesheetData?.status === SUBMITION_STATUS.APPROVED &&  <Chip style={{ marginBottom: '8px' }} label="Đã được duyệt" color="success" variant="outlined" />
          }

          <div>Thông tin nhân viên</div>
        
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              marginTop: "12px"
            }}
          >
            <Select 
              readOnly={readOnly}
              value={selectUser} 
              onChange={(e) => {
                setSelectUser(e.target.value)
              }} 
              fullWidth 
              placeholder='Chọn nhân viên'
            >
              {(users || []).map((user) => (
                <MenuItem key={user._id} value={user._id}>{user.name}</MenuItem>
              ))}
            </Select>

            <div
              className='status-container'
              style={{
                display: "flex",
                gap: "16px"
              }}
            >
              <Stepper activeStep={status} orientation="vertical">
                {steps.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel
                      optional={null}
                    >
                      {step.label}
                    </StepLabel>
                    <StepContent>
                      { index !== 5 && !timesheetData?.isReject && <LinearProgress />}
                    </StepContent>
                  </Step>
                ))}
              </Stepper>

            </div>
          </div>
        </div>
        <div style={{
          width: "60%",
          paddingLeft: "24px",
        }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>Danh sách công</div>
            <div>
              {
                readOnly ?
                  <>
                    {/* <Button variant='contained' onClick={() => { navigate('../') }}>Sửa</Button> */}
                    <Button style={{ marginLeft: '12px '}} variant='contained' color="error" onClick={handleDelete}>Xóa</Button>
                  </>
                  :
                  <Button variant='contained' onClick={() => { setIsShowCreateSheet(true) }}>Tạo công</Button>
              }
            </div>
          </div>
          
          <div style={{
            maxHeight: "800px",
            overflowY: "auto",
          }}>
            {/* danh sách công */}
            {
              (timesheets || []).map((timesheet) => (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    padding: "12px",
                    border: "1px solid #ccc",
                    marginTop: "12px"
                  }}
                >
                  <div 
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}
                  >
                    <div>Hóa đơn: {timesheet.invoiceId}</div>
                    <div>Khách hàng: {timesheet.customer}</div>
                    <div>Đơn giá: {timesheet.price}</div>
                    <div>Thời gian bắt đầu: {moment(timesheet.startTime).format('MMMM Do YYYY, h:mm a')}</div>
                    <div>Thời gian kết thúc: {moment(timesheet.endTime).format('MMMM Do YYYY, h:mm a')}</div>
                  </div>
                  {
                    !readOnly &&
                      <div>
                        <Button variant='outlined' onClick={() => {setTimesheets(timesheets.filter((item) => item.invoiceId !== timesheet.invoiceId))}}>Xóa</Button>
                      </div>
                  }
                </div>
              ))
            }
          </div>
        </div>
      </div>

      {
        !readOnly && 
          <div style={{
            padding: "24px 0",
            display: "flex",
            gap: "16px",
            justifyContent: "flex-end"
          }}>
            <Button variant="outlined" color="error" onClick={() => navigate("../")}>Hủy bỏ</Button>
            <Button variant="contained" onClick={handleSubmit}>Tạo bảng chấm công</Button>
          </div>
      }

      <Dialog
        open={isShowCreateSheet}
        onClose={() => setIsShowCreateSheet(false)}
      >
        <DialogTitle 
          sx={{
            minWidth: '500px'
          }}
        >
          Tạo công
        </DialogTitle>
        <DialogContent>
          <Stack spacing={4} >
            <div>
              <div>Chọn hóa đơn</div>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={createSheetForm.invoiceId}
                onChange={(e) => setCreateSheetForm({
                  ...createSheetForm,
                  invoiceId: e.target.value
                })}
                fullWidth
                sx={{
                  marginTop: "16px"
                }}

              >
                {(invoices || []).filter((item) => !timesheets.some((it) => it.invoiceId === item._id)).map((invoice) => (
                  <MenuItem key={invoice._id} value={invoice._id}>
                    <div style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px"
                    }}>
                      <div>Tên khách hàng: {invoice.customer}</div>
                      <div>Đơn giá: {invoice.price}</div>
                      <div>Thời gian bắt đầu: {moment(invoice.startTime).format('MMMM Do YYYY, h:mm a')}</div>
                      <div>Thời gian kết thúc: {moment(invoice.endTime).format('MMMM Do YYYY, h:mm a')}</div>
                    </div>
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div>
              <div>Nhập thời gian bắt đầu</div>
              <Input 
                value={createSheetForm.startTime} 
                placeholder='Nhập thời gian bắt đầu' 
                fullWidth 
                type='datetime-local' 
                onChange={(e) => {
                  setCreateSheetForm({
                    ...createSheetForm,
                    startTime: e.target.value
                  })
                }}
              />
            </div>
            <div>
              <div>Nhập thời gian kết thúc</div>
              <Input 
                placeholder='Nhập thời gian kết thúc' 
                fullWidth 
                type='datetime-local' 
                value={createSheetForm.endTime}
                onChange={(e) => {
                  setCreateSheetForm({
                    ...createSheetForm,
                    endTime: e.target.value
                  })
                }}
              />
            </div>
            <div>
              <div>Làm thêm giờ</div>
              <Input 
                fullWidth 
                type='number' 
                value={createSheetForm.overTime}
                onChange={(e) => {
                  setCreateSheetForm({
                    ...createSheetForm,
                    overTime: e.target.value
                  })
                }}
              />
            </div>
          </Stack>
        </DialogContent>
        <DialogActions
          sx={{
            padding: '0 24px 24px 24px'
          }}
        >
          <Button 
            onClick={() => {
              setIsShowCreateSheet(false)
              setCreateSheetForm({
                ...defaultForm
              })
            }} 
            variant="outlined"
          >
            Hủy bỏ
          </Button>
          <Button onClick={handleAddSheet} variant="contained">Thêm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateTimesheet;