import { useState, useEffect } from 'react'
import { Button, Container, HStack, Table, Thead, Tbody, Tfoot, Tr, Th, Td, Heading,Box, AccordionIcon } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Arriba from '../../components/Arriba'

const archivos= () => {

    const [archivos, setArchivos] = useState([])
    const router = useRouter()

    const getArchivos = async () => {
        const response = await axios.get(`${process.env.API_URL}/files`)
        setArchivos(response.data)
    }

    useEffect(()=>{
        getArchivos()
    }, [])

    const showArchivos = () =>{
        return archivos.map(archivos =>{
            return(
                <Tr key={archivos._id}>
                    <Td>{archivos.name}</Td>
                    <Td>{archivos.asamblea.name}</Td>
                    <Td>{archivos.fecha}</Td>
                    <Td><Button onClick={()=>router.push(`${process.env.API_URL}/file/download/${archivos._id}`)}>Download</Button></Td>
                    <Td><Button onClick={()=>router.push(`/asamblea/ver/${archivos.asamblea._id}`)}>Detalles</Button></Td>
                </Tr>
            )
        })
    }

    return (
        <Box>
            <Arriba/>
            <Container maxW="container.xl">
            <Heading textAlign={"center"} my={15}>Archivos</Heading>
            <Button colorScheme={"teal"} float={'right'} onClick={()=>router.push('/')} >Volver</Button>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Td>Nombre</Td>
                        <Td>Asamblea</Td>
                        <Td>Fecha</Td>
                        <Td>Descarga</Td>
                    </Tr>
                </Thead>
                <Tbody>
                    {showArchivos()}
                </Tbody>
            </Table>
            </Container>
        </Box>
    )
    }

export default archivos