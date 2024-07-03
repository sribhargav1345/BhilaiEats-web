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

      // Room for specific User
      socket.on('join-user', (contact) => {
        socket.join(`user-${contact}`);
        // console.log(`User joined room: user-${contact}`);
      });

      // Room for specific Admin
      socket.on('join-shop', (shopName) => {
        socket.join(`shop-${shopName}`);
        // console.log(`Admin joined room: shop-${shopName}`);
      });

      // Handle placing an order
      socket.on('place-order', async (order) => {
        try {
          const newOrder = new Order(order);
          await newOrder.save();

          io.to(`shop-${order.shop.shopname}`).emit('order-received', newOrder);
          io.to(`user-${order.user.contact}`).emit('order-status', { status: 'pending', order: newOrder });

        } 
        catch (error) {
          console.error('Error placing order:', error);
          socket.emit('order-error', { message: 'Failed to place order.' });
        }
      });

    // Handle accepting an order
    socket.on('accept-order', async (orderId) => {
      try {
        const order = await Order.findById(orderId);
        if (!order) {
          throw new Error('Order not found');
        }
        order.status = 'accepted';
        await order.save();

        io.to(`shop-${order.shop.shopname}`).emit('order-accepted', order);
        io.to(`user-${order.user.contact}`).emit('order-status', { status: 'accepted', order: order });
      } 
      catch (error) {
        console.error('Error accepting order:', error);
        socket.emit('order-error', { message: 'Failed to accept order.' });
      }
    });

    // Handle rejecting an order
    socket.on('reject-order', async (orderId) => {
      try {
        const order = await Order.findById(orderId);
        if (!order) {
          throw new Error('Order not found');
        }
        order.status = 'rejected';
        await order.save();

        io.to(`shop-${order.shop}`).emit('order-rejected', order);
        io.to(`user-${order.user.contact}`).emit('order-status', { status: 'rejected', order: order });
      } 
      catch (error) {
        console.error('Error rejecting order:', error);
        socket.emit('order-error', { message: 'Failed to reject order.' });
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
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
