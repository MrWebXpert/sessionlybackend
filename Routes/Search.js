const express = require('express');
const searchRouter = express.Router();
const { searchCourses } = require('../Controller/SearchCourse.js');
const { searchUsers } = require('../Controller/SearchUser.js');


searchRouter.get('/tasks/search', searchCourses);
searchRouter.get('/search', searchUsers);
module.exports = searchRouter;