const { validationResult } = require('express-validator');
const userService = require('../../services/UserService');
const todoService = require('../../services/TodoService');
const responseHandler = require('../../cors/responseHandler');
const { Ok, InternalServerError, ValidationError } = require('../../constant/HttpStatusCode');

module.exports = {
  getUserByEmail: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(ValidationError).send(responseHandler.errorResponse(ValidationError));
    }
    let params = req.params;
    try {
      let result = await userService.getByEmail(params.email);
      res.status(Ok).send(responseHandler.successResponse(Ok, "User retrieved", result));
    } catch (error) {
      console.error(error);
      res.status(InternalServerError).send(responseHandler.errorResponse(InternalServerError))
    }
  },

  saveUser: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(ValidationError).send(responseHandler.errorResponse(ValidationError));
    }
    try {
      let result = await userService.save(req.body);
      res.status(Ok).send(responseHandler.successResponse(Ok, "User saved", result));
    } catch (error) {
      console.error(error);
      res.status(InternalServerError).send(responseHandler.errorResponse(InternalServerError))
    }
  },

  updateUser: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(ValidationError).send(responseHandler.errorResponse(ValidationError));
    }
    try {
      let params = req.params;
      let result = await userService.update(params.id, req.body);
      res.status(Ok).send(responseHandler.successResponse(Ok, "User saved", result));
    } catch (error) {
      console.error(error);
      res.status(InternalServerError).send(responseHandler.errorResponse(InternalServerError))
    }
  },

  deleteUser: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(ValidationError).send(responseHandler.errorResponse(ValidationError));
    }
    try {
      let params = req.params;
      const tasks = await todoService.getTasksByUserId(params.id);
      if(tasks){
        await todoService.deleteTasksByUserId(params.id);
      }
      let result = await userService.deleteById(params.id);
      res.status(Ok).send(responseHandler.successResponse(Ok, "User saved", result));
    } catch (error) {
      console.error(error);
      res.status(InternalServerError).send(responseHandler.errorResponse(InternalServerError))
    }
  },

  authenticate: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(ValidationError).send(responseHandler.errorResponse(ValidationError));
    }
    try {
      let result = await userService.authenticate(req.body);
      res.status(Ok).send(responseHandler.successResponse(Ok, "Token generated", result));
    } catch (error) {
      console.error(error);
      res.status(InternalServerError).send(responseHandler.errorResponse(InternalServerError))
    }
  },
};
