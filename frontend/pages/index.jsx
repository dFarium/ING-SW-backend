import { Container,Heading,  Button} from '@chakra-ui/react'
import React from 'react'
import { useRouter } from 'next/router'

export const index = () => {
    // return (
    //     <Container my={10}>
    //         <Heading textAlign={"center"}>INDEX</Heading>
    //         <Button colorScheme={"teal"} float={"right"} onClick={()=>router.push('/asamblea/crear')} >Crear Asamblea</Button>
    //     </Container>
    // )

    const router = useRouter()
    return (
        <Container maxW="container.xl" centerContent>
            <Heading textAlign={"center"} my={10}>Archivos</Heading>
            <Button colorScheme={"teal"} float={"right"} onClick={()=>router.push('/asamblea/ver')} >Asambleas</Button>
        </Container>
    )
}

export default index
