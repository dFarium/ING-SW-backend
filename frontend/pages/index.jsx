import { Container,Heading,  Button, HStack,Link, Box, Icon} from '@chakra-ui/react'
import React from 'react'
import { useRouter } from 'next/router'
import Arriba from '../components/Arriba'
import {checkToken} from '../data/usuario'
import { GrMail } from 'react-icons/gr'
import { HiUserGroup } from 'react-icons/hi'
import { FaUserAlt } from 'react-icons/fa'
import { AiFillFile } from 'react-icons/ai'
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

    const indexButton = (nombre, ruta, nombreIcon) => {
        return(
            <Button mx='10' fontSize='30' size='lg' height='24' width='container.lg' colorScheme={'teal'} onClick={()=>router.push(ruta)}>
                <Icon mx={'1.5'} w={'10'} h={'10'} as={nombreIcon}/>
                    {nombre}
            </Button>
        )
    }
    return (
        <Box >
            <Arriba token={data.existe}/>
        <Box >
            <Container maxW="container.xl">
                <Heading  textAlign={"center"} size='3xl' my={15}>Bienvenido</Heading>
                <HStack w={"full"} py={'20'}>
                    {indexButton('Asamblea','/asamblea/ver', HiUserGroup,)}
                    {indexButton('Historial de Actas', '/archivos/verArchivos', AiFillFile)}
                </HStack>
                <HStack w={"full"} py={'10'}>
                    {indexButton('Mandar Avisos', '/enviar_email/email', GrMail)}
                    {indexButton('Ver Usuarios','/usuarios/ver', FaUserAlt)}
                </HStack>
            </Container>
        </Box>
        </Box>
    )
}

export default index