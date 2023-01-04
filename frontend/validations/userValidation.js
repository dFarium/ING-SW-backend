import * as yup from 'yup'

const userValidation = yup.object({
    name: yup.string()
    .required('El Nombre es requerido')
    .matches(/^[aA-zZ\s]+$/, 'El nombre debe contener caracteres validos'),
    email: yup.string()
    .required('El correo es requerido')
    .email('Ingrese un correo valido'),
    role: yup.mixed().required('El rol es requerido'),
    rolUsuario: yup.mixed().required('El rol es requerido')
})

export default userValidation;