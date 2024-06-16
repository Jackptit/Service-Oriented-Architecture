import { TimesheetModel } from "../models/timesheet.model.js";

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

async function getDetail(req, res) {
  const { id } = req.params;
  const result = await TimesheetModel.getOne(id);
  res.send(result);
}

async function create(req, res) {
  try {
    const data = req.body;
    const result = await TimesheetModel.createNew(data);
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
}

async function createMany(req, res) {
  try {
    const data = req.body;
    const result = await TimesheetModel.createMany(data);
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
}

async function getTimesheetByUserId(req, res) {
  const { id } = req.params;
  const result = await TimesheetModel.getAll({ employeeId: id });
  res.send(result);
}

async function update(req, res) {
  const { id } = req.params;
  const data = req.body;
  const result = await TimesheetModel.update(id, data);
  res.send(result);
}

export {
  getDetail,
  create,
  update,
  createMany,
  getTimesheetByUserId
}