import axios from "axios";
import Cookies from "js-cookie";

const crearUsuario = async (values) => {
    const response = await axios.post(`${process.env.API_URL}/user`, {
        name: values.name,
        email: values.email,
        role: values.role,
        rolUsuario: values.rolUsuario
    });
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
    Cookies.remove("token")
    return response
}

module.exports ={
    crearUsuario,
    getUsuario,
    login,
    checkToken,
    logout
}