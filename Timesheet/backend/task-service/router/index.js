import express  from "express";
import { 
  submitTimesheet, 
  getSubmission,
  getTimesheetSubmissions,
  deleteTimesheetSubmission
} from "../controllers/submisstion.controller.js";
const router = express.Router();

router.route('/submit')
  .post(submitTimesheet)

router.route('/submissions/:id')
  .get(getTimesheetSubmissions)

router.route('/submissions/:id')
  .delete(deleteTimesheetSubmission)

// TEST 
router.route('/submission/:id')
  .get(getSubmission)

export const submisstionRoutes = router;