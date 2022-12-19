import axios from 'axios'
import Swal from 'sweetalert2'

const eliminarAsamblea = async (id,rolUsuario) =>{
    try {
        const response = await axios.get(`${process.env.API_URL}/asamblea/delete/${id}`,rolUsuario);
        if (response.status === 200){
            Swal.fire({
                title: 'Asamblea creada',
                text: 'La asamblea se ha creado con exito',
                icon: 'success',
                confirmButtonText: 'Ok'
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