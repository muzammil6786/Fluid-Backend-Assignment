const express = require("express");
const {taskModel} = require("../model/taskModel");
const {auth} = require("../middleware/auth");
const taskRouter = express.Router();

taskRouter.get("/",auth, async (req, res) => {
  try {
    console.log(req.query);
    const task = await taskModel.find(req.query);
    res.status(200).send({ msg: "List of all tasks", task });
  } catch (err) {
    res.status(400).send({ Error: err });
  }
});
  
taskRouter.get('/:id',auth, async (req, res) => {
  try {
      const task = await taskModel.findById(req.params.id);
      if (!task) {
          return res.status(404).send({ error: 'Task not found' });
      }
      res.status(200).send({ task });
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
});


  taskRouter.post("/add", async (req, res) => {
    try {
        const { title, description, dueDate, priority, status } = req.body;
        const task = new taskModel({ title, description, dueDate, priority, status });
        await task.save();
        res.status(201).send({ msg: "new task has been Added", task });
    } catch (err) {
        console.log(err);
        res.status(400).send({ Error: "error occurred while registering task" });
    }
});

taskRouter.patch("/update/:id", async (req, res) => {
  const {id} = req.params;
  try {
    const task = await taskModel.findByIdAndUpdate({ _id: id }, req.body);
    task.save();
    res.status(200).send({ msg: "task has been updated", task });
  } catch (err) {
    res.status(400).send({ Error: err });
  }
});

taskRouter.delete("/delete/:id", async (req, res) => {
    const {id} = req.params;
  try {
    const task = await taskModel.findByIdAndDelete({ _id: id });
    res.status(200).send({ msg: "task has been Deleted", task });
  } catch (err) {
    res.status(400).send({ Error: err });
  }
});

module.exports = {
    taskRouter,
};