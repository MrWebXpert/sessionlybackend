const DiscussionPanel = require("../Models/DiscussionPanel.js");

exports.createDiscussionPanel = async (req, res) => {
    try {
        const { course, createdBy, title, description, participants } = req.body;

        const discussionPanel = await DiscussionPanel.create({
            course,
            createdBy,
            title,
            description,
            participants
        });

        res.status(201).json({ success: true, data: discussionPanel });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error creating discussion panel', error: error.message });
    }
};

exports.getAllDiscussionPanels = async (req, res) => {
    try {
        const discussionPanels = await DiscussionPanel.find().populate('participants.user');
        res.status(200).json({ success: true, data: discussionPanels });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error retrieving discussion panels', error: error.message });
    }
};

exports.getDiscussionPanelById = async (req, res) => {
    try {
        const discussionPanel = await DiscussionPanel.findById(req.params.id).populate('participants.user');
        if (!discussionPanel) {
            return res.status(404).json({ success: false, message: 'Discussion panel not found' });
        }
        res.status(200).json({ success: true, data: discussionPanel });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error retrieving discussion panel', error: error.message });
    }
};

exports.updateDiscussionPanel = async (req, res) => {
    try {
        const discussionPanel = await DiscussionPanel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('participants.user');
        if (!discussionPanel) {
            return res.status(404).json({ success: false, message: 'Discussion panel not found' });
        }
        res.status(200).json({ success: true, data: discussionPanel });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error updating discussion panel', error: error.message });
    }
};

exports.deleteDiscussionPanel = async (req, res) => {
    try {
        const discussionPanel = await DiscussionPanel.findByIdAndDelete(req.params.id);
        if (!discussionPanel) {
            return res.status(404).json({ success: false, message: 'Discussion panel not found' });
        }
        res.status(200).json({ success: true, message: 'Discussion panel deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error deleting discussion panel', error: error.message });
    }
};
