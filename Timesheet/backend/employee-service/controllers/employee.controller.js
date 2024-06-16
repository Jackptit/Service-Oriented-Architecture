import { EmployeeModel } from "../models/employee.model.js";
import axios from 'axios';

async function getAll(req, res) {
  const result = await EmployeeModel.getAll();
  res.send(result);
}

async function getEmployeeDetails(req, res) {
  const { id } = req.params;
  const result = await EmployeeModel.getOne(id);
  res.send(result);
}

async function getLimitHours(req, res) {
  const { id } = req.params;
  const result = await EmployeeModel.getOne(id);
  const limit_hours = JSON.stringify(result.limit_hours);
  res.json(limit_hours);
}

async function getEmployeeHistory(req, res) {
  axios.post('http://localhost:3001/notification/send-mail', {
    email: "phonvan128@gmail.com",
    message: "Bảng chấm công của bạn đã được duyệt. hi hi hi hi hihhhhhhhhhhhhhhhhhhhhhhhhhhhh",
    subject: "Thông báo nộp bảng chấm công."
  }).then(data => {
    res.send(data.data);
  })
}

async function fakeData(req, res) {
  const result = await EmployeeModel.createMany(sampleData);
  res.send(result);
}

export {
  getAll,
  getEmployeeDetails,
  getLimitHours,
  getEmployeeHistory,
  fakeData
};

const sampleData = [
  {
    name: 'Nguyen Van A',
    email: 'phonvan128@gmail.com',
    role: "STAFF",
    password: '123456',
    limit_hours: 40,
    created_at: "2024-04-24T16:07:01.404Z",
    updated_at: "2024-04-24T16:07:01.404Z",
    _destroy: false,
  },
  {
    name: 'Tran Thi B',
    email: 'phonvan128@gmail.com',
    role: "STAFF",
    password: '123456',
    limit_hours: 40,
    created_at: "2024-04-24T16:07:01.404Z",
    updated_at: "2024-04-24T16:07:01.404Z",
    _destroy: false,
  },
  {
    name: 'Le Van C',
    email: 'phonvan128@gmail.com',
    role: "MANAGER",
    password: '123456',
    limit_hours: 40,
    created_at: "2024-04-24T16:07:01.404Z",
    updated_at: "2024-04-24T16:07:01.404Z",
    _destroy: false,
  },
  {
    name: 'Tran Van D',
    email: 'phonvan128@gmail.com',
    role: "STAFF",
    password: '123456',
    limit_hours: 40,
    created_at: "2024-04-24T16:07:01.404Z",
    updated_at: "2024-04-24T16:07:01.404Z",
    _destroy: false,
  },
  {
    name: 'Pham Thi E',
    email: 'phonvan128@gmail.com',
    role: "STAFF",
    password: '123456',
    limit_hours: 40,
    created_at: "2024-04-24T16:07:01.404Z",
    updated_at: "2024-04-24T16:07:01.404Z",
    _destroy: false,
  },
  {
    name: 'Nguyen Van F',
    email: 'phonvan128@gmail.com',
    role: "STAFF",
    password: '123456',
    limit_hours: 40,
    created_at: "2024-04-24T16:07:01.404Z",
    updated_at: "2024-04-24T16:07:01.404Z",
    _destroy: false,
  },
  {
    name: 'Le Thi G',
    email: 'phonvan128@gmail.com',
    role: "STAFF",
    password: '123456',
    limit_hours: 40,
    created_at: "2024-04-24T16:07:01.404Z",
    updated_at: "2024-04-24T16:07:01.404Z",
    _destroy: false,
  },
  {
    name: 'Pham Van H',
    email: 'phonvan128@gmail.com',
    role: "STAFF",
    password: '123456',
    limit_hours: 40,
    created_at: "2024-04-24T16:07:01.404Z",
    updated_at: "2024-04-24T16:07:01.404Z",
    _destroy: false,
  },
  {
    name: 'Tran Thi I',
    email: 'phonvan128@gmail.com',
    role: "STAFF",
    password: '123456',
    limit_hours: 40,
    created_at: "2024-04-24T16:07:01.404Z",
    updated_at: "2024-04-24T16:07:01.404Z",
    _destroy: false,
  },
  {
    name: 'Nguyen Van J',
    email: 'phonvan128@gmail.com',
    role: "STAFF",
    password: '123456',
    limit_hours: 40,
    created_at: "2024-04-24T16:07:01.404Z",
    updated_at: "2024-04-24T16:07:01.404Z",
    _destroy: false,
  },
  {
    name: 'Le Thi K',
    email: 'phonvan128@gmail.com',
    role: "STAFF",
    password: '123456',
    limit_hours: 40,
    created_at: "2024-04-24T16:07:01.404Z",
    updated_at: "2024-04-24T16:07:01.404Z",
    _destroy: false,
  },
  {
    name: 'Pham Van L',
    email: 'phonvan128@gmail.com',
    role: "STAFF",
    password: '123456',
    limit_hours: 40,
    created_at: "2024-04-24T16:07:01.404Z",
    updated_at: "2024-04-24T16:07:01.404Z",
    _destroy: false,
  },
  {
    name: 'Tran Van M',
    email: 'phonvan128@gmail.com',
    role: "STAFF",
    password: '123456',
    limit_hours: 40,
    created_at: "2024-04-24T16:07:01.404Z",
    updated_at: "2024-04-24T16:07:01.404Z",
    _destroy: false,
  },
  {
    name: 'Nguyen Thi N',
    email: 'phonvan128@gmail.com',
    role: "STAFF",
    password: '123456',
    limit_hours: 40,
    created_at: "2024-04-24T16:07:01.404Z",
    updated_at: "2024-04-24T16:07:01.404Z",
    _destroy: false,
  },
  {
    name: 'Le Van O',
    email: 'phonvan128@gmail.com',
    role: "STAFF",
    password: '123456',
    limit_hours: 40,
    created_at: "2024-04-24T16:07:01.404Z",
    updated_at: "2024-04-24T16:07:01.404Z",
    _destroy: false,
  },
  {
    name: 'Pham Thi P',
    email: 'phonvan128@gmail.com',
    role: "STAFF",
    password: '123456',
    limit_hours: 40,
    created_at: "2024-04-24T16:07:01.404Z",
    updated_at: "2024-04-24T16:07:01.404Z",
    _destroy: false,
  },
  {
    name: 'Tran Van Q',
    email: 'phonvan128@gmail.com',
    role: "STAFF",
    password: '123456',
    limit_hours: 40,
    created_at: "2024-04-24T16:07:01.404Z",
    updated_at: "2024-04-24T16:07:01.404Z",
    _destroy: false,
  },
  {
    name: 'Nguyen Thi R',
    email: 'phonvan128@gmail.com',
    role: "STAFF",
    password: '123456',
    limit_hours: 40,
    created_at: "2024-04-24T16:07:01.404Z",
    updated_at: "2024-04-24T16:07:01.404Z",
    _destroy: false,
  },
  {
    name: 'Le Van S',
    email: 'phonvan128@gmail.com',
    role: "STAFF",
    password: '123456',
    limit_hours: 40,
    created_at: "2024-04-24T16:07:01.404Z",
    updated_at: "2024-04-24T16:07:01.404Z",
    _destroy: false,
  },
  {
    name: 'Pham Van T',
    email: 'phonvan128@gmail.com',
    role: "STAFF",
    password: '123456',
    limit_hours: 40,
    created_at: "2024-04-24T16:07:01.404Z",
    updated_at: "2024-04-24T16:07:01.404Z",
    _destroy: false,
  }
];
