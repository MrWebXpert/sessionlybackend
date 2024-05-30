const express = require('express');
const chatRouter = express.Router();
const multer = require('multer');
const { createChatMessage, getChatMessagesBySender, getAllChatMessages, deleteChatMessageById } = require('../Controller/Chat.js');

chatRouter.post("/chat/register", createChatMessage)
chatRouter.get("/chat/get/:id", getChatMessagesBySender)
chatRouter.get("/chats", getAllChatMessages)
chatRouter.delete("/chat/delete/:id", deleteChatMessageById)

module.exports = chatRouter