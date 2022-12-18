const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({

    destination: function(req,file, cb){
        const route = './upload/' + req.params.archivo
        if(!fs.existsSync(route)){
            fs.mkdirSync(route, {recursive: true})
        }
        cb(null, route)
    },

    filename: function (req, file, cb){

        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (req,file,cb) => {
        if(file.mimetype == 'application/pdf' || file.mimetype == 'application/msword' || file.mimetype == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
            console.log("El archivo es .doc, .docx o .pdf")
            req.params.fileValido = true
        } else {
            console.log("El archivo tiene otra extension")
            req.params.fileValido = false
        }
        cb(null, req.params.fileValido)
    },
    limits:{
        fileSize: 1024 * 1024 * 15
    }
})

module.exports = upload