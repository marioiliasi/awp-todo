const RouteConstant = require('../../constant/Routes');
const router = require('express').Router();
const UserController = require('./UserController')

module.exports = (app) => {
  router.route('/:email')
    .get(
      UserController.getUserByEmail
    );

  router.route('/')
    .post(
      UserController.saveUser
    );

  router.route('/:id')
    .put(
      UserController.updateUser
    );

  router.route('/:id')
    .delete(
      UserController.deleteUser
    );

  router.route('/authenticate')
    .post(
      UserController.authenticate
    );

  app.use(
    RouteConstant.USER,
    router,
  );
};
