import express  from "express";
import { fakeData, getAll, getEmployeeDetails, getEmployeeHistory, getLimitHours } from "../controllers/employee.controller.js";
const router = express.Router();

router.route('/get-all')
  .get(getAll)

router.route('/:id')
  .get(getEmployeeDetails)

router.route('/limit-hours/:id')
  .get(getLimitHours)

router.route('/employee-history/:id')
  .get(getEmployeeHistory)

router.route('/fake-data').get(fakeData)

export const employeeRoutes = router;