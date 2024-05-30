const express = require('express');
const DiscussionPanel = express.Router();
const multer = require('multer');
const { createDiscussionPanel, getDiscussionPanelById, updateDiscussionPanel, getAllDiscussionPanels, deleteDiscussionPanel } = require('../Controller/DiscussionPanel.js');

DiscussionPanel.post("/discussion/register", createDiscussionPanel)
DiscussionPanel.get("/discussion/get/:id", getDiscussionPanelById)
DiscussionPanel.patch("/discussion/update/:id", updateDiscussionPanel)
DiscussionPanel.get("/discussion/all", getAllDiscussionPanels)
DiscussionPanel.delete("/discussion/delete/:id", deleteDiscussionPanel)

module.exports = DiscussionPanel