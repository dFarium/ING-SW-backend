import React from 'react'
import { Box, Heading, Button, Image, Link, Flex} from '@chakra-ui/react'
import Cookies from 'js-cookie'


const Arriba = ({token}) => {
    
    const Cambiar_Link = () =>{
        let texto
        if(token){
            console.log('hola')
            texto= <Link href="/loguearse/logout">Logout</Link>
            }else{
                console.log('xao')
            texto=<Link href="/loguearse/login">INICIAR SESION</Link>
            }
            return texto
    }
    
    return (
        <Box bg="gray.800" color="white">
            <Flex alignItems="center" justifyContent="space-between" px={6} py={4}>
                <Flex>
                    <Link href="/">Inicio</Link>
                </Flex>
                <Flex justifyContent="space-between">
                    {Cambiar_Link()}
                </Flex>
            </Flex>
    </Box>
    )
}

export default Arriba