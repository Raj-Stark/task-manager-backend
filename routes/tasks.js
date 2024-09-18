const express = require("express");
const {
  getAllTasks,
  createTasks,
  deleteSingleTask,
  updateSingleTask,
  getSingleTask,
} = require("../controllers/taskController");

const taskRouter = express.Router();

taskRouter.route("/").get(getAllTasks).post(createTasks);
taskRouter
  .route("/:id")
  .get(getSingleTask)
  .patch(updateSingleTask)
  .delete(deleteSingleTask);

module.exports = taskRouter;
