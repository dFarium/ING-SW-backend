const express = require('express');
const api = express.Router();
const asambleaController = require('../controllers/asambleaController');

api.get('/asambleas', asambleaController.getAsambleas);
api.post('/asamblea', asambleaController.createAsamblea);
api.put('/asamblea/update/:id', asambleaController.updateAsamblea);
api.delete('/asamblea/delete/:id', asambleaController.deleteAsamblea);
api.get('/asamblea/search/:id', asambleaController.getAsamblea);

module.exports = api;