const express = require('express');
const multer = require('multer');
const { userAuth } = require('../Middleware/userAuth.js');
const login = require('../Controller/Log.js');
const { getUserType } = require('../Controller/userType.js');
const { changePasswordEmail, resetPasswordToken } = require('../Controller/SendResetEmail.js');
const logRouter = express.Router();

logRouter.post("/login", login)
logRouter.get("/get-user-type", getUserType)
logRouter.post("/sendemail", changePasswordEmail)
logRouter.post('/resetpassword/:id/:token', resetPasswordToken)

module.exports = logRouter