import { Container,Heading,  Button, HStack} from '@chakra-ui/react'
import React from 'react'
import { useRouter } from 'next/router'

export const index = () => {

    const router = useRouter()
    return (
        <Container maxW="container.xl" centerContent>
            <Heading textAlign={"center"} my={10}>Bienvenido</Heading>
            <HStack w={"full"} py={'28'}>
                <Button w={"full"} colorScheme={"teal"} float={"right"} onClick={()=>router.push('/asamblea/ver')} >Asambleas</Button>
                <Button w={"full"} colorScheme={"teal"} float={"right"} onClick={()=>router.push('/archivos/verArchivos')} >Historial de Actas</Button>
                <Button w={"full"} colorScheme={"teal"} float={"right"} onClick={()=>router.push('/asamblea/ver')} >Mandar Avisos</Button>
            </HStack>
        </Container>
    )
}

export default index
