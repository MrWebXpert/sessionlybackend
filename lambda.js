require("dotenv").config()
const express = require('express');
const app = express()
const serverless = require("serverless-http");
const cors = require('cors');
const connectDB = require("./Database/DB.js");
const adminRouter = require("./Routes/Admin.js");
const logRouter = require("./Routes/Log.js");
const staffRouter = require("./Routes/Staff.js");
const studentRouter = require("./Routes/Student.js");
const courseRouter = require("./Routes/Course.js");
const courseModulesRouter = require("./Routes/CourseModule.js");
const courseBooking = require("./Routes/CourseBooking.js");
const chatRouter = require("./Routes/Chat.js");
const DiscussionPanel = require("./Routes/DiscussionPanel.js");
const taskRouter = require("./Routes/Tasks.js");
const searchRouter = require("./Routes/Search.js");
const calendarRouter = require("./Routes/Calandar.js");
app.use(express.json())
connectDB()
app.use(cors())


app.use("/api/v2", logRouter)
app.use("/api/v2", adminRouter)
app.use("/api/v2", staffRouter)
app.use("/api/v2", studentRouter)
app.use("/api/v2", courseRouter)
app.use("/api/v2", courseModulesRouter)
app.use("/api/v2", courseBooking)
app.use("/api/v2", chatRouter)
app.use("/api/v2", DiscussionPanel)
app.use("/api/v2", taskRouter)
app.use("/api/v2", searchRouter)
app.use("/api/v2", calendarRouter)

app.get("/health", (req, res) => {
   res.send("working")
});

module.exports.handler = serverless(app);
