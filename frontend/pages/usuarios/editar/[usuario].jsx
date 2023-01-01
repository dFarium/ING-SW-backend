import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Container, Heading, Tbody,Stack,HStack,Button,FormControl,FormLabel,Input,RadioGroup,Radio,Box } from '@chakra-ui/react'
import Swal from 'sweetalert2'
import Arriba from '../../../components/Arriba'
import  {checkToken} from '../../../data/usuario'
import {userValidation} from '../../../validations/userValidation'
import { Formik } from 'formik'
import FormInput from '../../../components/FormInput'
import FormikError from '../../../components/FormikError'
const jwt = require("jwt-simple")

//FUNCION PARA OBTENER LOS USUARIOS, ADEMAS VERIFICAR SI EXISTE TOKEN Y CON ROL DE ADMINISTRADOR
export async function getServerSideProps(context){
    try {
        const res = await checkToken(context.req.headers.cookie)
        const decode = jwt.decode(context.req.cookies.token,process.env.SECRET_KEY)
        if (decode.rol === 'admin'){
            if (res.status === 200){
                const response = await axios.get(`${process.env.API_URL}/user/search/${context.params.usuario}`)
                return{
                    props:{
                        usuarioId: response.data
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
        console.log("ERROR",error)
        return{
            redirect:{
                destination: '/usuarios/ver',
                permanent: true
            }
        }
    }
}

const usuario = (data) => {

    const onChange = async (e) => {
        setValues({
        ...values,
        [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (e) =>{
        //e.preventDefault()
        console.log(`${usuarios.usuarioId._id}`)
        try {
            const response = await axios.put(`${process.env.API_URL}/user/update/${usuarios.usuarioId._id}`, values)
            if(response.status === 200){
                Swal.fire({
                    title: 'El usuario se ha modificado',
                    text: 'El usuario ha sido modificado con exito',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                }).then((result)=>{
                    if (result.isConfirmed){
                        router.push("/usuarios/ver")
                    }
                })
            }
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: 'Error',
                text: 'El usuario no se podido modificar',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    }

    const router = useRouter()
    const [usuarios] = useState(data)
    const[values, setValues] = useState({
        name: `${usuarios.usuarioId.name}`,
        email: `${usuarios.usuarioId.email}`,
        rolUsuario: ''
    })
    return(
        <Box>
            <Arriba/>
            <Container>
                <Heading textAlign={"center"} my={15}>Editar Usuario</Heading>
                <Stack>
                    <FormControl isRequired="true">
                        <FormLabel>Nombre usuario</FormLabel>
                        <Input defaultValue={`${usuarios.usuarioId.name}`} placeholder="Nombre" type={"text"} maxLength={100} onChange={onChange} name={"name"} />
                    </FormControl>

                    <FormControl isRequired="true">
                        <FormLabel>Nombre usuario</FormLabel>
                        <Input defaultValue={`${usuarios.usuarioId.email}`} placeholder="Nombre" type={"text"} maxLength={100} onChange={onChange} name={"name"} />
                    </FormControl>

                    <FormControl isRequired="true">
                        <FormLabel >rolUsuario</FormLabel>
                            <RadioGroup >
                                <HStack spacing='24px'>
                                    <Radio value='user' onChange={onChange} name={"rolUsuario"}>user</Radio>
                                    <Radio value='admin' onChange={onChange} name={"rolUsuario"}>admin</Radio>
                                </HStack>
                            </RadioGroup>
                    </FormControl>
                </Stack>
                <HStack justifyContent={"space-between"}>
                    <Button colorScheme={"teal"} type="submit" my={5} onClick={onSubmit}>Finalizar edicion</Button>
                    <Button colorScheme={"teal"} onClick={()=>router.push(`/usuarios/ver/${usuarios.usuarioId._id}`)}>Volver</Button>
                </HStack>
            </Container>
        </Box>
    )
}

export default usuario