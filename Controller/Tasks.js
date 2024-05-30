
const Staff = require("../Models/Staff.js");
const Tasks = require("../Models/Tasks.js");

exports.getAllTasks = async (req, res) => {
  try {
    // const tasks = await Tasks.find().populate("assignedTo", "username");
    const tasks = await Tasks.find()
    return res.status(200).json({ tasks });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};
exports.singleTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Tasks.findById(id);
    if (!task) {
      return res.status(404).json({ message: "No task available" });
    }
    return res.status(201).json({ success: true, data: task });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to get the user", error: error.message });
  }
};
exports.createTask = async (req, res) => {
  const { title, description, assignedTo, dueDate } = req.body;


  try {
    const newTask = new Tasks({
      title,
      description,
      assignedTo,
      dueDate,
    });

    const task = await newTask.save();

    console.log(task)

    if (!task) {
      return res.status(404).json({ message: "Error in adding task" });
    }


    return res.status(201).json({ task });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error", err);
  }
};

exports.updateTask = async (req, res) => {
  const { title, description, assignedTo, status } = req.body;

  try {
    let task = await Tasks.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    task.title = title;
    task.description = description;
    task.assignedTo = assignedTo;
    task.status = status;

    await task.save();

    const user = await Staff.findById(assignedTo);
    if (user) {
      console.log(`Task "${title}" updated for ${user.username}`);
    }

    return res.status(201).json(task);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Tasks.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }



    return res.status(201).json({ message: "Task remove successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server Error", error: err.message });
  }
};