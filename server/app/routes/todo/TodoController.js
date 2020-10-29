const { validationResult } = require('express-validator');
const todoService = require('../../services/todo/TodoService');
const responseHandler = require('../../cors/responseHandler');
const { Ok, InternalServerError, ValidationError } = require('../../constant/HttpStatusCode');

module.exports = {
  getTodo: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(ValidationError).send(responseHandler.errorResponse(ValidationError));
    }
    let params = req.params;
    try {
      let result = await todoService.getTodo(params.id);
      res.status(Ok).send(responseHandler.successResponse(Ok, "Todo retrieved", result));
    } catch (error) {
      console.error(error);
      res.status(InternalServerError).send(responseHandler.errorResponse(InternalServerError))
    }
  }
};
