const { Server } = require('socket.io');

let io;

const setupSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim()),
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Join rooms based on user type (user or admin)
    socket.on('joinRoom', (room) => {
      socket.join(room);
      console.log(`Socket ${socket.id} joined room ${room}`);
    });

    // Listen for new orders from users
    socket.on('newOrder', (order) => {
      console.log('New order received:', order);
      io.to('admin').emit('orderReceived', order); // Notify admin
    });

    // Listen for order status updates from admin
    socket.on('updateOrderStatus', (data) => {
      console.log('Order status update:', data);
      io.to(data.userId).emit('orderStatusUpdated', data); // Notify user
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

module.exports = { setupSocket, getIO };
