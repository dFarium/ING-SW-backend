const Asistencia = require('../models/asistencia');

const createAsistencia = (req, res) => {
    const { asamblea, user, asistencia, rolUsuario } = req.body
    const newAsistencia = new Asistencia({
        asamblea,
        user,
        asistencia
    })
    if (rolUsuario === "admin"){
        newAsistencia.save((error, asistencia) => {
            if (error) {
                return res.status(400).send({ message: "No se ha podido crear el producto" })
            }
            return res.status(201).send(asistencia)
        })
    }
    else{
        return res.status(401).send({ message: "Debe ser administrador para registrar la asistencia" })
    }
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
    const { rolUsuario } = req.body
    if (rolUsuario === "admin"){
        Asistencia.findByIdAndUpdate(id, req.body, (error, asistencia) => {
            if (error) {
                return res.status(400).send({ message: "No se pudo actualizar la asistencia" })
            }
            if (!asistencia) {
                return res.status(404).send({ message: "No se encontro la asistencia" })
            }
            return res.status(200).send({ message: "Asistencia modificada" })
        })
    }
    else{
        return res.status(401).send({ message: "Debe ser administrador para modificar la asistencia" })
    }
}

const deleteAsistencia = (req, res) => {
    const { id } = req.params
    const { rolUsuario } = req.body
    if (rolUsuario === "admin"){
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
    else{
        return res.status(401).send({ message: "Debe ser administrador para eliminar la asistencia" })
    }
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

const asistenciaPorAsamblea = (req, res) => {
    const asambleaId = req.params['id']
    let filtro = {asamblea: `${asambleaId}`}
    Asistencia.find(filtro).populate({ path: 'asamblea user' }).exec((error,asistencia) =>{
        if(error){
            return res.status(400).send({ message: "No se ha podido encontrar una asistencia" })
        }
        if(!asistencia){
            return res.status(404).send({ message: "No se ha podido encontrar una asistencia" })
        }
        return res.status(200).send(asistencia)
    })
}

// const updateVariasAsambleas = (req,res) =>{
//     req.
//     Asistencia.updateMany()
// }

module.exports = {
    createAsistencia,
    getAsistencias,
    updateAsistencia,
    deleteAsistencia,
    getAsistencia,
    asistenciaPorAsamblea
}