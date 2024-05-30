const express = require('express');
const multer = require('multer');
const { userAuth } = require('../Middleware/userAuth.js');
const login = require('../Controller/Log.js');
const { getUserType } = require('../Controller/userType.js');
const logRouter = express.Router();

logRouter.post("/login", login)
logRouter.get("/get-user-type",getUserType )

module.exports = logRouter