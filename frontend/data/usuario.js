import axios from "axios";

const crearUsuario = async (values) => {
    const response = await axios.post(`${process.env.API_URL}/user`, {
        name: values.name,
        email: values.email,
        role: values.role,
        rolUsuario: values.rolUsuario
    });
    return response
}

module.exports ={crearUsuario}