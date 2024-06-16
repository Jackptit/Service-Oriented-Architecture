import { getDB } from '../configs/mongoose.js';
import { ObjectId } from 'mongodb';

const timesheetCollectionName = 'timesheets';

const getAll = async (filter = {}) => {
  try {
    const result = await getDB().collection(timesheetCollectionName).find({ ...filter, _destroy: false }).toArray()
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getOne = async (id) => {
  try {
    const result = await getDB().collection(timesheetCollectionName).findOne({ _id: ObjectId(id) })
    return result
  } catch (error) {
    // throw new Error(error)
  }
}

const getMany = async (ids) => {
  try {
    const transformIds = ids.map(id => ObjectId(id))
    const result = await getDB().collection(timesheetCollectionName).find({ _id: { $in: transformIds } }).toArray()
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const createNew = async (data) => {
  try {
    const defaulTimesheetData = {
      employeeId: "",
      startTime: new Date(),
      endTime: new Date(),
      overTime: 0,
      invoiceId: "",
      submissionId: "",
      isConfirmed: false,
      created_at: new Date(),
      updated_at: new Date(),
      _destroy: false,
    }
    const insertValue = {
      ...defaulTimesheetData,
      ...data,
      _destroy: false,
    }
    const result = await getDB().collection(timesheetCollectionName).insertOne(insertValue)
    return result;
  } catch (error) {
    throw new Error(error)
  }
}

const createMany = async (data) => {
  try {
    const defaulTimesheetData = {
      employeeId: "",
      startTime: new Date(),
      endTime: new Date(),
      overTime: 0,
      submissionId: "",
      invoiceId: "",
      isConfirmed: false,
      created_at: new Date(),
      updated_at: new Date(),
      _destroy: false,
    }
    data = data.map(item => ({
      ...defaulTimesheetData,
      ...item,
    }))
    console.log("data", data)
    const result = await getDB().collection(timesheetCollectionName).insertMany(data)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (id, data) => {
  try {
    const updateData = { ...data }

    const result = await getDB().collection(timesheetCollectionName).findOneAndUpdate(
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
    const result = await getDB().collection(timesheetCollectionName).updateMany(
      { _id: { $in: transformIds } },
      { $set: { _destroy: true } }
    )

    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const TimesheetModel = {
  createNew,
  deleteMany,
  update,
  createMany,
  getAll,
  getOne,
  getMany
}
