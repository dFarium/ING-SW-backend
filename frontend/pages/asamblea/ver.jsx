import { useState, useEffect } from 'react'
import { Container, Table, Thead, Tbody, Tr, Td, Heading, Button,Box } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Arriba from '../../components/Arriba'
import Swal from 'sweetalert2'

const asamblea = () => {
    const router = useRouter()
    const [asambleas, setAsambleas] = useState([])

    const getAsambleas = async () => {
        try {
            const response =await axios.get(`${process.env.API_URL}/asambleas`)
            setAsambleas(response.data)
        } catch (error) {
            Swal.fire({
                title: 'Sin Asambleas',
                text: `No existe ninguna asamblea por el momento`,
                icon: 'warning',
                confirmButtonText: 'Ok'
            })
        }
    }

    const subirArchivos = async (id_asamblea) => {

        const { value: file } = await Swal.fire({
        title: 'Select File',
        input: 'file',
        })
        if (file){
            try {
                const formData = new FormData();
                formData.append("archivos", file)
                const response = await axios.post(`${process.env.API_URL}/file/carpeta/${id_asamblea}`, formData, {headers:{"Content-Type": "multi/form-data"}} )
                console.log(response)
                if (response.status === 201){
                    Swal.fire({
                        title: 'Archivo Subido',
                        text: 'El archivo se ha eliminado con exito',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })
                }
                }catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: `El archivo no se ha subido`,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            }
        }else{
            Swal.fire({
                title: 'Seleccione un archivo',
                text: `No ha seleccionado ningún archivo`,
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
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
                    <Td>
                    <Button onClick={()=>subirArchivos(asamblea._id)}>Subir</Button>
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
                            <Td>Subir</Td>
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
