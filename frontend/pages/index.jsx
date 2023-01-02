import { Container,Heading,  Button, HStack,Link, Box} from '@chakra-ui/react'
import React from 'react'
import { useRouter } from 'next/router'
import Arriba from '../components/Arriba'
import {checkToken} from '../data/usuario'
// let token

export const getServerSideProps = async (context) => {
    try {
        const response = await checkToken(context.req.headers.cookie)
        if (response.status === 200){
            return{
                props: {
                    existe: response.config.headers.cookie
                }
            }
        }
    } catch (error) {
        return{
            props: {}
        }
    }
}

export const index = (data) => {
    // console.log(token)
    const router = useRouter()
    return (
        <Box >
            <Arriba token={data.existe}/>
        <Box >
            <Container maxW="container.xl">
                <Heading textAlign={"center"} my={15}>Bienvenido</Heading>
                <HStack w={"full"} py={'28'}>
                    <Button w={"full"} colorScheme={"teal"} float={"right"} onClick={()=>router.push('/asamblea/ver')}>Asambleas</Button>
                    <Button w={"full"} colorScheme={"teal"} float={"right"} onClick={()=>router.push('/archivos/verArchivos')}>Historial de Actas</Button>
                    <Button w={"full"} colorScheme={"teal"} float={"right"} onClick={()=>router.push('/enviar_email/email')} >Mandar Avisos</Button>
                </HStack>
                <HStack w={"full"} py={'28'}>
                    <Button w={"full"} colorScheme={"teal"} float={"right"} onClick={()=>router.push('/usuarios/ver')} >Ver Usuarios</Button>
                    <Button w={"full"} colorScheme={"teal"} float={"right"} onClick={()=>router.push('/loguearse/login')} >Iniciar Sesión</Button>
                    <Button w={"full"} colorScheme={"teal"} float={"right"} onClick={()=>router.push('/loguearse/logout')} >cerrar Sesión</Button>
                </HStack>
            </Container>
        </Box>
        </Box>
    )
}

export default index