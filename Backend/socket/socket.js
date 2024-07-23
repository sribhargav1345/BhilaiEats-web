const { Server } = require('socket.io');
const Order = require('../models/Orders');

let io;

const setupSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: true,
      credentials: true
    }
  });

  io.on('connection', (socket) => {

    socket.on('join-user', (contact) => {
      socket.join(`user-${contact}`);
      console.log(`User with contact ${contact} joined their room`);
    });

    socket.on('join-shop', (shopName) => {
      socket.join(`shop-${shopName}`);
      console.log(`Shop ${shopName} joined their room`);
    });


    socket.on('place-order', async (order) => {
      try {
        const newOrder = new Order(order);
        await newOrder.save();

        console.log(`Order placed by ${order.user.name} for shop ${order.shop.shopname}`);

        io.to(`shop-${order.shop.shopname}`).emit('new-order', newOrder);
      }
      catch (error) {
        console.error('Error placing order:', error);
        socket.emit('order-error', { message: 'Failed to place order.' });
      }
    });

    socket.on('accept-order', async (orderId) => {
      try {
        const order = await Order.findById(orderId);
        if (!order) {
          throw new Error('Order not found');
        }
        order.status = 'accepted';
        await order.save();

        console.log(`Order ${orderId} status updated to accepted by shop ${order.shop.shopname}`);

        io.to(`user-${order.user.contact}`).emit('order-status', { status: 'accepted', order: order });
      }
      catch (error) {
        console.error('Error accepting order:', error);
        socket.emit('order-error', { message: 'Failed to accept order.' });
      }
    });

    socket.on('reject-order', async (orderId) => {
      try {
        const order = await Order.findById(orderId);
        if (!order) {
          throw new Error('Order not found');
        }
        order.status = 'rejected';
        await order.save();

        console.log(`Order ${orderId} status updated to rejected by shop ${order.shop.shopname}`);

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
