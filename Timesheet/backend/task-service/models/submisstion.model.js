import { getDB } from '../configs/mongoose.js';
import { ObjectId } from 'mongodb';
import { SUBMITION_STATUS, delay } from '../controllers/submisstion.controller.js';

const timesheetCollectionName = 'timesheets';
const timesheetSubmitionCollectionName = 'timesheet_submissions';

const createSubmission = async (data) => {
  try {
    const defaulData = {
      employeeId: "",
      status: SUBMITION_STATUS.CHECK_INVALID_INVOICE,
      created_at: new Date(),
      isReject: false,
      _destroy: false,
    }
    const insertValue = {
      ...defaulData,
      ...data
    }
    const result = await getDB().collection(timesheetSubmitionCollectionName).insertOne(insertValue)
    return result;
  } catch (error) {
    throw new Error(error)
  }
}

const updateSubmission = async (id, data) => {
  try {
    const updateData = { ...data }

    const result = await getDB().collection(timesheetSubmitionCollectionName).findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: updateData },
      { returnOriginal: false }
    )

    return result.value
  } catch (error) {
    throw new Error(error)
  }
}

const getSubmission = async (id) => {
  try {
    const result = await getDB().collection(timesheetSubmitionCollectionName).findOne({ _id: ObjectId(id) });
    const timesheets = await getDB().collection(timesheetCollectionName).find({ employeeId: result.employeeId }).toArray();
    return {
      ...result,
      timesheets: (timesheets || []).filter((timesheet) => timesheet.submissionId == result._id)
    }
  } catch (error) {
    throw new Error(error)
  }
}

// const getTimesheetSubmissions = async (employeeId) => {
//   try {
//     const result = await getDB().collection(timesheetSubmitionCollectionName).find(employeeId ? { employeeId: employeeId, _destroy: false } : { _destroy: false }).toArray()
//     for (let i = 0; i < result.length; i++) {
//       const timesheets = await getDB().collection(timesheetCollectionName).find({ submissionId: result[i]._id }).toArray()
//       result[i].timesheets = timesheets
//     }
//     return result.sort((a, b) => {
//       return new Date(b.created_at) - new Date(a.created_at)
//     });
//   } catch (error) {
//     throw new Error(error)
//   }
// }

const getTimesheetSubmissions = async (employeeId) => {
  try {
    const db = getDB();
    const submissionQuery = employeeId ? { employeeId: employeeId, _destroy: false } : { _destroy: false };
    
    const submissions = await db.collection(timesheetSubmitionCollectionName).find(submissionQuery).toArray();
    
    const submissionPromises = submissions.map(async (submission) => {
      const timesheets = await db.collection(timesheetCollectionName).find({ employeeId: submission.employeeId }).toArray();
      
      submission.timesheets = (timesheets || []).filter((timesheet) => timesheet.submissionId == submission._id);
      return submission;
    });
    
    const populatedSubmissions = await Promise.all(submissionPromises);

    return populatedSubmissions.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  } catch (error) {
    throw new Error(error);
  }
}


const deleteTimesheetSubmission = async (id) => {
  try {
    const result = await getDB().collection(timesheetSubmitionCollectionName).updateOne(
      { _id: ObjectId(id) },
      { $set: { _destroy: true } }
    )

    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const SubmisstionModel = {
  getSubmission,
  updateSubmission,
  createSubmission,
  getTimesheetSubmissions,
  deleteTimesheetSubmission
}
