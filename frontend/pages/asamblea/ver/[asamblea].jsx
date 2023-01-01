import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Container, Heading, Tbody,Stack,HStack,Button,RadioGroup,Radio, Box, Divider, Accordion, AccordionItem, AccordionButton, AccordionPanel,AccordionIcon, Table, Thead, Tr, Th, Td, Link} from '@chakra-ui/react'
import ShowInfo from '../../../components/ShowInfo'
import Swal from 'sweetalert2'
import Arriba from '../../../components/Arriba'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure
  } from '@chakra-ui/react'
import {checkToken} from '../../../data/usuario'
const jwt = require("jwt-simple")

export async function getServerSideProps(context){
    try {
        const res = await checkToken(context.req.headers.cookie)
        const decode = jwt.decode(context.req.cookies.token,process.env.SECRET_KEY)
            if (res.status === 200){
                const response = await axios.get(`${process.env.API_URL}/asamblea/search/${context.params.asamblea}`)
                return{
                    props:{
                        asambleaId: response.data,
                        existe: res.config.headers.cookie,
                        rol:decode.rol
                    }
                }
            }else{
                console.log("No hay token")
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
                destination: '/asamblea/ver',
                permanent: true
            }
        }
    }
}


// export async function getServerSideProps(context){
//     try {
//         const response = await axios.get(`${process.env.API_URL}/asamblea/search/${context.params.asamblea}`)
//         return{
//             props:{
//                 asambleaId: response.data
//             }
//         }
//     } catch (error) {
//         return{
//             redirect:{
//                 destination: '/asamblea/ver',
//                 permanent: true
//             }
//         }
//     }
// }

