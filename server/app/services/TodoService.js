const { TodoItem, TodoTask } = require("../models/todo");
const userService = require("./UserService");
const mongoose = require('mongoose');

async function buildTaskModel(userId, task){
  const taskToAdd = {
    userId: userId,
    title: task.title,
    type: task.type,
    archived: false,
    deleted: false
  };
  if(task.archived){
    taskToAdd.archived = task.archived;
  }
  if(task.deleted){
    taskToAdd.deleted = task.deleted;
  }
  if(task.items){
    const items = [];
    task.items.forEach(item => {
      const itemToAdd = {
        _id: item._id || mongoose.Types.ObjectId(),
        text: item.text,
        order: item.order
      };
      if(item.completed){
        itemToAdd.completed = item.completed;
      }
      const itemModel = new TodoItem(itemToAdd);
      items.push(itemModel);
    });
    taskToAdd.items = items;
  }
  return new TodoTask(taskToAdd);
}

async function getTasksByUserId(userId) {
  const todo =  await TodoTask.find({
    userId: userId,
    deleted: false
  });
  console.log(JSON.stringify(todo));
  return todo;
}

async function getTaskById(id) {
  const todo =  await TodoTask.findById(id);
  console.log(JSON.stringify(todo));
  return todo;
}

async function saveTask(userId, task) {
  const user = await userService.getById(userId);
  if(!user){
    throw new Error("No user found with that id");
  }
  const taskModel = await buildTaskModel(userId, task);

  const resp = await taskModel.save();
  console.log(JSON.stringify(resp));
  return resp;
}

async function updateTask (userId, taskId, taskToUpdate) {
  const user = await userService.getById(userId);
  if(!user){
    throw new Error("No user found with that id");
  }
  const task = await getTaskById(taskId);
  if(!task){
    throw new Error("No task found with that id");
  }

  const taskModel = await buildTaskModel(userId, taskToUpdate);
  delete taskModel._doc._id;

  const resp = await TodoTask.findOneAndUpdate({_id: taskId}, taskModel, {});
  console.log(JSON.stringify(resp));
  return resp;
}

async function deleteTask (id) {
  const task = await getTaskById(id);
  task.deleted = true;
  const resp = await TodoTask.findByIdAndUpdate({_id: id}, task, {});
  console.log(JSON.stringify(resp));
  return resp;
}

async function deleteTasksByUserId (id) {
  const resp = await TodoTask.updateMany(
    { userId: id, deleted: false },
    { $set: { deleted: true } }
  );
  console.log(JSON.stringify(resp));
  return resp;
}

module.exports = {
  getTaskById,
  getTasksByUserId,
  saveTask,
  updateTask,
  deleteTask,
  deleteTasksByUserId
}
