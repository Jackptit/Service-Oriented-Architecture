import express  from "express";
import { connectDB } from './configs/mongoose.js';
import { employeeRoutes } from './router/index.js';
import cors from 'cors';
const port = 3003

const bootServer = () => {
  const app = express();
  app.use(express.json());

  app.use(cors())
  app.use('/employee', employeeRoutes);
  
  app.listen(port, () => {
    console.log(`Employee service is running on port ${port}`)
  })
}

connectDB()
  .then(() => console.log('Connected successfully!'))
  .then(() => bootServer())
  .catch(error => {
    console.error(error)
    process.exit(1)
  });
