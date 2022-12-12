const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const User = require('../models/user');
dotenv.config();

const sendmail = (req, res) => {
    const { from, asunto, texto} = req.body
    const token = process.env.PW
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

    User.find({}, (error, user) => {
        if (error) {
            return res.status(400).send({ message: 'Error al obtener los emails de los usuarios' });
        }
        user.forEach(user => {
            console.log(user.email);
            const mailOptions = {
                from: `Enviado por ${from}`,
                to: user.email,
                subject: `${asunto}`,
                text: 'La junta de vecinos tiene un aviso:',
                html: `
                    <h1>Tu mensaje es: </h1>
                    <p>${texto}</p>
                    `
            }
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    return res.status(400).send({ message: 'Error al enviar el correo' })
                }
                return res.status(200).send({ message: 'Mensaje enviado' })
            })
        });
        return res.status(200).send('');
    })
    //const correos = emails.map(email => emails.email);

    // let directory =[
    //     'alejandro.torres1901@alumnos.ubiobio.cl',
    //     'jose.rodriguez1901@alumnos.ubiobio.cl',
    //     'moises.salgado1901@alumnos.ubiobio.cl',
    //     'felipe.vasquez1902@alumnos.ubiobio.cl'
    // ]

    transporter.verify().then(() => {
        console.log('Servidor de correos habilitado')
    }).catch(err => {
        console.log('Error al utilizar servidor de correos')
    })
}

module.exports = sendmail