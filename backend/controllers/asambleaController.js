const Asamblea = require('../models/asamblea');
const User = require('../models/user');
const Asistencia =require('../models/asistencia');
const file = require('../models/file');

const createAsamblea = (req, res) => {
    const { name, tipo, fecha, rolUsuario } = req.body
    const newAsamblea = new Asamblea({
        name,
        tipo,
        fecha
    })

    if (rolUsuario === "admin"){
        newAsamblea.save((error, asamblea) => {
            if (error) {
                return res.status(400).send({ message: "No se ha podido crear la asamblea" })
            }
            //console.log(asamblea._id)
            inicializarAsistencias(req,res,asamblea._id)
            return res.status(201).send(asamblea)
        })
    }
    else{
        return res.status(401).send({ message: "Debe ser administrador para crear asamblea" })
    }
}

const getAsambleas = (req, res) => {
    Asamblea.find({}).populate({ path: 'asistencia' }).exec((error, asambleas) => {
        if (error) {
            return res.status(400).send({ message: "No se pudo realizar la busqueda" })
        }
        if (asambleas.length === 0) {
            return res.status(404).send({ message: "No se encontraron asambleas" })
        }
        return res.status(200).send(asambleas)
    })
}

const updateAsamblea = (req, res) => {
    const { id } = req.params
    const {rolUsuario} = req.body
    if(rolUsuario === "admin"){
        Asamblea.findByIdAndUpdate(id, req.body, (error, asamblea) => {
                if (error) {
                    return res.status(400).send({ message: "No se pudo actualizar la asamblea" })
                }
                if (!asamblea) {
                    return res.status(404).send({ message: "No se encontro el la asamblea" })
                }
                return res.status(200).send({ message: "Asamblea modificada" })
        })
    }
    else{
        return res.status(401).send({ message: "Tiene que ser administrador para modificar asamblea" })
    }
}

const deleteAsamblea = (req, res) => {
    const { id } = req.params
    const {rolUsuario} = req.body
    console.log(req.body)
    if(rolUsuario === "admin"){
        Asamblea.findByIdAndDelete(id, (error, asamblea) => {
                if (error) {
                    return res.status(400).send({ message: "No se ha podido eliminar la asamblea" })
                }
                if (!asamblea) {
                    return res.status(404).send({ message: "No se ha podido encontrar la asamblea" })
                }
                //Cuando vaya a eliminar asamblea, eliminar archivos
                return res.status(200).send({ message: "Se ha eliminado la asamblea de forma correcta" })
        })
    }
    else{
        return res.status(401).send({ message: "Tiene que ser administrador para modificar asamblea" })
    }
}

const getAsamblea = (req, res) => {
    const { id } = req.params
    Asamblea.findById(id, (error, asamblea) => {
        if (error) {
            return res.status(400).send({ message: "No se ha podido modificar la asamblea" })
        }
        if (!asamblea) {
            return res.status(404).send({ message: "No se ha podido encontrar la asamblea" })
        }
        return res.status(200).send(asamblea)
    })
}

const filtrado = (req,res) =>{
    let filtro = {}, fechas={},tipos={}
    const {tipo, inicio, fin} = req.body

    if (inicio || fin){
        if (inicio && fin) {
            fechas = { fecha: { $lte: new Date(fin), $gte: new Date(inicio) } }
        } else if (inicio) {
            fechas = { fecha: { $lte: new Date(3000, 1, 1), $gte: new Date(inicio) } }
        } else if (fin) {
            fechas = { fecha: { $lte: new Date(), $gte: new Date(2010, 1, 1) } }
        }
        filtro = { ...fechas }
    }

    if(tipo){
        if (tipo == "Ordinaria") {
            tipos = { tipo: "Ordinaria" }
        } else {
            tipos = { tipo: "Extraordinaria" }
        }
    }
    filtro = { ...filtro, ...tipos }

    Asamblea.find(filtro,(err,asambleaFiltrada)=>{
        if(err){
            return res.status(400).send({ message: "Error en la busqueda" })
        }
        if(!asambleaFiltrada){
            return res.status(404).send({ message: "No existen asambleas con estos criterios" })
        }
        return res.status(200).send(asambleaFiltrada)
    })
}

const inicializarAsistencias = (req,res,asambleaId)=>{
    let datos = {} ,asistencia = {asistencia: "Ausente"}, asamblea = {asamblea:`${asambleaId}`}
    User.find({}, (error, user) => {
        if (error) {
            return res.status(400).send({ message: 'Error al obtener los usuarios' });
        }
        user.map(user => {
            user = {user: `${user._id}`}
            datos = {...user, ...asamblea, ...asistencia}
            const newAsistencia = new Asistencia (datos)

            newAsistencia.save((error, asistencia) => {
                if (error){
                    console.log(error)
                }
            })
        })
    })
}

const eliminarArchivosAsociados = (res,asambleaId)=>{
    let datos = {} ,asistencia = {asistencia: "Ausente"}, asamblea = {asamblea:`${asambleaId}`}
    User.find({}, (error, user) => {
        if (error) {
            return res.status(400).send({ message: 'Error al obtener los usuarios' });
        }
        user.map(user => {
            user = {user: `${user._id}`}
            datos = {...user, ...asamblea, ...asistencia}
            const newAsistencia = new Asistencia (datos)

            newAsistencia.save((error, asistencia) => {
                if (error){
                    console.log(error)
                }
            })
        })
    })
}


module.exports = {
    createAsamblea,
    getAsambleas,
    updateAsamblea,
    deleteAsamblea,
    getAsamblea,
    filtrado,
    inicializarAsistencias
}

