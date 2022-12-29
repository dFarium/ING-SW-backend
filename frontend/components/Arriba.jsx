import React from 'react'
import { Box, Heading, Button, Image, Link, Flex} from '@chakra-ui/react'

const Arriba = () => {
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