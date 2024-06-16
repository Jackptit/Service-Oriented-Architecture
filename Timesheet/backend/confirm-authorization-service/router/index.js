import express  from "express";
import axios from 'axios';
const router = express.Router();

async function confirm(request, response) {
  const id = request.params.id;
  console.log('id', id);  
  const timesheetSubmissionData = await axios.get('http://localhost:3006/task-service/submission/' + id);
  const timesheetData = timesheetSubmissionData.data.timesheets;
  timesheetData?.forEach(async (element) => {
    if (element.overTime > 0 && !element.isConfirmed) {
      await axios.put('http://localhost:3005/timesheet/' + element._id, {
        isConfirmed: true,
      });
    }
  });

  await axios.post('http://localhost:3006/task-service/submit', {
    _id: id,
  });

  response.send('Success');
}

router.route('/:id')
  .get(confirm)

export const confirmRoutes = router;