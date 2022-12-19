import { useState, useEffect } from 'react'
import { Button, Container, Input, Stack, Text, HStack, Table, Thead, Tbody, Tfoot, Tr, Th, Td, Heading, } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function Home() {


    const [archivos, setArchivos] = useState([])
    const router = useRouter()

    const getFiles = async () => {
        const response = await axios.get(`${process.env.API_URL}/files`)
        //return response
        setArchivos(response.data)
    }

    useEffect(()=>{
        getFiles()
    }, [])

    const showFiles = () =>{
        return archivos.map(files =>{
            return(
                <Tr key={files._id}>
                    <Td>{files.name}</Td>
                    <Td>{files.fecha}</Td>
                    <Td><Button onClick={()=>router.push(`/archivos/${files.asamblea}`)}>Ver mas</Button></Td>
                </Tr>
            )
        })
    }
    return (
        <Container maxW="container.xl" centerContent>
        <Heading textAlign={"center"} my={10}>Archivos</Heading>
        <Table variant="simple">
            <Thead>
                <Tr>
                    <Td>Nombre</Td>
                    <Td>Fecha</Td>
                </Tr>
            </Thead>
            <Tbody>
                {showFiles()}
            </Tbody>
        </Table>
        </Container>
    )
    }
