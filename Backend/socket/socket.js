const { Server } = require('socket.io');
const Order = require('../models/Orders');

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
    console.log('a user connected:', socket.id);

    socket.on('place-order', async (order) => {
      try {
        const newOrder = new Order(order);
        await newOrder.save();
        io.emit('order-received', order); 
      } 
      catch (error) {
        console.error('Error placing order:', error);
        socket.emit('order-error', { message: 'Failed to place order.' });
      }
    });

    socket.on('accept-order', async (orderId) => {
      try {
        await Order.updateOne({ _id: orderId }, { status: 'accepted' });
        io.emit('order-accepted', orderId); 
      } 
      catch (error) {
        console.error('Error accepting order:', error);
        socket.emit('order-error', { message: 'Failed to accept order.' });
      }
    });

    socket.on('reject-order', async (orderId) => {
      try {
        await Order.updateOne({ _id: orderId }, { status: 'rejected' });
        io.emit('order-rejected', orderId);
      } 
      catch (error) {
        console.error('Error rejecting order:', error);
        socket.emit('order-error', { message: 'Failed to reject order.' });
      }
    });

    socket.on('disconnect', () => {
      console.log('user disconnected:', socket.id);
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
