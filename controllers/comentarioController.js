const Comentario = require('../models/comentario');

const ingresarComentario = (req,res) =>{
    const {apartado, user, asamblea} = req.body
    const newComentario = new Comentario({apartado, user, asamblea})

    //crear, leer, modificar, eliminar
    newComentario.save((error,comentario)=>{
        if(error){
            return res.status(400).send({message: "Error al comentar"})
        }
        return res.status(201).send(comentario)
    })
}

const getComentarios = (req, res) => {
    Comentario.find({}).populate({ path: 'user asamblea' }).exec((error, comentario) => {
        if (error) {
            return res.status(400).send({ message: "No se pudo realizar la busqueda" })
        }
        if (comentario.length === 0) {
            return res.status(404).send({ message: "No se encontraron asistencias" })
        }
        return res.status(200).send(comentario)
    })
}

const updateComentario = (req, res) => {
    const { id } = req.params
    Comentario.findOneAndUpdate(id, req.body, (error, comentario) => {
        if (error) {
            return res.status(400).send({ message: "No se pudo actualizar la asistencia" })
        }
        if (!comentario) {
            return res.status(404).send({ message: "No se encontro la asistencia" })
        }
        return res.status(200).send({ message: "Asistencia modificada" })
    })
}

const deleteComentario = (req, res) => {
    const { id } = req.params
    Comentario.findByIdAndDelete(id, (error, comentario) => {
        if (error) {
            return res.status(400).send({ message: "No se ha podido eliminar la asistencia" })
        }
        if (!comentario) {
            return res.status(404).send({ message: "No se ha podido encontrar una asistencia" })
        }
        return res.status(200).send({ message: "Se ha eliminado la assitencia de forma correcta" })
    })
}

const getComentario = (req, res) => {
    const { id } = req.params
    Comentario.findById(id, (error, comentario) => {
        if (error) {
            return res.status(400).send({ message: "No se ha podido modificar la asistencia" })
        }
        if (!comentario) {
            return res.status(404).send({ message: "No se ha podido encontrar una asistencia" })
        }
        return res.status(200).send(comentario)
    })
}

module.exports = {
    ingresarComentario,
    getComentarios,
    updateComentario,
    deleteComentario,
    getComentario
}