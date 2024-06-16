import express from 'express';
import { connectDB } from './configs/mongoose.js';
import { submisstionRoutes } from './router/index.js';
import cors from 'cors';
import { Server } from 'socket.io';
import { startSocket } from './socket.js';
const port = 3006;

const bootServer = () => {
  startSocket();
  const app = express()

  app.use(express.json())
  app.use(cors())

  app.use('/task-service', submisstionRoutes)
  
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
