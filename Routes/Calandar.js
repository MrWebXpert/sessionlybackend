const express = require('express');
const { createEvent, getAllEvents, getEventById, updateEventById, deleteEventById } = require('../Controller/Calendar.js');
const calendarRouter = express.Router();

calendarRouter.post('/calendar/register', createEvent);
calendarRouter.get('/calendar/all', getAllEvents);
calendarRouter.get('/calendar/:id', getEventById);
calendarRouter.patch('/calendar/update/:id', updateEventById);
calendarRouter.delete('/calendar/delete/:id', deleteEventById);

module.exports = calendarRouter;
