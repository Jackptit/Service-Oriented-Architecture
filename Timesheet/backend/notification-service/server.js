import express from "express";
import { connectDB } from './configs/mongoose.js';
import { notificationRoutes } from './router/index.js';
import cors from 'cors';
const port = 3001

const bootServer = () => {
  const app = express()

  app.use(express.json())
  
  app.use(cors())
  app.use('/notification', notificationRoutes);
  
  app.listen(port, () => {
    console.log(`Notification service is running on port ${port}`)
  })
}

connectDB()
  .then(() => console.log('Connected successfully!'))
  .then(() => bootServer())
  .catch(error => {
    console.error(error)
    process.exit(1)
  });
