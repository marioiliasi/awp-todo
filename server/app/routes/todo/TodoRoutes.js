const RouteConstant = require('../../constant/Routes');
const router = require('express').Router();
const TodoController = require('./TodoController')

module.exports = (app) => {
  router.route(`/:userId${RouteConstant.TODO}s`)
    .get(
      TodoController.getTodoTasksByUserId
    );

  router.route(`/:userId${RouteConstant.TODO}s/archived`)
    .get(
      TodoController.getArchivedTodoTasksByUserId
    );


  router.route(`/:userId${RouteConstant.TODO}/:taskId`)
    .get(
      TodoController.getTodoTaskById
    );

  router.route(`/:userId${RouteConstant.TODO}`)
    .post(
      TodoController.saveTodoTask
    );

  router.route(`/:userId${RouteConstant.TODO}/:taskId`)
    .put(
      TodoController.updateTodoTask
    );

  router.route(`/:userId${RouteConstant.TODO}/:taskId`)
    .delete(
      TodoController.deleteTodoTask
    );

  app.use(
    RouteConstant.USER,
    router,
  );
};
