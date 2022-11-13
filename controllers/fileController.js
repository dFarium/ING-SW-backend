const file = require("../models/file")
const fileModel = require("../models/file")

const uploadNewFile = (req, res) => {
    const { files } = req
    let aux = files.map((file)=>{
        const newFile = new fileModel({
            url: file.path,
            name: file.originalname,
            mimeType: file.mimetype
        })
        newFile.save((err, fileSaved)=>{
            if (err) {
                return res.status(400).send({message: "Error al subir el archivo"})
            }
        })
        return newFile
    })
    return res.status(201).send(aux)
}

const getFiles = (req, res)=> {
    fileModel.find({}, (err, file)=>{
        if(err){
            return res.status(400).send({ message: "Error al obtener los archivo"})
        }
        return res.status(200).send(file)
    })
}

const getSpecificFile = (req, res)=> {
    const {id} = req.params
    fileModel.findById(id, (err, file)=>{
        if(err){
            return res.status(400).send({ message: "Error al obtener el archivo"})
        }
        if(!file){
            return res.status(404).send({ message: "El archivo no existe"})
        }
        return res.download('./'+file.url)
    })
}

module.exports = {
    uploadNewFile,
    getFiles,
    getSpecificFile
}