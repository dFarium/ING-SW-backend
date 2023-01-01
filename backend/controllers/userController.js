const User = require('../models/user');
const { createToken } = require('../services/token');

const createUser = async (req, res) => {
    const { name, email, role, rolUsuario } = req.body;
    //email = email.toLowerCase();
    User.findOne({email},(err,user)=>{
        if (err){
            return res.status(400).send({message: 'Error al crear usuario'})
        }
        if (user){
            return res.status(400).send({message: 'El usuario ya existe'})
        }
        const newUser = new User({ name, email, role });

        if(rolUsuario === "admin"){
            newUser.save((err, user) => {
                console.log(err)
                if (err) {
                    return res.status(400).send({ message: 'Error al crear el usuario' });
                }
                return res.status(201).send(user);
            })
        }
        else{
            return res.status(401).send({ message: 'Para crear usuario tiene que ser administrador' });
        }
    })
}

const login = async (req, res) => {
    let email  = req.body.email.toLowerCase();
    User.findOne({ email }, (err, user) => {
        if (err) {
            return res.status(400).send({ message: 'Error al iniciar sesión' });
        }
        if (!user) {
            return res.status(404).send({ message: 'No se encontró el usuario' });
        }
        res.cookie('token', createToken(user), {httpOnly: true});
        return res.status(200).send({message: 'Inicio de sesion correctamente', token: createToken(user), user: user.name});
    })
}

const checkToken = (req, res)=>{
    return res.status(200).send({message: 'Token Valido'});
}

const logout = (req, res) => {
    res.clearCookie('token');
    return res.status(200).send({message: 'Se ha cerrado la sesion correctamente'});
}

const getUsers = async (req, res) => {
    User.find({}, (err, user) => {
        if (err) {
            return res.status(400).send({ message: 'Error al obtener los usuarios' });
        }
        return res.status(200).send(user);
    })
}

const getUser = (req, res) => {
    const { id } = req.params;
    User.findById(id, (err, user) => {
        if (err) {
            return res.status(400).send({ message: 'Error al obtener el usuario' });
        }
        if (!user) {
            return res.status(404).send({ message: 'No se encontró el usuario' });
        }
        return res.status(200).send(user);
    })
}

const updateUser = async (req, res) => {
    const { name, email, password, rolUsuario } = req.body;
    const { id } = req.params;
    if(rolUsuario === "admin"){
        User.findByIdAndUpdate(id, { name, email, password }, (err, user) => {
            if (err) {
                return res.status(400).send({ message: 'Error al actualizar el usuario' });
            }
            if (!user) {
                return res.status(404).send({ message: 'No se encontró el usuario' });
            }
            return res.status(200).send(user);
        })
    }
    else{
        return res.status(401).send({ message: 'Para modificar usuario tiene que ser administrador' });
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    const {rolUsuario} = req.body;
    if(rolUsuario === "admin"){
        User.findByIdAndDelete(id, (err, user) => {
            if (err) {
                return res.status(400).send({ message: 'Error al eliminar el usuario' });
            }
            if (!user) {
                return res.status(404).send({ message: 'No se encontró el usuario' });
            }
            return res.status(200).send(user);
        })
    }
    else{
        return res.status(401).send({ message: 'Para eliminar usuario tiene que ser administrador' });
    }
}

module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    login,
    checkToken,
    logout
}