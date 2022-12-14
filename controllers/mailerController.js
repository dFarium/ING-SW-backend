const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const User = require("../controllers/userController")
dotenv.config();

const sendmail = (req, res) => {
    const { message } = req.body
    const token = process.env.PW
    //const mail = 'felipe.vasquez1902@alumnos.ubiobio.cl'
    if (!token) {
        return res.status(400).send({ message: "No se ha entregado la contraseña de aplicación para el correo" })
    }
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'correos.tgf@gmail.com',
            pass: token
        }
    })
    let directory =[
        'alejandro.torres1901@alumnos.ubiobio.cl',
        'jose.rodriguez1901@alumnos.ubiobio.cl',
        'moises.salgado1901@alumnos.ubiobio.cl',
        'felipe.vasquez1902@alumnos.ubiobio.cl'
    ]
    const mailOptions = {
        from: `Grupo 12`,
        to: directory,
        subject: 'Prueba de correos',
        text: `La junta de vecinos tiene el siguiente mensaje: ${message}`,
        //html: `
        //    <h1>Felicitaciones, has enviado un correo</h1>
        //    <p>${message}</p>
        //    `
    }
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            return res.status(400).send({ message: 'Error al enviar el correo' })
        }
        return res.status(200).send({ message: 'Mensaje enviado' })
    })

    transporter.verify().then(() => {
        console.log('Servidor de correos habilitado')
    }).catch(err => {
        console.log('Error al utilizar servidor de correos')
    })
}

module.exports = sendmail