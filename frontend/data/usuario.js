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

const editarUsuario = async (id,token) => {
    const response = await axios.put(`${process.env.API_URL}/user/update/${id}`, {headers: {cookie: token}});
    return response
}

const getUsuario = async (token) => {
    const response = await axios.get(`${process.env.API_URL}/users`, {headers: {cookie: token}});
    return response
}

const login = async (email) => {
    const response = await axios.post(`${process.env.API_URL}/user/login`,{email});
    return response
}

const checkToken = async (token) => {
    const response = await axios.get(`${process.env.API_URL}/user/checkToken`,{headers: {cookie: token}});
    return response
}

const logout = async () => {
    const response = await axios.get(`${process.env.API_URL}/user/logout`);
    return response
}

module.exports ={
    crearUsuario,
    getUsuario,
    login,
    checkToken,
    logout
}