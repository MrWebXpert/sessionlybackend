const nodemailer = require('nodemailer');
const Admin = require('../../Models/Admin');
const Student = require('../../Models/Student');
const Staff = require('../../Models/Staff');
const Room = require('../Models/Room');
const asyncHandler = require('express-async-handler');

exports.createRoom = asyncHandler(async (req, res) => {
  const { name, description, users } = req.body;

  const generateRoomKey = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 8;
    let roomKey = '';
    for (let i = 0; i < length; i++) {
      roomKey += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return roomKey;
  };

  const findUser = async (email) => {
    let foundUser = await Admin.findOne({ email });
    if (foundUser) return foundUser;
    foundUser = await Staff.findOne({ email });
    if (foundUser) return foundUser;
    foundUser = await Student.findOne({ email });
    return foundUser;
  };

  try {
    const roomKey = generateRoomKey();
    const room = new Room({ name, description, roomKey, users: [] });

    for (const userEmail of users) {
      const foundUser = await findUser(userEmail);
      if (foundUser) {
        room.users.push(foundUser._id);
      } else {
        console.log(`User with email ${userEmail} not found.Removing from room users.`);
      }
    }

    await room.save();

    if (room.users && room.users.length > 0) {
      const userList = await Promise.all(users.map(async (email) => {
        const foundUser = await findUser(email);
        return foundUser ? foundUser.name : null;
      }));

      const joinLink = ` http://localhost:3000/dashboard/video-call/${room._id}/${roomKey}`;

      const mailOptions = {
        from: process.env.EMAIL_HOST,
        to: users,
        subject: 'New Room Created',
        html: `
          <p>A new room "${room.name}" has been created.</p>
          <p>Your room key is: <strong>${roomKey}</strong></p>
          <p>Join the room <a href="${joinLink}">here</a> and use the security key "${roomKey}" to enter the room.</p>
          <p>Users added to the room: ${userList.filter(Boolean).join(', ')}</p>
        `,
      };

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_HOST,
          pass: process.env.PASS_KEY,
        },
      });

      await transporter.sendMail(mailOptions);

      res.json({
        room: {
          _id: room._id,
          name: room.name,
          description: room.description,
          roomKey: room.roomKey,
          users: userList.filter(Boolean),
          joinLink: joinLink,
        },
      });
    } else {
      res.status(500).json({ message: 'No users found in the room' });
    }
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ message: 'An error occurred while creating the room.' });
  }
});

// Get all rooms
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ message: 'An error occurred while fetching rooms.' });
  }
};
// Get a single room
exports.getRoom = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { roomKey } = req.body;

  // Assuming your Room model is imported and available as Room

  // Find the room by ID
  const room = await Room.findById(id);
  if (!room) {
    return res.status(404).json({
      success: false,
      message: 'Room not found'
    });
  }

  // Check if the provided room key matches the room's key
  if (roomKey !== room.roomKey) {
    return res.status(403).json({
      success: false,
      message: 'Invalid room key'
    });
  }

  // Room found and key matches, return success response with room details
  return res.status(200).json({
    success: true,
    message: `Room found: ${room.name}`,
    room
  });
});
// Update a room
exports.updateRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    room.name = req.body.name;
    room.description = req.body.description;
    await room.save();
    res.json(room);
  } catch (error) {
    console.error('Error updating room:', error);
    res.status(500).json({ message: 'An error occurred while updating room.' });
  }
};
// Delete a room
exports.deleteRoom = async (req, res) => {
  try {
    // Find the room by ID
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Get the room name
    const roomName = room.name;

    // Delete the room
    await Room.findByIdAndDelete(req.params.id);

    // Send response indicating successful deletion
    res.json({ message: ` Room "${roomName}" has been deleted ` });
  } catch (error) {
    console.error('Error deleting room:', error);
    res.status(500).json({ message: 'An error occurred while deleting room.' });
  }
};