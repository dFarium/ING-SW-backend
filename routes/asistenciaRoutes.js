const express = require('express');
const asistenciaController = require('../controllers/asistenciaController');
const api = express.Router();

api.post('/asistencia', asistenciaController.createAsistencia);
api.get('/asistencias', asistenciaController.getAsistencias);
api.put('/asistencia/update/:id', asistenciaController.updateAsistencia);
api.delete('/asistencia/delete/:id', asistenciaController.deleteAsistencia);
api.get('/asistencia/search/:id', asistenciaController.getAsistencia);
api.get('/asistenciaAsamblea/search/:id', asistenciaController.asistenciaPorAsamblea);


module.exports = api;