import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Container, Heading, Tbody,Stack,HStack,Button,RadioGroup,Radio, Box, Divider, Accordion, AccordionItem, AccordionButton, AccordionPanel,AccordionIcon, Table, Thead, Tr, Th, Td, Link} from '@chakra-ui/react'
import ShowInfo from '../../../components/ShowInfo'
import Swal from 'sweetalert2'
import Arriba from '../../../components/Arriba'
import VerAsistencias from '../../../components/VerAsistencias'



export async function getServerSideProps(context){
    try {
        const response = await axios.get(`${process.env.API_URL}/asamblea/search/${context.params.asamblea}`)
        return{
            props:{
                asambleaId: response.data
            }
        }
    } catch (error) {
        return{
            redirect:{
                destination: '/asamblea/ver',
                permanent: true
            }
        }
    }
}

const asamblea = (data) => {
    const router = useRouter()
    const [asambleas] = useState(data)
    const[values, setValues] = useState({})

    const onChange = async (e) =>{
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }


    const eliminarAsamblea = async () =>{
        try {
            const response = await axios.delete(`${process.env.API_URL}/asamblea/delete/${asambleas.asambleaId._id}`,{data: values })
            if (response.status === 200){
                Swal.fire({
                    title: 'Asamblea eliminada',
                    text: 'La asamblea se ha eliminado con exito',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                }).then((result)=>{
                    if (result.isConfirmed){
                        router.push("/asamblea/ver")
                    }
                })
            }
            }catch (error) {
            Swal.fire({
                title: 'Error',
                text: `La asamblea no se ha podido eliminar`,
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    }

// ------------------------------------------------------------------------------------------------------------------------------------------------------------

    const [archivos, setArchivos] = useState([])

    const getAsambleaArchivos = async (id_asamblea) => {
        try {
            const response = await axios.get(`${process.env.API_URL}/file/${id_asamblea}`)
            setArchivos(response.data)
        } catch (error) {
            Swal.fire({
                title: 'Sin Archivos',
                text: `No existe ningun archivo asociado por el momento`,
                icon: 'warning',
                confirmButtonText: 'Ok'
            })
        }
    }

    const eliminarArchivos = async (id_archivo, id_asamblea) =>{
        try {
            //AGREGAR MODALs
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
        getAsambleaArchivos(asambleas.asambleaId._id)
    }, [])

    const showAsambleaArchivos = () =>{
        return archivos.map(archivos =>{
            return(
                <Tr key={archivos._id}>
                    <Td><Link color='blue.500' href={`${process.env.API_URL}/file/download/${archivos._id}`}>{archivos.name}</Link></Td>
                    <Td>{archivos.fecha}</Td>
                    <Td><Button onClick={()=>eliminarArchivos(archivos._id, asambleas.asambleaId._id)}>Eliminar</Button></Td>
                </Tr>
            )
        })
    }

//----------------------------------------------------------------------------------------------------------------------------------------------------------------

    return (
        <Box>
            <Arriba/>
            <Container maxW="container.xl" centerContent>
                <Heading my={15}> {asambleas.asambleaId.name}</Heading>
                    <HStack w={"full"} py={10}>
                        <Button w={"full"} colorScheme={"teal"} onClick={() => router.push(`/asamblea/editar/${asambleas.asambleaId._id}`)}>Editar</Button>
                        <Button w={"full"} colorScheme={"teal"} onClick={() => eliminarAsamblea()}>Eliminar</Button>
                        <Button w={"full"} colorScheme={"teal"} onClick={() => router.push(`/asistencia/ver/${asambleas.asambleaId._id}`)}>Ver Asistencias</Button>
                        <Button w={"full"} colorScheme={"teal"} onClick={() => router.push("/asamblea/ver")}>Volver</Button>
                    </HStack>
                <RadioGroup>
                    <HStack spacing='24px'>
                    <Radio value='user' onChange={onChange} name={"rolUsuario"}>user</Radio>
                    <Radio value='admin' onChange={onChange} name={"rolUsuario"}>admin</Radio>
                    </HStack>
                </RadioGroup>
                <Divider/>
                <Stack w={"full"} py={10}>
                    <ShowInfo tag="Nombre" data={asambleas.asambleaId.name} />
                    <ShowInfo tag="Tipo" data={asambleas.asambleaId.tipo} />
                    <Accordion allowMultiple>
                        <AccordionItem my={'15'}>
                            <h2>
                                <AccordionButton>
                                    <Box as="span" flex='1' textAlign='left'>
                                    Archivos Adjuntos
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={'4'}>
                                <Table my={15} variant="simple">
                                    <Thead>
                                        <Tr>
                                            <Td>Archivo</Td>
                                            <Td>Fecha</Td>
                                            <Td>Eliminar</Td>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {showAsambleaArchivos()}
                                    </Tbody>
                                </Table>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>


                </Stack>
                
            </Container>
        </Box>
    )
}

export default asamblea