const express = require("express");
const router = express.Router();

const { getIO } = require('./socket');

router.post('/emit-event', (req,res) => {
    const io = getIO();
    io.emit('someEvent', { data: 'some data' }); 
    res.send('Event emitted');
});

module.exports = router;
