const Chat = require("../Models/Chat.js");

exports.createChatMessage = async (req, res) => {
    try {
        const { sender, senderType, message } = req.body;
        const chatMessage = await Chat.create({ sender, senderType, message });
        res.status(201).json({ success: true, data: chatMessage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error creating chat message', error: error.message });
    }
};

exports.getAllChatMessages = async (req, res) => {
    try {
        const chatMessages = await Chat.find();
        res.status(200).json({ success: true, data: chatMessages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error retrieving chat messages', error: error.message });
    }
};

exports.getChatMessagesBySender = async (req, res) => {
    const { senderId, senderType } = req.params;
    try {
        const chatMessages = await Chat.find({ sender: senderId, senderType });
        res.status(200).json({ success: true, data: chatMessages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error retrieving chat messages by sender', error: error.message });
    }
};

exports.deleteChatMessageById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedChatMessage = await Chat.findByIdAndDelete(id);
        if (!deletedChatMessage) {
            return res.status(404).json({ success: false, message: 'Chat message not found' });
        }
        res.status(200).json({ success: true, message: 'Chat message deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error deleting chat message', error: error.message });
    }
};
