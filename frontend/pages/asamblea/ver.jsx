import { useState, useEffect } from 'react'
import { Container, Table, Thead, Tbody, Tr, Td, Heading, Button, Link } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'


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
                    <Link href>
                    <Button my={2} onClick={()=>router.push(`/asamblea/${asamblea._id}`)}>Ver mas</Button>
                    </Link>
                </Tr>
            )
        })
    }
    return (
        <Container maxW="container.xl"  >
            <Heading textAlign={"center"} my={15} paddingBottom={15}>Asambleas</Heading>
            <Button colorScheme={"teal"} float={"right"} onClick={()=>router.push('/asamblea/crear')} >Crear Asamblea</Button>
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
    )
    }

export default asamblea
