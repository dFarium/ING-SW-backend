import React from 'react'
import { Box, Button, Link, Flex} from '@chakra-ui/react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

import {logout} from '../data/usuario'
import Menu from './Menu'




const Arriba = ({token}) => {
    const router= useRouter()
    const onSubmit = async (e) => {
        //e.preventDefault()
            Cookies.remove("token")
            router.push("/")
    }



    const Cambiar_Link = () =>{
        let texto
        if(token){
            console.log('hola')
            texto= <Button colorScheme={"blackAlpha"} onClick={onSubmit}>LOGOUT</Button>
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
                    <Menu></Menu>
                </Flex>
                <Flex justifyContent="space-between">
                    {Cambiar_Link()}
                </Flex>
            </Flex>
    </Box>
    )
}

export default Arriba