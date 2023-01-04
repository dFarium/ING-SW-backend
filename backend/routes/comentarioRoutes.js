const express = require('express');
const comentarioController = require('../controllers/comentarioController');
const api = express.Router();

api.post('/comentario', comentarioController.ingresarComentario);
api.get('/comentarios', comentarioController.obtenerComentarios);
api.put('/comentario/update/:id', comentarioController.actualizarComentario);
api.delete('/comentario/delete/:id', comentarioController.borrarComentario);
api.get('/comentario/search/:id', comentarioController.obtenerComentario);
api.get('/comentario/specific/:id', comentarioController.viewAsambleaComentario);


module.exports = api