import express from 'express';
import { connectDB } from './configs/mongoose.js';
import { timesheetRoutes } from './router/index.js';
import cors from 'cors';
const port = 3005

const bootServer = () => {
  const app = express()

  app.use(express.json())
  app.use(cors())

  app.use('/timesheet', timesheetRoutes)
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

connectDB()
  .then(() => console.log('Connected successfully!'))
  .then(() => bootServer())
  .catch(error => {
    console.error(error)
    process.exit(1)
  });
