const express = require('express');
const multer = require('multer');
const { create } = require('../Models/Rating');
const ratingRoute = express.Router();

ratingRoute.post('/ratings/:staffId?/:studentId?', create);

module.exports = ratingRoute