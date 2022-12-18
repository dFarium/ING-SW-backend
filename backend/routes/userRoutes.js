const express = require('express');
const api = express.Router();
const userController = require('../controllers/userController');

api.post('/user', userController.createUser);
api.get('/users', userController.getUsers);
api.get('/user/search/:id', userController.getUser);
api.put('/user/update/:id', userController.updateUser);
api.delete('/user/delete/:id', userController.deleteUser);
api.post('/user/login', userController.login);

module.exports = api;