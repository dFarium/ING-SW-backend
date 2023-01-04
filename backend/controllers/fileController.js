const fileModel = require("../models/file")
const Asamblea = require("../models/asamblea")
const fs = require('fs');

const uploadNewFile = (req, res) => {
    const { files } = req
    if (req.params.fileValido === false){
        return res.status(415).send({ message: 'Solo se aceptan archivos con extensión .pdf, .doc y .docx' })
    }
    if (files.length === 0) {
        return res.status(404).send({ message: 'No se ha seleccionado ningun archivo' })
    }
    let flag=0
    Asamblea.findById({_id: req.params.id}, (err, asamblea)=> {
        if(err){
            flag = 1
            return res.status(400).send({ message: 'Error al encontrar la asamblea'})
        }
        if(!asamblea){
            flag = 1
            return res.status(404).send({ message: 'No se ha encontrado la asamblea'})
        }
        let aux = files.map((file)=>{
            const newFile = new fileModel({
                url: file.path,
                name: file.originalname,
                mimeType: file.mimetype,
                asamblea: req.params.id
            })
            newFile.save((err, fileSaved)=>{
                if (err) {
                    return res.status(400).send({message: 'Error al subir el archivo'})
                }
                Asamblea.findOneAndUpdate({_id: req.params.id} ,{ $push: {archivos: fileSaved.id}}, (err)=>{
                    if(flag === 0){
                        flag = 1
                        if(err){
                            return res.status(400).send({ message: 'Error al subir el archivo'})
                        }else{
                            return res.status(201).send(aux)
                        }
                    }
                })
            })
            return newFile
        })
    })
}


const getFiles = (req, res)=> {

    fileModel.find({}).populate({ path: 'asamblea' }).exec((error, files) => {
        if (error) {
            return res.status(400).send({ message: 'Error al obtener los archivo' })
        }
        if (files.length === 0) {
            return res.status(404).send({ message: "No existen archivos" })
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
    const id = req.params.id
    const archivo = req.params.archivo
    Asamblea.findById(id).then((asamblea)=>{
        if(!asamblea){
            return res.status(404).send({ message: 'No se ha encontrado la asamblea'})
        }
        //CREAR VECTOR
        let vector1 = asamblea.archivos
        const vector2 = vector1.filter(criterio => criterio!= req.params.archivo)
        Asamblea.findByIdAndUpdate(id, {archivos: vector2} , (error) => {
            if(error){
                return res.status(400).send({ message: 'Error al eliminar el archivo'})
            }else{
                fileModel.findByIdAndDelete(archivo, async (err, file)=>{
                    if(err){
                        return res.status(400).send({ message: 'No se ha podido eliminar el archivo'})
                    }
                    if(!file){
                        return res.status(404).send({ message: 'No se ha podido encontrar el archivo'})
                    }
                    await fs.unlink(file.url,(err)=>{
                        if (err){
                            return res.status(400).send({ message: "Error al obtener el archivo" })
                        }
                        return res.status(200).send({ message: "Archivo Eliminado" })
                    })
                })
            }
        })
    })
}

const viewAsambleaFiles = (req, res)=>{

    Asamblea.findById(req.params.id, (error, asamblea) => {
        if (error) {
            return res.status(400).send({ message: "Error al obtener los archivo" })
        }
        if (!asamblea) {
            return res.status(404).send({ message: "La asamblea no existe" })
        }

        fileModel.find({asamblea: req.params.id},(error,files)=>{
            if(error){
                return res.status(400).send({ message: 'Error al obtener los archivo'})
            }
            if(files.length === 0){
                return res.status(404).send({ message: 'No existen archivos'})
            }else{
                return res.status(201).send(files)
            }
        })
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

const eliminarArchivosAsociados = (req, res)=>{

    Asamblea.findByIdAndUpdate(req.params.id, {archivos: []} , (error, asamblea) => {
        if(error){
            return res.status(404).send({ message: 'No se ha encontrado la asamblea'})
        }
        if (!asamblea) {
            return res.status(404).send({ message: "La asamblea no existe" })
        }
        fileModel.find({asamblea: req.params.id}, (error,files)=>{
            if(error){
                return res.status(400).send({ message: 'Error al obtener los archivos'})
            }
            if(files.length === 0){
                return res.status(200).send({ message: 'No existen archivos que eliminar'})
            }
            let largo= files.length
            let flag=0
            files.map(files =>{
                fileModel.findByIdAndDelete(files._id, async (err, file)=>{
                    if(err && flag!=-1){
                        flag=-1
                        return res.status(400).send({ message: 'No se ha podido eliminar el archivo'})
                    }
                    if(!file && flag!=-1){
                        flag=-1
                        return res.status(404).send({ message: 'No se ha podido encontrar el archivo'})
                    }
                    await fs.unlink(file.url,(err)=>{
                        if (err && flag!=-1){
                            flag=-1
                            return res.status(400).send({ message: "Error al obtener el archivo" })
                        }
                        if(flag!=-1){
                            flag= flag+1
                        }
                        if(flag==largo){
                            return res.status(200).send({ message: "Archivos Eliminados" })
                        }
                    })
                })
            })
        })
    })
}

module.exports = {
    uploadNewFile,
    getFiles,
    downloadFile,
    deleteFile,
    viewAsambleaFiles,
    viewFile,
    eliminarArchivosAsociados
}