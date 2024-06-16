import express  from "express";
import { 
  getDetail, 
  create, 
  getTimesheetByUserId, 
  createMany,
  update,
} from "../controllers/timesheet.controller.js";
const router = express.Router();

router.route('/get-timesheet/:id')
  .get(getTimesheetByUserId)

router.route('/')
  .post(create)

router.route('/:id')
  .put(update)

router.route('/create-many')
  .post(createMany)

router.route('/:id')
  .get(getDetail)

export const timesheetRoutes = router;