import { useState, useEffect } from 'react'
import { Container, Table, Thead, Tbody, Tr, Td, Heading } from '@chakra-ui/react'
import axios from 'axios'


export default function Home() {

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
                    <Td>{asamblea.archivos}</Td>
                </Tr>
            )
        })
    }
    return (
        <Container maxW="container.xl" centerContent>
        <Heading textAlign={"center"} my={10}>Asambleas</Heading>
        <Table variant="simple">
            <Thead>
                <Tr>
                    <Td>Nombre</Td>
                    <Td>Tipo</Td>
                    <Td>Fecha</Td>
                    <Td>Arhivos</Td>
                </Tr>
            </Thead>
            <Tbody>
                {showAsambleas()}
            </Tbody>
        </Table>
        </Container>
    )
    }
