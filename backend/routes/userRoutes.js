const express = require('express');
const api = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

api.post('/user',userController.createUser);
api.get('/users', auth.auth , userController.getUsers);
api.get('/user/search/:id', userController.getUser);
api.put('/user/update/:id',auth.auth, userController.updateUser);
api.delete('/user/delete/:id',auth.auth, userController.deleteUser);
api.post('/user/login', userController.login);
api.get('/user/checkToken', auth.auth, userController.checkToken);
api.get('/user/logout', auth.auth, userController.logout);

module.exports = api;