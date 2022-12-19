import { Container,Heading,Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'

export const index = () => {

    const router = useRouter()
    return (
        <Container my={10}>
            <Heading textAlign={"center"}>INDEX</Heading>
            <Button colorScheme={"teal"} onClick={()=>router.push('/asamblea/ver')}>Asamblea</Button>
        </Container>
    )
}

export default index
