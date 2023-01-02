import React from 'react'
import { Box, Heading, Button, Image, Link, Flex, cookieStorageManager} from '@chakra-ui/react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import {logout} from '../data/usuario'
import Menu from './Menu'
import { Icon } from '@chakra-ui/react'
import { BiLogOut, BiLogIn } from 'react-icons/bi'




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
            texto= <Button leftIcon={<Icon as={BiLogOut}/>} colorScheme={"blackAlpha"} onClick={onSubmit}>CERRAR SESION</Button>
        }else{
            console.log('xao')
            texto = <Button leftIcon={<Icon as={BiLogIn}/>} colorScheme={"blackAlpha"} onClick={() => router.push('/loguearse/login')}>INICIAR SESION</Button>
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