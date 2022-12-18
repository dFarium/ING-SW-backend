const Comentario = require('../models/comentario');

const ingresarComentario = (req,res) =>{
    const {apartado, fecha, user, asamblea} = req.body
    const newComentario = new Comentario({apartado, fecha, user, asamblea})

    newComentario.save((error,comentario)=>{
        if(error){
            return res.status(400).send({message: "Error al comentar"})
        }
        return res.status(201).send(comentario)
    })
}

const obtenerComentarios = (req, res) => {
     Comentario.find({}).populate({ path: 'User' }).exec((error, comentario) => {
        if (error) {
            return res.status(400).send({ message: "No se pudo realizar la busqueda" })
        }
        if (comentario.length === 0) {
            return res.status(404).send({ message: "No se encontraron" })
        }return res.status(200).send(comentario)
        })
}

const actualizarComentario = (req, res) => {
    const { id } = req.params
    const {rolUsuario} = req.body
    if (rolUsuario === 'admin'){
        Comentario.findByIdAndUpdate(id, req.body, (error, comentario) => {
            if (error) {
                return res.status(400).send({ message: "No se pudo actualizar el comentario" })
            }
            if (!comentario) {
                return res.status(404).send({ message: "No se encontró el comentario" })
            }
            return res.status(200).send({ message: "comentario modificado" })
        })
    }else{
        return res.status(401).send({message: "No está autorizado para modificar el comentario"})
    }
}

const borrarComentario = (req, res) => {
    const { id } = req.params
    if(rolUsuario === 'admin'){
        Comentario.findByIdAndDelete(id, (error, comentario) => {
            if (error) {
                return res.status(400).send({ message: "No se ha podido eliminar el comentario" })
            }
            if (!comentario) {
                return res.status(404).send({ message: "No se ha podido encontrar el comentario" })
            }
            return res.status(200).send({ message: "Se ha eliminado el comentario de forma correcta" })
        })
    }else{
        return res.status(401).send({message: "No está autorizado para eliminar el comentario"})
    }
}

const obtenerComentario = (req, res) => {
    const { id } = req.params
    Comentario.findById(id, (error, comentario) => {
        if (error) {
            return res.status(400).send({ message: "No se ha podido modificar el comentario" })
        }
        if (!comentario) {
            return res.status(404).send({ message: "No se ha podido encontrar un comentario" })
        }
        return res.status(200).send(comentario)
        })
}

module.exports = {
    ingresarComentario,
    obtenerComentarios,
    actualizarComentario,
    borrarComentario,
    obtenerComentario
}