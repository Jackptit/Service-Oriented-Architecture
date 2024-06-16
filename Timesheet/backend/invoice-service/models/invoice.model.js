import { getDB } from '../configs/mongoose.js';
import { ObjectId } from 'mongodb';

const invoiceCollectionName = 'invoices';

const getAll = async (filter = { employeeId: "" }) => {
  try {
    const result = await getDB().collection(invoiceCollectionName).find({ ...filter, _destroy: false }).toArray()
    return result.filter(item => !item.employeeId)
  } catch (error) {
    throw new Error(error)
  }
}

const getMany = async (ids) => {
  try {
    const transformIds = ids.map(id => ObjectId(id))
    const result = await getDB().collection(invoiceCollectionName).find({ _id: { $in: transformIds } }).toArray()
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getOne = async (id) => {
  try {
    const result = await getDB().collection(invoiceCollectionName).findOne({ _id: ObjectId(id) })
    return result
  } catch (error) {
    // throw new Error(error)
  }
}

const createNew = async (data) => {
  try {
    const defaulInvoiceData = {
      employeeId: null,
      startTime: new Date(),
      endTime: new Date(),
      date: new Date,
      status: 'PAID',
      note: '',
      price: 3000000,
      customer: 'Khách hàng 1',
      created_at: new Date(),
      updated_at: new Date(),
      _destroy: false,
    }
    const insertValue = {
      ...defaulInvoiceData,
      ...data,
      _destroy: false,
    }
    const result = await getDB().collection(invoiceCollectionName).insertOne(insertValue)
    return result;
  } catch (error) {
    throw new Error(error)
  }
}

const createMany = async (data) => {
  try {
    const defaulInvoiceData = {
      employeeId: null,
      startTime: new Date(),
      endTime: new Date(),
      date: new Date,
      status: 'PAID',
      note: '',
      price: 3000000,
      customer: 'Khách hàng 1',
      created_at: new Date(),
      updated_at: new Date(),
      _destroy: false,
    }
    data = data.map(item => ({
      ...defaulInvoiceData,
      ...item,
    }))
    const result = await getDB().collection(invoiceCollectionName).insertMany(data)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (id, data) => {
  try {
    const updateData = { ...data }

    const result = await getDB().collection(invoiceCollectionName).findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: updateData },
      { returnOriginal: false }
    )

    return result.value
  } catch (error) {
    throw new Error(error)
  }
}

const deleteMany = async (ids) => {
  try {
    const transformIds = ids.map(id => ObjectId(id))
    const result = await getDB().collection(invoiceCollectionName).updateMany(
      { _id: { $in: transformIds } },
      { $set: { _destroy: true } }
    )

    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const InvoiceModel = {
  createNew,
  deleteMany,
  update,
  createMany,
  getAll,
  getOne,
  getMany,
  invoiceCollectionName
}
