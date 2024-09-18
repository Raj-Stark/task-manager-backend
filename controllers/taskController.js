const { createCustomError } = require("../errors/custom-error");
const asyncWrapper = require("../middlewares/async");
const taskModel = require("../models/taskModel");

const getAllTasks = asyncWrapper(async (req, res) => {
  const task = await taskModel.find({});
  return res.status(200).json({ task });
});

const createTasks = async (req, res) => {
  try {
    const task = await taskModel.create(req.body);
    return res.status(201).json({ task });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};
const getSingleTask = async (req, res) => {
  const { id: taskID } = req.params;
  try {
    const task = await taskModel.findById(taskID);

    if (!task) {
      return next(createCustomError(`No task with ID: ${taskID}`, 404));
    }
    return res.status(200).json({ task });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};
const updateSingleTask = async (req, res) => {
  const { id: taskID } = req.params;
  try {
    const task = await taskModel.findByIdAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return next(createCustomError(`No task with ID: ${taskID}`, 404));
    }
    return res.status(200).json({ task, status: "Success" });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};
const deleteSingleTask = async (req, res) => {
  const { id: taskID } = req.params;
  try {
    const task = await taskModel.findByIdAndDelete(taskID);

    if (!task) {
      return res.status(404).json({ msg: `No task with ID: ${taskID}` });
    }
    return res.status(200).json({ task: null, status: "Success" });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllTasks,
  createTasks,
  getSingleTask,
  updateSingleTask,
  deleteSingleTask,
};
