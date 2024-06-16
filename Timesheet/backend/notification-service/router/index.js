import express  from "express";
import { sendEmail } from '../controllers/notification.controller.js';
const router = express.Router();

router.route('/send-mail')
  .post(sendEmail)

export const notificationRoutes = router;