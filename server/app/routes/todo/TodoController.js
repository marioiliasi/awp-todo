const { validationResult } = require('express-validator');
const todoService = require('../../services/TodoService');
const responseHandler = require('../../cors/responseHandler');
const { Ok, InternalServerError, ValidationError } = require('../../constant/HttpStatusCode');

module.exports = {
  getTodoTasksByUserId: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(ValidationError).send(responseHandler.errorResponse(ValidationError));
    }
    let params = req.params;
    try {
      let result = await todoService.getTasksByUserId(params.userId);
      res.status(Ok).send(responseHandler.successResponse(Ok, "Todo retrieved", result));
    } catch (error) {
      console.error(error);
      res.status(InternalServerError).send(responseHandler.errorResponse(InternalServerError))
    }
  },

  getArchivedTodoTasksByUserId: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(ValidationError).send(responseHandler.errorResponse(ValidationError));
    }
    let params = req.params;
    try {
      let result = await todoService.getArchivedTasksByUserId(params.userId);
      res.status(Ok).send(responseHandler.successResponse(Ok, "Todo retrieved", result));
    } catch (error) {
      console.error(error);
      res.status(InternalServerError).send(responseHandler.errorResponse(InternalServerError))
    }
  },

  getTodoTaskById: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(ValidationError).send(responseHandler.errorResponse(ValidationError));
    }
    let params = req.params;
    try {
      let result = await todoService.getTaskById(params.taskId);
      res.status(Ok).send(responseHandler.successResponse(Ok, "Todo retrieved", result));
    } catch (error) {
      console.error(error);
      res.status(InternalServerError).send(responseHandler.errorResponse(InternalServerError))
    }
  },

  saveTodoTask: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(ValidationError).send(responseHandler.errorResponse(ValidationError));
    }
    try {
      let params = req.params;
      let result = await todoService.saveTask(params.userId, req.body);
      res.status(Ok).send(responseHandler.successResponse(Ok, "Todo saved", result));
    } catch (error) {
      console.error(error);
      res.status(InternalServerError).send(responseHandler.errorResponse(InternalServerError))
    }
  },

  updateTodoTask: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(ValidationError).send(responseHandler.errorResponse(ValidationError));
    }
    try {
      let params = req.params;
      let result = await todoService.updateTask(params.userId, params.taskId, req.body);
      res.status(Ok).send(responseHandler.successResponse(Ok, "Todo saved", result));
    } catch (error) {
      console.error(error);
      res.status(InternalServerError).send(responseHandler.errorResponse(InternalServerError))
    }
  },

  deleteTodoTask: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(ValidationError).send(responseHandler.errorResponse(ValidationError));
    }
    try {
      let params = req.params;
      let result = await todoService.deleteTask(params.taskId);
      res.status(Ok).send(responseHandler.successResponse(Ok, "Todo saved", result));
    } catch (error) {
      console.error(error);
      res.status(InternalServerError).send(responseHandler.errorResponse(InternalServerError))
    }
  }
};
