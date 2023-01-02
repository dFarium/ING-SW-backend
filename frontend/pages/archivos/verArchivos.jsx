import { useState, useEffect } from 'react'
import { Button, Container, HStack, Table, Thead, Tbody, Tfoot, Tr, Th, Td, Heading,Box, AccordionIcon,useDisclosure, Link, Modal,ModalBody,ModalFooter,ModalCloseButton,ModalContent,ModalOverlay,ModalHeader } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Arriba from '../../components/Arriba'
import Swal from 'sweetalert2'
import {checkToken} from '../../data/usuario'
const jwt = require('jwt-simple')
import { DownloadIcon, DeleteIcon, ArrowBackIcon} from '../../node_modules/@chakra-ui/icons'


//funcion para obtener la cookie y ver que rol tiene el usuario
export async function getServerSideProps(context){
    try {
        const res = await checkToken(context.req.headers.cookie)
        const decode = jwt.decode(context.req.cookies.token,process.env.SECRET_KEY)
            if (res.status === 200){
                return{
                    props:{
                        existe: res.config.headers.cookie,
                        rol:decode.rol
                    }
                }
            }else{
                return{
                    redirect: {
                        destination: "/",
                        permanent: false
                    }
                }
            }
    } catch (error) {
        console.log("ERROR",error)
        return{
            redirect:{
                destination: '/',
                permanent: true
            }
        }
    }
}

const archivos= (data) => {

    const [archivos, setArchivos] = useState([])
    const router = useRouter()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const getArchivos = async () => {
        try {
            const response = await axios.get(`${process.env.API_URL}/files`)
            setArchivos(response.data)
        } catch (error) {
            Swal.fire({
                title: 'Sin Archivos',
                text: `No existe ningun archivo por el momento`,
                icon: 'warning',
                confirmButtonText: 'Ok'
            })
        }
    }

    const eliminarArchivos = async (id_archivo, id_asamblea) =>{
        if(data.rol==='admin'){
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
    }

    const showEliminar = ()=>{
        if(data.rol==='admin'){
            return(
                <Td>Eliminar</Td>
            )
        }
    }


    useEffect(()=>{
        getArchivos()
    }, [])

    const showArchivos = () =>{
        return archivos.map(archivos =>{
            const [fecha, horas] = archivos.fecha.split('T')
            const [ano,mes,dia] =fecha.split('-')
            const [hora, min] =horas.split(':')
            const time = dia + '-' + mes + '-'  + ano + '   ' + hora+':' + min
            if(data.rol==='admin'){
                return(
                    <Tr key={archivos._id}>
                        <Td>{archivos.name}</Td>
                        <Td><Link color='blue.400' href={`/asamblea/ver/${archivos.asamblea._id}`}>{archivos.asamblea.name}</Link></Td>
                        <Td>{time}</Td>
                        <Td><Button mx={'2.5'} bg={'white'} onClick={()=>router.push(`${process.env.API_URL}/file/download/${archivos._id}`)}><DownloadIcon  w={6} h={6} color="green.500" ></DownloadIcon></Button></Td>
                        <Td>
                            <Modal isOpen={isOpen} onClose={onClose}>
                                <ModalOverlay/>
                                    <ModalContent>
                                        <ModalHeader>Eliminar?</ModalHeader>
                                        <ModalCloseButton/>
                                        <ModalBody>¿Esta seguro de eliminar este archivo</ModalBody>
                                        <ModalFooter justifyContent={"space-between"}>
                                            <Button colorScheme={"red"} onClick={() =>{onClose(); eliminarArchivos(archivos._id, archivos.asamblea._id);}}>Eliminar</Button>
                                            <Button colorScheme={"teal"} onClick={onClose}>Cancelar</Button>
                                        </ModalFooter>
                                    </ModalContent>
                            </Modal>
                            <Button mx={'2.5'}  bg={'white'} onClick={onOpen}>
                                <DeleteIcon  w={6} h={6} color="red.400"></DeleteIcon>
                            </Button>
                        </Td>
                    </Tr>
                )
            }else{
                return(
                    <Tr key={archivos._id}>
                        <Td>{archivos.name}</Td>
                        <Td><Link color='blue.400' href={`/asamblea/ver/${archivos.asamblea._id}`}>{archivos.asamblea.name}</Link></Td>
                        <Td>{time}</Td>
                        <Td><Button mx={'2.5'} bg={'white'} onClick={()=>router.push(`${process.env.API_URL}/file/download/${archivos._id}`)}><DownloadIcon  w={6} h={6} color="green.500" ></DownloadIcon></Button></Td>
                    </Tr>
                )
            }
        })
    }

    return (
        <Box>
            <Arriba token={data.existe}/>
            <Container maxW="container.xl">
            <Heading textAlign={"center"} my={15}>Historial de Actas</Heading>
            <Button leftIcon={<ArrowBackIcon />}  colorScheme={"teal"} my={15} mx={15} float={'left'} onClick={()=>router.push('/')} >Volver</Button>
            <Table my={15} variant="simple">
                <Thead>
                    <Tr>
                        <Td>Archivo</Td>
                        <Td>Asamblea</Td>
                        <Td>Fecha</Td>
                        <Td>Descargar</Td>
                        {showEliminar()}
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