const asamblea = (data) => {
    const router = useRouter()
    const [asambleas] = useState(data)
    const[values, setValues] = useState({})
    const { isOpen, onOpen, onClose } = useDisclosure()
// ------------------------------------------------------------------------------------------------------------------------------------------------------------
    //moi
    const [comentarios, setComentarios] = useState([])
    //moi
    
    const obtenerComentarios = async (id_asamblea) => {
        try {
            const response = await axios.get(`${process.env.API_URL}/comentario/specific/${id_asamblea}`)
            setComentarios(response.data)
        } catch (error) {
        }
    }
    //moi
    useEffect(() => {
        obtenerComentarios(asambleas.asambleaId._id)
    }, [])
    //moi
    const showComentarios = () => {
        return comentarios.map(comentario => {
            return (
                <Tr key={comentario._id}>
                <Td maxW="500">{comentario.apartado}</Td>
                <Td maxW="500">{comentario.fecha}</Td>
                <Td maxW="500">{comentario.user && comentario.user.name}</Td>
                <Td><Button colorScheme="twitter" variant='link' onClick={() => router.push(`/comentarios/comentario/${comentario._id}`)}>detalle</Button></Td>
                </Tr>
            )
        })
    }
// ------------------------------------------------------------------------------------------------------------------------------------------------------------
    const onChange = async (e) =>{
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }


    const eliminarAsamblea = async () =>{
        if (data.rol==='admin'){
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
        }else{
            Swal.fire({
                title: 'Error',
                text: `No tiene los permisos para eliminar asambleas`,
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    }

    const desvincularArchivos = async () =>{
        if (data.rol==='admin'){
        try {
            const response = await axios.delete(`${process.env.API_URL}/file/deleteAll/${asambleas.asambleaId._id}`)
            if (response.status === 200){
                Swal.fire({
                    title: 'Archivos Asociados eliminados',
                    text: 'Los archivos adjuntos de la asamblea han sido borrados',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                }).then(()=>{
                    eliminarAsamblea()
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
        }else{
            Swal.fire({
                title: 'Error',
                text: `No tiene los permisos para eliminar archivos asociados`,
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
        }
    }

    const eliminarArchivos = async (id_archivo, id_asamblea) =>{
        if (data.rol==='admin'){
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
        }else{
            Swal.fire({
                title: 'Error',
                text: `No tiene los permisos para eliminar archivos`,
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
                    <Td ><Link color='blue.500' href={`${process.env.API_URL}/file/download/${archivos._id}`}>{archivos.name}</Link></Td>
                    <Td >{archivos.fecha}</Td>
                    <Td ><Button colorScheme={"red"} onClick={()=>eliminarArchivos(archivos._id, asambleas.asambleaId._id)}>Eliminar</Button></Td>
                </Tr>
            )
        })
    }
//----------------------------------------------------------------------------------------------------------------------------------------------------------------

    const subirArchivos = async (id_asamblea) => {

        if (data.rol==='admin'){
        const { value: file } = await Swal.fire({
        title: 'Seleccionar Archivo',
        input: 'file',
        })
        if (file){
            try {
                const formData = new FormData();
                formData.append("archivos", file)
                const response = await axios.post(`${process.env.API_URL}/file/carpeta/${id_asamblea}`, formData, {headers:{"Content-Type": "multi/form-data"}} )

                if (response.status == 201){
                    Swal.fire({
                        title: 'Archivo Subido',
                        text: 'El archivo se ha subido con exito',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    }).then((result)=>{
                        if (result.isConfirmed){
                            router.reload()
                        }
                    })
                }
                }catch (error) {
                if(error.response.status == 415){
                    Swal.fire({
                        title: 'Error',
                        text: `El tipo de archivo es invalido`,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    })
                }else{
                    Swal.fire({
                        title: 'Error',
                        text: `El archivo no se ha subido`,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    })
                }
            }
        }else{
            Swal.fire({
                title: 'Seleccione un archivo',
                text: `No ha seleccionado ningún archivo`,
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
        }else{
            Swal.fire({
                title: 'Error',
                text: `No tiene los permisos para subir archivos`,
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    }


//----------------------------------------------------------------------------------------------------------------------------------------------------------------

    return (
        <Box>
            <Arriba token={data.existe}/>
            <Container maxW="container.xl" >
                <Heading my={15} textAlign={"center"}> {asambleas.asambleaId.name}</Heading>


                <Button float={"left"} colorScheme={"teal"} onClick={() => router.push("/asamblea/ver")}>Volver</Button>
                    <HStack w={"full"} py={10}>
                        <Button w={"full"} colorScheme={"green"} onClick={() => router.push(`/asamblea/editar/${asambleas.asambleaId._id}`)}>Editar</Button>
                        <Button w={"full"} colorScheme={"teal"} onClick={() => router.push(`/asistencia/ver/${asambleas.asambleaId._id}`)}>Ver asistencias asamblea</Button>
                        <Button w={"full"} colorScheme={"red"} onClick={onOpen}>Eliminar asamblea</Button>
                        
                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay/>
                                <ModalContent>
                                    <ModalHeader>Eliminar?</ModalHeader>
                                    <ModalCloseButton/>
                                    <ModalBody>¿Esta seguro de eliminar esta asamblea?</ModalBody>
                                    <ModalFooter justifyContent={"space-between"}>
                                        <Button colorScheme={"red"} onClick={() => {onClose(); desvincularArchivos();} }>Eliminar</Button>
                                        <Button colorScheme={"teal"} onClick={onClose}>Cancelar</Button>
                                    </ModalFooter>
                                </ModalContent>
                        </Modal>

                    </HStack>
                <RadioGroup >
                    <HStack spacing='24px' >
                    <Radio value='user' onChange={onChange} name={"rolUsuario"}>user</Radio>
                    <Radio value='admin' onChange={onChange} name={"rolUsuario"}>admin</Radio>
                    </HStack>
                </RadioGroup>
                <Divider/>
                <Stack w={"full"} py={10}>
                    <ShowInfo tag="Nombre" data={asambleas.asambleaId.name} />
                    <ShowInfo tag="Tipo" data={asambleas.asambleaId.tipo} />
                    <Accordion allowMultiple w={"full"}>
                        <AccordionItem my={'15'}>
                            <h2>
                                <AccordionButton bg='gray.200'  _expanded={{  bg: 'teal.400', color: 'white' }}>
                                    <Box as="span" flex='1' textAlign='center'>
                                    Archivos Adjuntos
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={'4'}>
                                <Table size='sm' variant='striped' colorScheme='blackAlpha'>
                                    <Thead>
                                        <Tr>
                                            <Td>Archivos</Td>
                                            <Td>Fecha</Td>
                                            <Td>Eliminar</Td>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {showAsambleaArchivos()}
                                    </Tbody>
                                </Table>
                                <Button my={'5'} colorScheme={"teal"} float={"right"} onClick={()=>subirArchivos(asambleas.asambleaId._id)} >Subir Archivo</Button>
                            </AccordionPanel>
                        </AccordionItem>
                        {/* Acordeon 2  */}
                        <AccordionItem my={"5"}>
                            <h2>
                                {/* Colores boton */}
                                <AccordionButton bg='gray.200' _expanded={{  bg: 'orange.400', color: 'white' }}>
                                    <Box as="span" flex='1' textAlign='center'>
                                        Comentarios
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={'5'}>
                                    <Container maxW='1250px'>
                                        <Table variant="simple" >
                                        <Thead>
                                            <Tr>
                                            <Th>Comentario</Th>
                                            <Th>Fecha</Th>
                                            <Th>Usuario</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody wy={10}>
                                            {showComentarios()}
                                        </Tbody>
                                        </Table>
                                    </Container>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </Stack>
            </Container>
        </Box>
    )
}

export default asamblea