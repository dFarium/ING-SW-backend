import { useState, useEffect } from 'react'
import { Button, Container, HStack, Table, Thead, Tbody, Tfoot, Tr, Th, Td, Heading,Box, AccordionIcon, Link, chakra } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Arriba from '../../components/Arriba'
import Swal from 'sweetalert2'
//import { DownloadIcon } from '@chakra-ui/icons'

const archivos= () => {

    const [archivos, setArchivos] = useState([])
    const router = useRouter()

    const getArchivos = async () => {
        const response = await axios.get(`${process.env.API_URL}/files`)
        setArchivos(response.data)
    }

    const eliminarArchivos = async (id_archivo, id_asamblea) =>{
        try {
            const response = await axios.delete(`${process.env.API_URL}/file/delete/${id_archivo}/${id_asamblea}`)
            if (response.status === 200){
                Swal.fire({
                    title: 'Archivo eliminado',
                    text: 'El archivo se ha eliminado con exito',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                }).then((result)=>{
                    if (result.isConfirmed){
                        router.reload()
                    }
                })
            }
            }catch (error) {
            Swal.fire({
                title: 'Error',
                text: `El archivo no se ha podido eliminar`,
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
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
                    <Td><Button onClick={()=>eliminarArchivos(archivos._id, archivos.asamblea._id)}>Eliminar</Button></Td>
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