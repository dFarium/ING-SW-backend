import { Button, Container, Stack,HStack ,Heading,Radio,RadioGroup,Box, FormLabel} from '@chakra-ui/react'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import { crearUsuario, checkToken } from '../../data/usuario'
import { Formik } from 'formik'
import FormInput from '../../components/FormInput'
import FormikError from '../../components/FormikError'
import userValidation from '../../validations/userValidation'
import Arriba from '../../components/Arriba'
const jwt = require("jwt-simple")

export const getServerSideProps = async (context) => {
    try {
        const response = await checkToken(context.req.headers.cookie)
        const decode = jwt.decode(context.req.cookies.token,process.env.SECRET_KEY)
        if (decode.rol === 'admin'){
            if (response.status === 200){
                return{
                    props: {
                        existe: response.config.headers.cookie
                    }
                }
            }else{
                return{
                    redirect: {
                        destination: "/",
                        permanent: false
                    }
                }
            }
        }else{
            return{
                redirect: {
                    destination: "/",
                    permanent: false
                }
            }
        }
    } catch (error) {
        console.log(error)
        return{
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }
}


const usuario = (data) => {

    const router = useRouter()
    return(
    <Box>
    <Arriba token={data.existe}/>
    <Container maxW="container.md">
    <Button colorScheme={"teal"} float={"left"} onClick={()=>router.push('/usuarios/ver')} >Volver</Button>
        <Heading textAlign={"center"} my={10}>Ingresar Usuario</Heading>
        <Formik
        initialValues={{
            name: "",
            email:"",
            role:"",
            rolUsuario:"admin"
        }}
        validationSchema={userValidation}
        onSubmit = {async (values) => {
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
                        <RadioGroup >
                            <FormLabel>Rol del usuario</FormLabel>
                            <HStack spacing='24px'>
                                <Radio value='user' onChange={handleChange} name={"role"}>Usuario</Radio>
                                <Radio value='admin' onChange={handleChange} name={"role"}>Administrador</Radio>
                            </HStack>
                        </RadioGroup>
                        {touched.role && errors.role && <FormikError error ={errors.role}/>}
                        {/* <RadioGroup >
                            <HStack spacing='24px'>
                                <Radio value='user' onChange={handleChange} name={"rolUsuario"}>user</Radio>
                                <Radio value='admin' onChange={handleChange} name={"rolUsuario"}>admin</Radio>
                            </HStack>
                        </RadioGroup> */}
                        {touched.rolUsuario && errors.rolUsuario && <FormikError error ={errors.rolUsuario}/>}
                    </Stack>
                    <Button colorScheme="teal" size="md" type="submit" my={5} onClick={handleSubmit}>Ingresar usuario</Button>
                </form>
            )}
        </Formik>
    </Container>
    </Box>
    )
}

export default usuario