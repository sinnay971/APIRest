// utilisation d'un routeur Express
const express = require('express');

var userRouter = express.Router();
// utilisation du controlleur de gestion des membres

var userController = require('../controller/UserController.js');

userRouter.get('/:name/:password', userController.demandejeton);
userRouter.post('/verifjwt', userController.verifjeton);
userRouter.get('/', userController.liste);
userRouter.post('/', userController.ajout);


module.exports = userRouter;