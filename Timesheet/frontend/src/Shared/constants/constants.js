export const defaultUser = {
  name: "",
  password: "",
  email: "",
  avatar: "",
  type: "",
  salary: ""
};

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

export const baseInvoiceUrl = "http://localhost:3002"; 
export const baseEmployeeUrl = "http://localhost:3003"; 
export const baseTimesheetUrl = "http://localhost:3005"; 
export const baseSubmissiontUrl = "http://localhost:3006"; 