import { useState, useEffect } from 'react'
import { Container, Table, Thead, Tbody, Tr, Td, Heading, Button, Box } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { getUsuario, checkToken } from '../../data/usuario'
import Arriba from '../../components/Arriba'
import { ArrowBackIcon, AddIcon} from '../../node_modules/@chakra-ui/icons'
const jwt = require('jwt-simple')

export const getServerSideProps = async (context) => {
    try {
        const response = await getUsuario(context.req.headers.cookie)
        const res = await checkToken(context.req.headers.cookie)
        // console.log(context.cookies.token)
        if (response.status === 200){
            return {
                props: {
                    user: response.data,
                    existe: res.config.headers.cookie
                }
            }
        }
    } catch (error) {
        console.log("Error: ",error)
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
}

const usuario = (data) => {
    const router = useRouter()
    const [usuario] = useState(data)

    // const getUsuario = async () => {
        
    //     setUsuario(response.data)
    // }

    // useEffect(()=>{
    //     getUsuario()
    // }, [])
    const showUsuario = () =>{
        return usuario.user.map(usuario =>{
            return(
                <Tr key={usuario._id}>
                    <Td>{usuario.name}</Td>
                    <Td>{usuario.email}</Td>
                    <Td>{usuario.role}</Td>
                    <Td>
                        <Button onClick={()=>router.push(`/usuarios/ver/${usuario._id}`)}>Ver mas</Button>
                    </Td>
                </Tr>
            )
        })
    }
    return (
        <Box>
            <Arriba token={data.existe}/>
            <Container maxW="container.xl">
            <Heading textAlign={"center"} my={15}>Usuario</Heading>
            <Button leftIcon={<AddIcon />}  colorScheme={"teal"} float={"right"} onClick={()=>router.push('/usuarios/crear_usuario')} >Ingresar Usuario</Button>
            <Button leftIcon={<ArrowBackIcon />}  colorScheme={"teal"} float={"left"} onClick={()=>router.push('/')} >Volver</Button>
            <Table variant="simple" my={15}>
                <Thead>
                    <Tr>
                        <Td>Nombre</Td>
                        <Td>Correo</Td>
                        <Td>Rol</Td>
                    </Tr>
                </Thead>
                <Tbody>
                    {showUsuario()}
                </Tbody>
            </Table>
            </Container>
        </Box>
    )
    }

export default usuario