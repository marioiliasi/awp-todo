const RouteConstant = require('../../constant/Routes');
const router = require('express').Router();
const TodoValidation = require('../../validation/TodoValidation')
const TodoController = require('./TodoController')

module.exports = (app) => {
  router.route('/:id')
    .get(
      TodoController.getTodo
    );

  app.use(
    RouteConstant.TODO,
    router,
  );
};
