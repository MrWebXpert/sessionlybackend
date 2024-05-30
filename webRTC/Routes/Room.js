const express = require('express');
const roomRouter = express.Router();
const { getAllRooms, getRoom, createRoom, updateRoom, deleteRoom} = require('../Controllers/Room');


// Routes
roomRouter.get('/rooms/all', getAllRooms);
roomRouter.get('/room/:id', getRoom);
roomRouter.post('/create/room', createRoom);
roomRouter.patch('/update/room/:id', updateRoom);
roomRouter.delete('/delete/room/:id', deleteRoom);

module.exports = roomRouter;
