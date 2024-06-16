import { InvoiceModel } from "../models/invoice.model.js";

async function getAll(req, res) {
  const result = await InvoiceModel.getAll();
  res.send(result);
}

async function getDetail(req, res) {
  const { id } = req.params;
  const result = await InvoiceModel.getOne(id);
  res.send(result);
}

async function create(req, res) {
  try {
    const data = req.body;
    const result = await InvoiceModel.createNew(data);
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
}

async function fakeData(req, res) {
  const result = await InvoiceModel.createMany(sampleData);
  res.send(result);
}

async function getMany(req, res) {
  const { invoiceIds } = req.body;
  const result = await InvoiceModel.getMany(invoiceIds);
  res.send(result);
}

export {
  getAll,
  getDetail,
  create,
  fakeData,
  getMany
};

const sampleData = [
  {
    employeeId: "",
    startTime: "2024-04-24T16:07:01.404Z",
    endTime: "2024-04-24T16:07:01.404Z",
    date: "2024-04-24T16:07:01.404Z",
    status: "PAID",
    note: "",
    price: "3000000",
    customer: "Khách hàng A",
    created_at: "2024-04-24T16:07:01.404Z",
    updated_at: "2024-04-24T16:07:01.404Z",
    _destroy: false,
  },
  {
    employeeId: "",
    startTime: "2024-04-24T16:07:01.404Z",
    endTime: "2024-04-24T16:07:01.404Z",
    date: "2024-04-24T16:07:01.404Z",
    status: "PAID",
    note: "",
    price: "3000000",
    customer: "Khách hàng B",
    created_at: "2024-04-24T16:07:01.404Z",
    updated_at: "2024-04-24T16:07:01.404Z",
    _destroy: false,
  },
  {
    employeeId: "",
    startTime: "2024-04-24T16:07:01.404Z",
    endTime: "2024-04-24T16:07:01.404Z",
    date: "2024-04-24T16:07:01.404Z",
    status: "PAID",
    note: "",
    price: "3000000",
    customer: "Khách hàng C",
    created_at: "2024-04-24T16:07:01.404Z",
    updated_at: "2024-04-24T16:07:01.404Z",
    _destroy: false,
  },
  {
    employeeId: "",
    startTime: "2024-04-24T16:07:01.404Z",
    endTime: "2024-04-24T16:07:01.404Z",
    date: "2024-04-24T16:07:01.404Z",
    status: "PAID",
    note: "",
    price: "3000000",
    customer: "Khách hàng D",
    created_at: "2024-04-24T16:07:01.404Z",
    updated_at: "2024-04-24T16:07:01.404Z",
    _destroy: false,
  },
  {
    employeeId: "",
    startTime: "2024-04-24T16:07:01.404Z",
    endTime: "2024-04-24T16:07:01.404Z",
    date: "2024-04-24T16:07:01.404Z",
    status: "PAID",
    note: "",
    price: "3000000",
    customer: "Khách hàng E",
    created_at: "2024-04-24T16:07:01.404Z",
    updated_at: "2024-04-24T16:07:01.404Z",
    _destroy: false,
  },
  {
    employeeId: "",
    startTime: "2024-04-24T16:07:01.404Z",
    endTime: "2024-04-24T16:07:01.404Z",
    date: "2024-04-24T16:07:01.404Z",
    status: "PAID",
    note: "",
    price: "3000000",
    customer: "Khách hàng F",
    created_at: "2024-04-24T16:07:01.404Z",
    updated_at: "2024-04-24T16:07:01.404Z",
    _destroy: false,
  },
  {
    employeeId: "",
    startTime: "2024-04-24T16:07:01.404Z",
    endTime: "2024-04-24T16:07:01.404Z",
    date: "2024-04-24T16:07:01.404Z",
    status: "PAID",
    note: "",
    price: "3000000",
    customer: "Khách hàng G",
    created_at: "2024-04-24T16:07:01.404Z",
    updated_at: "2024-04-24T16:07:01.404Z",
    _destroy: false,
  },
  {
    employeeId: "",
    startTime: "2024-04-24T16:07:01.404Z",
    endTime: "2024-04-24T16:07:01.404Z",
    date: "2024-04-24T16:07:01.404Z",
    status: "PAID",
    note: "",
    price: "3000000",
    customer: "Khách hàng H",
    created_at: "2024-04-24T16:07:01.404Z",
    updated_at: "2024-04-24T16:07:01.404Z",
    _destroy: false,
  },
  {
    employeeId: "",
    startTime: "2024-04-24T16:07:01.404Z",
    endTime: "2024-04-24T16:07:01.404Z",
    date: "2024-04-24T16:07:01.404Z",
    status: "PAID",
    note: "",
    price: "3000000",
    customer: "Khách hàng I",
    created_at: "2024-04-24T16:07:01.404Z",
    updated_at: "2024-04-24T16:07:01.404Z",
    _destroy: false,
  },
  {
    employeeId: "",
    startTime: "2024-04-24T16:07:01.404Z",
    endTime: "2024-04-24T16:07:01.404Z",
    date: "2024-04-24T16:07:01.404Z",
    status: "PAID",
    note: "",
    price: "3000000",
    customer: "Khách hàng J",
    created_at: "2024-04-24T16:07:01.404Z",
    updated_at: "2024-04-24T16:07:01.404Z",
    _destroy: false,
  }
];