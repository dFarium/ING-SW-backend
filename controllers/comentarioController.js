const { json } = require('express');
const { Db } = require('mongodb');
const mongoose = require('mongoose');
const Comentario = require('../models/comentario');
const user = require('../models/user');

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
            Comentario.find({}).populate({path: 'user'}).exec((error, comentario) => { //modificación para mostrar user
            if (error) {
                return res.status(400).send({ message: "No se pudo realizar la busqueda" })
            }
            if (comentario.length === 0) {
                return res.status(404).send({ message: "No se encontraron" })
            }
            return res.status(200).send(comentario.sort((a,b)=> b.fecha - a.fecha)) //Modificación, ordenamiento de fecha
            })
}

const actualizarComentario = (req, res) => {
    const { id } = req.params
    const { rolUsuario, user } = req.body

    Comentario.findById(id).then((comentario1)=>{
        if (!comentario1) {
            return res.status(404).send({ message: "No se encontró el comentario" })
        }

        if(rolUsuario === 'admin' || user === comentario1.user.toString()){
            const body = {
                ...req.body,
                fecha: new Date()
            }
            Comentario.findByIdAndUpdate(id, body, (error, comentario2) => {
                if (error) {
                    return res.status(400).send({ message: "No se pudo actualizar el comentario" })
                }
                return res.status(200).send({ message: "comentario modificado" })
            })
        }else{
            return res.status(401).send({message: "No está autorizado para modificar el comentario"})
        }
    }
    )
}

const borrarComentario = (req, res) => {
    const { id } = req.params
    const { rolUsuario, user } = req.body

    Comentario.findById(id).then((comentario1)=>{
        if (!comentario1) {
            return res.status(404).send({ message: "No se encontró el comentario" })
        }
        
        if(rolUsuario === 'admin' || user === comentario1.user.toString()){
            Comentario.findByIdAndDelete(id, (error, comentario2) => {
                if (error) {
                    return res.status(400).send({ message: "No se ha podido eliminar el comentario" })
                }
                return res.status(200).send({ message: "Se ha eliminado el comentario de forma correcta" })
            })
        }else{
            return res.status(401).send({message: "No está autorizado para eliminar el comentario"})
        }
    })
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