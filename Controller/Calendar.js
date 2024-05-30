
const CalendarEvent = require("../Models/Calendar.js");

exports.createEvent = async (req, res) => {
    try {
        const newEvent = await CalendarEvent.create(req.body);
       return res.status(201).json(newEvent);
    } catch (error) {
        console.error(error);
        return  res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.getAllEvents = async (req, res) => {
    try {
        const events = await CalendarEvent.find();
        return res.status(200).json(events);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.getEventById = async (req, res) => {
    try {
        const event = await CalendarEvent.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        return res.status(200).json(event);
    } catch (error) {
        console.error(error);
        return  res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.updateEventById = async (req, res) => {
    try {
        const updatedEvent = await CalendarEvent.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }
        return  res.status(200).json(updatedEvent);
    } catch (error) {
        console.error(error);
        return   res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.deleteEventById = async (req, res) => {
    try {
        const deletedEvent = await CalendarEvent.findByIdAndDelete(req.params.id);
        if (!deletedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }
        return  res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        console.error(error);
        return  res.status(500).json({ message: "Internal Server Error" });
    }
};
