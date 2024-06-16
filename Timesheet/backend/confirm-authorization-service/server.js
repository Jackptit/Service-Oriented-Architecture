import express from 'express';
import { connectDB } from './configs/mongoose.js';
import cors from 'cors';
import { confirmRoutes } from './router/index.js';
const port = 3004

const bootServer = () => {
  const app = express()

  app.use(express.json())
  app.use(cors())

  app.use('/confirm-timesheet', confirmRoutes)
  
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
