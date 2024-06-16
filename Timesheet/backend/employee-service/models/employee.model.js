import { getDB } from '../configs/mongoose.js';
import { ObjectId } from 'mongodb';
import { USER_ROLES } from '../utilities/constants.js';

const employeeCollectionName = 'users';

const getAll = async (filter = { role: USER_ROLES.STAFF }) => {
  try {
    const result = await getDB().collection(employeeCollectionName).find({ ...filter, _destroy: false }).toArray()
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getOne = async (id) => {
  try {
    const result = await getDB().collection(employeeCollectionName).findOne({ _id: ObjectId(id) })
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const createNew = async (data) => {
  try {
    const defaulEmployeeData = {
      name: 'Nguyen Van A',
      email: 'phonvan128@gmail.com',
      role: USER_ROLES.STAFF,
      password: '123456',
      limit_hours: 40,
      created_at: new Date(),
      updated_at: new Date(),
      _destroy: false,
    }
    const insertValue = {
      ...defaulEmployeeData,
      ...data,
      _destroy: false,
    }
    const result = await getDB().collection(employeeCollectionName).insertOne(insertValue)
    return insertValue
  } catch (error) {
    throw new Error(error)
  }
}

const createMany = async (data) => {
  try {
    const defaulEmployeeData = {
      name: 'Nguyen Van A',
      email: 'phonvan128@gmail.com',
      role: USER_ROLES.STAFF,
      password: '123456',
      limit_hours: 40,
      created_at: new Date(),
      updated_at: new Date(),
      _destroy: false,
    }
    data = data.map(item => ({
      ...defaulEmployeeData,
      ...item,
    }))
    const result = await getDB().collection(employeeCollectionName).insertMany(data)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (id, data) => {
  try {
    const updateData = { ...data }

    const result = await getDB().collection(employeeCollectionName).findOneAndUpdate(
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
    const result = await getDB().collection(employeeCollectionName).updateMany(
      { _id: { $in: transformIds } },
      { $set: { _destroy: true } }
    )

    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const EmployeeModel = {
  createNew,
  deleteMany,
  update,
  createMany,
  getAll,
  getOne,
  employeeCollectionName
}
