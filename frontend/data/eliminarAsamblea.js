import axios from 'axios'
import Swal from 'sweetalert2'


const eliminarAsamblea = async (id,values) =>{
    console.log(values)
    try {
        const response = await axios.delete(`${process.env.API_URL}/asamblea/delete/${id}`,{data: values })//revisar
        if (response.status === 200){
            Swal.fire({
                title: 'Asamblea eliminada',
                text: 'La asamblea se ha eliminado con exito',
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then((result)=>{
                if (result.isConfirmed){
                    router.push("/asamblea/ver")
                }
            })
        }
        }catch (error) {
        Swal.fire({
            title: 'Error',
            text: `La asamblea no se ha podido eliminar ${error}`,
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }
}

module.exports = {
    eliminarAsamblea
}