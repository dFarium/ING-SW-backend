const Asistencia = require('../models/asistencia');

const createAsistencia = (req, res) => {
    const { asamblea, user, asistencia } = req.body
    const newAsistencia = new Asistencia({
        asamblea,
        user,
        asistencia
    })
    newAsistencia.save((error, asistencia) => {
        if (error) {
            return res.status(400).send({ message: "No se ha podido crear el producto" })
        }
        return res.status(201).send(asistencia)
    })
}

const getAsistencias = (req, res) => {
    Asistencia.find({}).populate({ path: 'asamblea user' }).exec((error, asistencia) => {
        if (error) {
            return res.status(400).send({ message: "No se pudo realizar la busqueda" })
        }
        if (asistencia.length === 0) {
            return res.status(404).send({ message: "No se encontraron asistencias" })
        }
        return res.status(200).send(asistencia)
    })
}

const updateAsistencia = (req, res) => {
    const { id } = req.params
    Asistencia.findbyIdAndUpdate(id, req.body, (error, asistencia) => {
        if (error) {
            return res.status(400).send({ message: "No se pudo actualizar la asistencia" })
        }
        if (!asistencia) {
            return res.status(404).send({ message: "No se encontro la asistencia" })
        }
        return res.status(200).send({ message: "Asistencia modificada" })
    })
}

const deleteAsistencia = (req, res) => {
    const { id } = req.params
    Asistencia.findByIdAndDelete(id, (error, asistencia) => {
        if (error) {
            return res.status(400).send({ message: "No se ha podido eliminar la asistencia" })
        }
        if (!asistencia) {
            return res.status(404).send({ message: "No se ha podido encontrar una asistencia" })
        }
        return res.status(200).send({ message: "Se ha eliminado la assitencia de forma correcta" })
    })
}

const getAsistencia = (req, res) => {
    const { id } = req.params
    Asistencia.findById(id, (error, asistencia) => {
        if (error) {
            return res.status(400).send({ message: "No se ha podido modificar la asistencia" })
        }
        if (!asistencia) {
            return res.status(404).send({ message: "No se ha podido encontrar una asistencia" })
        }
        return res.status(200).send(asistencia)
    })
}

module.exports = {
    createAsistencia,
    getAsistencias,
    updateAsistencia,
    deleteAsistencia,
    getAsistencia
}