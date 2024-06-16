import { Server } from "socket.io";

let io;

function startSocket() {
  io = new Server(3007, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  })

  io.on('connection', (socket) => {
    console.log('a user connected: ' + socket.id);
  });
}

export { startSocket, io };