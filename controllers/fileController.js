const fileModel = require("../models/file")
const asamblea = require("../models/asamblea")

const uploadNewFile = (req, res) => {
    const { files } = req
    if (req.params.fileValido === false){
        return res.status(400).send({ message: 'Solo se aceptan archivos con extensión .pdf, .doc y .docx' })
    }
    if (files.length === 0) {
        return res.status(400).send({ message: 'No se ha seleccionado ningun archivo' })
    }
    let aux = files.map((file)=>{
        const newFile = new fileModel({
            url: file.path,
            name: file.originalname,
            mimeType: file.mimetype
        })
        newFile.save((err, fileSaved)=>{
            if (err) {
                return res.status(400).send({message: 'Error al subir el archivo'})
            }
            asamblea.findOneAndUpdate({_id: req.params.id} ,{ $push: {archivos: aux} } ,(err, asamblea) =>{
                if(err){
                    return res.status(400).send({message: 'Error al subir el archivo'})
                }
                if(!asamblea){
                    return res.status(404).send({message: 'No existe la asamblea'})
                }
            })
        })
        return newFile
    })
    return res.status(201).send(aux)
}

const getFiles = (req, res)=> {

    const consulta = fileModel.find({});

    consulta.sort('-date').exec ((err, files) => {

        if(err){
            return res.status(400).send({ message: 'Error al obtener los archivo'})
        }
        if(files.length === 0){
            return res.status(404).send({ message: 'No existen archivos'})
        }
        return res.status(200).send(files)
    })
}

const downloadFile = (req, res)=> {
    const {id} = req.params
    fileModel.findById(id, (err, file)=>{
        if(!file){
            return res.status(404).send({ message: 'El archivo no existe'})
        }
        if(err){
            return res.status(400).send({ message: 'Error al obtener el archivo'})
        }
        return res.download('./'+file.url)
    })
}

const deleteFile = (req, res) => {
    const {id} = req.params
    fileModel.findByIdAndDelete(id, (err, file)=>{
        if(err){
            return res.status(400).send({ message: 'No se ha podido eliminar el archivo'})
        }
        if(!file){
            return res.status(404).send({ message: 'No se ha podido encontrar el archivo'})
        }
        return res.status(200).send({message: 'Se ha eliminado el archivo de forma correcta'})
    })
}

const viewFile = (req, res)=> {
    const {id} = req.params
    fileModel.findById(id, (err, file)=>{
        if(!file){
            return res.status(404).send({ message: 'El archivo no existe'})
        }
        if(err){
            return res.status(400).send({ message: 'Error al buscar el archivo'})
        }
        res.send(file)
    })
}

module.exports = {
    uploadNewFile,
    getFiles,
    downloadFile,
    deleteFile,
    viewFile
}