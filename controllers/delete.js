const asamblea = require("../models/asamblea")

const deleteFile3aaaaa = (req, res) => {
    asamblea.findByIdAndUpdate(req.params.id, {archivos: vector} , (err)=>{
        if(flag === 0){
            flag = 1
            if(err){
                return res.status(400).send({ message: 'Error al eliminar el archivo'})
            }else{
                fileModel.findByIdAndDelete(req.params.archivo, (err, file)=>{
                    if(err){
                        return res.status(400).send({ message: 'No se ha podido eliminar el archivo'})
                    }
                    if(!file){
                        return res.status(404).send({ message: 'No se ha podido encontrar el archivo'})
                    }
                    return res.status(200).send({message: 'Se ha eliminado el archivo de forma correcta'})
                })
            }
        }

  
    })
   
}

const deleteFile2ssssss = (req, res) => {
    let flag =0
    asamblea.findById(req.params.id, (err, asamblea)=> {
        if(err){
            flag=1
            return res.status(400).send({ message: 'Error al encontrar la asamblea'})
        }
        if(!asamblea){
            flag=1
            return res.status(404).send({ message: 'No se ha encontrado la asamblea'})
        }
        let vector = asamblea.archivos

        asamblea.findByIdAndUpdate(req.params.id, {archivos: vector} , (err)=>{
            if(flag === 0){
                flag = 1
                if(err){
                    return res.status(400).send({ message: 'Error al eliminar el archivo'})
                }else{
                    fileModel.findByIdAndDelete(req.params.archivo, (err, file)=>{
                        if(err){
                            return res.status(400).send({ message: 'No se ha podido eliminar el archivo'})
                        }
                        if(!file){
                            return res.status(404).send({ message: 'No se ha podido encontrar el archivo'})
                        }
                        return res.status(200).send({message: 'Se ha eliminado el archivo de forma correcta'})
                    })
                }
            }
        })
    })
}


const deleteFile5aaaaaaaaaa = (req, res) => {
    
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