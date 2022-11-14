const express = require('express');
const comentarioController = require('../controllers/comentarioController');
const api = express.Router();

api.post('/comentario', comentarioController.ingresarComentario);
api.get('/comentarios', comentarioController.getComentarios);
api.put('/comentario/update/:id', comentarioController.updateComentario);
api.delete('/comentario/delete/:id', comentarioController.deleteComentario);
api.get('/comentario/search/:id', comentarioController.getComentario);


module.exports = api