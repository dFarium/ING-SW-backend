import { useState, useEffect } from 'react'
import { Button, Container, HStack, Table, Thead, Tbody, Tfoot, Tr, Th, Td, Heading, } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'

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
                    <Td>{archivos.fecha}</Td>
                    <Td><Button onClick={()=>router.push(`/archivos/${archivos._id}`)}>Ver mas</Button></Td>
                </Tr>
            )
        })
    }
    return (
        <Container maxW="container.xl">
        <Heading textAlign={"center"} my={10}>Archivos</Heading>
        <Button colorScheme={"teal"} float={'right'} onClick={()=>router.push('/')} >Volver</Button>
        <Table variant="simple">
            <Thead>
                <Tr>
                    <Td>Nombre</Td>
                    <Td>Fecha</Td>
                </Tr>
            </Thead>
            <Tbody>
                {showArchivos()}
            </Tbody>
        </Table>
        </Container>
    )
    }

export default archivos