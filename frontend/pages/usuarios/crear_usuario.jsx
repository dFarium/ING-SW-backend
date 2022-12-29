import { Button, Container, Stack,HStack ,Heading,Radio,RadioGroup} from '@chakra-ui/react'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import { crearUsuario } from '../../data/usuario'
import { Formik } from 'formik'
import FormInput from '../../components/FormInput'
import FormikError from '../../components/FormikError'
import userValidation from '../../validations/userValidation'

const usuario = () => {
    const router = useRouter()
    return(
    <Container maxW="container.md">
        <Heading textAlign={"center"} my={10}>Ingresar Usuario</Heading>
        <Formik
        initialValues={{
            name: "",
            email:"",
            role:"",
            rolUsuario:""
        }}
        validationSchema={userValidation}
        onSubmit = {async (values) => {
            console.log(values)
            try {
                const response = await crearUsuario(values)
                if (response.status===201){
                    Swal.fire({
                        icon:'success',
                        title:'Usuario Creado',
                        text:'El usuario se ingreso correctamente'
                    }).then(()=> {
                        router.push('/usuarios/ver')
                    })
                }
            } catch (error) {
                console.log(error)
                Swal.fire({
                    icon: 'error',
                    title: 'Ha ocurrido un error',
                    text: `${error}`
                })
            }
        }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit
            }) => (
                <form onSubmit={handleSubmit} id="from">
                    <Stack>
                        <FormInput onChange={handleChange} placeholder="Nombre usuario" label="Nombre" type={"text"} name={"name"} onBlur={handleBlur} value={values.name}/>
                        {touched.name && errors.name && <FormikError error ={errors.name}/> }
                        <FormInput onChange={handleChange} placeholder="Ingrese Correo" label="Correo" type={"text"} name={"email"} onBlur={handleBlur} value={values.email}/>
                        {touched.email && errors.email && <FormikError error ={errors.email}/> }
                        <FormInput onChange={handleChange} placeholder="Rol para usuario" label="Rol" type={"text"} name={"role"} onBlur={handleBlur} value={values.role}/>
                        {touched.role && errors.role && <FormikError error ={errors.role}/>}
                        <RadioGroup >
                            <HStack spacing='24px'>
                                <Radio value='user' onChange={handleChange} name={"rolUsuario"}>user</Radio>
                                <Radio value='admin' onChange={handleChange} name={"rolUsuario"}>admin</Radio>
                            </HStack>
                        </RadioGroup>
                        {touched.rolUsuario && errors.rolUsuario && <FormikError error ={errors.rolUsuario}/>}
                    </Stack>
                    <Button colorScheme="teal" size="md" type="submit" my={5} onClick={handleSubmit}>Ingresar usuario</Button>
                </form>
            )}
        </Formik>
    </Container>
    )
}

export default usuario