import { useState, useEffect } from 'react'
import { Container, Table, Thead, Tbody, Tr, Td, Heading, Button, Link } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'


const usuario = () => {
    const router = useRouter()
    const [usuario, setUsuario] = useState([])

    const getUsuario = async () => {
        const response =await axios.get(`${process.env.API_URL}/users`)
        setUsuario(response.data)
    }

    useEffect(()=>{
        getUsuario()
    }, [])

    const showUsuario = () =>{
        return usuario.map(usuario =>{
            return(
                <Tr key={usuario._id}>
                    <Td>{usuario.name}</Td>
                    <Td>{usuario.email}</Td>
                    <Td>{usuario.role}</Td>
                    {/* <Td>
                        <Button onClick={()=>router.push(`/asamblea/ver/${asamblea._id}`)}>Ver mas</Button>
                    </Td> */}
                </Tr>
            )
        })
    }
    return (
        <Container maxW="container.xl">
            <Heading textAlign={"center"} my={15}>Usuario</Heading>
            <Button colorScheme={"teal"} float={"right"} onClick={()=>router.push('/usuarios/crear_usuario')} >Ingresar Usuario</Button>
            <Button colorScheme={"teal"} float={"left"} onClick={()=>router.push('/')} >Volver</Button>
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
    )
    }

export default usuario