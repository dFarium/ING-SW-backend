import { useState, useEffect } from 'react'
import { Button, Container, HStack, Table, Thead, Tbody, Tfoot, Tr, Th, Td, Heading,Box, AccordionIcon, Link, chakra } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Arriba from '../../components/Arriba'
//import { DownloadIcon } from '@chakra-ui/icons'

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
                    {/* <Td><Link color='blue.400' href={`${process.env.API_URL}/file/download/${archivos._id}`}>{archivos.name}</Link></Td> */}
                    {/* <Td>{archivos.asamblea.name}</Td> */}
                    <Td><Link color='blue.400' href={`/asamblea/ver/${archivos.asamblea._id}`}>{archivos.asamblea.name}</Link></Td>
                    <Td>{archivos.fecha}</Td>
                    <Td><Button onClick={()=>router.push(`${process.env.API_URL}/file/download/${archivos._id}`)}>Download</Button></Td>
                    {/* <Td><DownloadIcon /></Td> */}
                    <Td><Button onClick={()=>router.push(`${process.env.API_URL}/file/download/${archivos._id}`)}>Download</Button></Td>
                </Tr>
            )
        })
    }

    return (
        <Box>
            <Arriba/>
            <Container maxW="container.xl">
            <Heading textAlign={"center"} my={16}>Historial de Actas</Heading>
            <Button colorScheme={"teal"} my={15} mx={15} float={'left'} onClick={()=>router.push('/')} >Volver</Button>
            <Table my={15} variant="simple">
                <Thead>
                    <Tr>
                        <Td>Archivo</Td>
                        <Td>Asamblea</Td>
                        <Td>Fecha</Td>
                        <Td>Descarga</Td>
                        <Td>Eliminar</Td>
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