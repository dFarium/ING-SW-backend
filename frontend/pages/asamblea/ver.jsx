import { useState, useEffect } from 'react'
import { Container, Table, Thead, Tbody, Tr, Td, Heading, Button,Box } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Arriba from '../../components/Arriba'

const asamblea = () => {
    const router = useRouter()
    const [asambleas, setAsambleas] = useState([])

    const getAsambleas = async () => {
        const response =await axios.get(`${process.env.API_URL}/asambleas`)
        setAsambleas(response.data)
    }

    useEffect(()=>{
        getAsambleas()
    }, [])

    const showAsambleas = () =>{
        return asambleas.map(asamblea =>{
            return(
                <Tr key={asamblea._id}>
                    <Td>{asamblea.name}</Td>
                    <Td>{asamblea.tipo}</Td>
                    <Td>{asamblea.fecha}</Td>
                    <Td>
                        <Button onClick={()=>router.push(`/asamblea/ver/${asamblea._id}`)}>Ver mas</Button>
                    </Td>
                </Tr>
            )
        })
    }

    
    return (
        <Box>
            <Arriba/>
            <Container maxW="container.xl">
                <Heading textAlign={"center"} my={15}>Asambleas</Heading>
                <Button colorScheme={"teal"} float={"right"} onClick={()=>router.push('/asamblea/crear')} >Crear Asamblea</Button>
                <Button colorScheme={"teal"} float={"left"} onClick={()=>router.push('/')} >Volver</Button>
                <Table variant="simple" my={15}>
                    <Thead>
                        <Tr>
                            <Td>Nombre</Td>
                            <Td>Tipo</Td>
                            <Td>Fecha</Td>
                            <Td>Detalles</Td>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {showAsambleas()}
                    </Tbody>
                </Table>
            </Container>
        </Box>
    )
    }

export default asamblea
