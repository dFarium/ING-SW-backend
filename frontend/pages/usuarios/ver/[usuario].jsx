import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Container, Heading, Tbody,Stack,HStack,Button,RadioGroup,Radio,Box } from '@chakra-ui/react'
import ShowInfo from '../../../components/ShowInfo'
import Swal from 'sweetalert2'
import {checkToken} from '../../../data/usuario'
const jwt = require("jwt-simple")
import Arriba from '../../../components/Arriba'

export async function getServerSideProps(context){
    try {
        const res = await checkToken(context.req.headers.cookie)
        const decode = jwt.decode(context.req.cookies.token,process.env.SECRET_KEY)
            if (res.status === 200){
                const response = await axios.get(`${process.env.API_URL}/user/search/${context.params.usuario}`)
                return{
                    props:{
                        usuarioId: response.data,
                        existe: res.config.headers.cookie,
                        rol:decode.rol
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
    const router = useRouter()
    const [usuarios] = useState(data)
    const[values, setValues] = useState({rolUsuario: 'admin'})

    const onChange = async (e) =>{
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }


    const eliminarUsuario = async () =>{
        if(data.rol==='admin'){
            try {
                const response = await axios.delete(`${process.env.API_URL}/user/delete/${usuarios.usuarioId._id}`,{data: values})
                if (response.status === 200){
                    Swal.fire({
                        title: 'Usuario eliminado',
                        text: 'El usuario se ha eliminado exitosamente',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    }).then(()=> {
                        router.push('/usuarios/ver')
                    })
                }
                }catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: `El usuario no se ha podido eliminar ${error}`,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            }
        }else{
            Swal.fire({
                title: 'Error',
                text: `No tiene los permisos para eliminar usuarios`,
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    }

    return (
        <Box>
            <Arriba token={data.existe}/>
            <Container maxW="container.xl" centerContent>
                <Heading my={10}> {usuarios.usuarioId.name}</Heading>
                <HStack w={"full"} py={10}>
                    <Button w={"full"} colorScheme={"teal"} onClick={() => router.push(`/usuarios/editar/${usuarios.usuarioId._id}`)}>Editar</Button>
                    <Button w={"full"} colorScheme={"teal"} onClick={() => eliminarUsuario()}>Eliminar</Button>
                    <Button w={"full"} colorScheme={"teal"} onClick={() => router.push("/usuarios/ver")}>Volver</Button>
                </HStack>
                <Stack w={"full"}>
                    <ShowInfo tag="Nombre" data={usuarios.usuarioId.name} />
                    <ShowInfo tag="Correo" data={usuarios.usuarioId.email} />
                    <ShowInfo tag="Rol" data={usuarios.usuarioId.role}/>
                </Stack>
                <RadioGroup >
                    <HStack spacing='24px'>
                    <Radio value='user' onChange={onChange} name={"rolUsuario"}>user</Radio>
                    <Radio value='admin' onChange={onChange} name={"rolUsuario"}>admin</Radio>
                    </HStack>
                </RadioGroup>
            </Container>
        </Box>
    )
}

export default usuario