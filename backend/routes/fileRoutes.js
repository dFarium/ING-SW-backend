const express = require('express')
const fileController = require('../controllers/fileController')
const upload = require('../middlewares/handleMulter')
const fileSize = require('../middlewares/fileSize')

const api= express.Router()

api.post("/file/:archivo/:id", upload.array('archivos'), fileSize, fileController.uploadNewFile)
api.get('/files/', fileController.getFiles)
api.get('/file/download/:id', fileController.downloadFile)
api.delete('/file/delete/:archivo/:id', fileController.deleteFile)
api.get('/file/:id', fileController.viewAsambleaFiles)
api.get('/file/specific/:id', fileController.viewFile)
api.delete('/file/deleteAll/:id', fileController.eliminarArchivosAsociados)

module.exports = api
