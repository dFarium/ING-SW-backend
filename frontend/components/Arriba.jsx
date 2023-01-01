import React from 'react'
import { Box, Heading, Button, Image, Link, Flex} from '@chakra-ui/react'
import Cookies from 'js-cookie'

export const getServerSideProps = async (context) => {
    try {
        const response = await checkToken(context.req.headers.cookie)
        console.log('valor: ',response)
        if (response.status === 200){
            return{
                props: {
                    verificar: response.data
                }
            }
        }
    } catch (error) {
        console.log(error)
        return{
            props: {}
        }
    }
}


const Arriba = (data) => {
    
    console.log(data)
    return (
        <Box bg="gray.800" color="white">
            <Flex alignItems="center" justifyContent="space-between" px={6} py={4}>
                <Flex>
                    <Link href="/">Inicio</Link>
                </Flex>
                <Flex justifyContent="space-between">
                    <Link>INICIAR SESION(HACER)</Link>
                </Flex>
            </Flex>
    </Box>
    )
}

export default Arriba