import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Container,
    Heading,
    Tbody,
    Stack,
    HStack,
    Button,
    RadioGroup,
    Radio,
    Box,
    Divider,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Table,
    Thead,
    Tr,
    Th,
    Td,
    Link,
    Icon,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    Textarea,
    Input,
    Center,
    FormLabel

} from '@chakra-ui/react'
import {checkToken} from '../../../data/usuario'
const jwt = require("jwt-simple")
import ShowInfo from '../../../components/ShowInfo'
import Swal from 'sweetalert2'
import Arriba from '../../../components/Arriba'
import { BiUpload } from 'react-icons/bi'
import { DeleteIcon, EditIcon, ViewIcon, ArrowBackIcon } from '../../../node_modules/@chakra-ui/icons'

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
                        rol:decode.rol,
                        usuarioId: decode.sub
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
    const[values, setValues] = useState({
        rolUsuario: 'admin',
        asamblea: `${asambleas.asambleaId._id}`,
        user: `${data.usuarioId}`
    })
    const { isOpen: isOpenAsamblea, onOpen: onOpenAsamblea, onClose: onCloseAsamblea } = useDisclosure()
    const { isOpen: isOpenArchivo, onOpen: onOpenArchivo, onClose: onCloseArchivo } = useDisclosure()
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
            const [fecha, horas] = comentario.fecha.split('T')
            const [ano,mes,dia] =fecha.split('-')
            const [hora, min] =horas.split(':')
            const time = dia + '-' + mes + '-'  + ano + ' ' + hora +':' + min
            return (
                <Tr key={comentario._id}>
                <Td maxW="500">{comentario.apartado}</Td>
                <Td maxW="500">{time}</Td>
                <Td maxW="500">{comentario.user && comentario.user.name}</Td>
                <Td><Button colorScheme="twitter" variant='link' onClick={() => router.push(`/comentarios/comentario/${comentario._id}`)}>Detalles</Button></Td>
                </Tr>
            )
        })
    }
    //moi
    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`${process.env.API_URL}/comentario`, values)
            //setSuccessMessage(response.data.message)
            Swal.fire({
                title: 'Comentario creado',
                text: 'Comentario creado correctamente',
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload()
                }
            })
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Ha ocurrido un error',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    }

//----------------------------------------------------------------------------------------------------------------------------------------------------------------

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
                        text: 'La asamblea y sus archivos asociados se han eliminado con exito',
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
                eliminarAsamblea()
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

    const showEliminar = ()=>{
        if(data.rol==='admin'){
            return(
                <Td>Eliminar</Td>
            )
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
            const [fecha, horas] = archivos.fecha.split('T')
            const [ano,mes,dia] =fecha.split('-')
            const [hora, min] =horas.split(':')
            const time = dia + '-' + mes + '-'  + ano + ' ' + hora +':' + min

            if(data.rol === 'admin'){
                return(
                    <Tr key={archivos._id}>
                        <Td ><Link color='blue.500' href={`${process.env.API_URL}/file/download/${archivos._id}`}>{archivos.name}</Link></Td>
                        <Td >{time}</Td>
                        <Td ><Button bg={'transparent'}  onClick={onOpenArchivo}>
                        <DeleteIcon  w={6} h={6} color="red.400"></DeleteIcon>
                        </Button>
                        <Modal isOpen={isOpenArchivo} onClose={onCloseArchivo}>
                            <ModalOverlay/>
                                <ModalContent>
                                    <ModalHeader>Eliminar?</ModalHeader>
                                    <ModalCloseButton/>
                                    <ModalBody>¿Esta seguro de eliminar esta archivo?</ModalBody>
                                    <ModalFooter justifyContent={"space-between"}>
                                        <Button colorScheme={"red"} onClick={() =>{onCloseArchivo(); eliminarArchivos(archivos._id, asambleas.asambleaId._id);}}>Eliminar</Button>
                                        <Button colorScheme={"teal"} onClick={onCloseArchivo}>Cancelar</Button>
                                    </ModalFooter>
                                </ModalContent>
                        </Modal>
                        </Td>
                    </Tr>
                )
            }else{
                return(
                    <Tr key={archivos._id}>
                        <Td ><Link color='blue.500' href={`${process.env.API_URL}/file/download/${archivos._id}`}>{archivos.name}</Link></Td>
                        <Td >{time}</Td>
                    </Tr>
                )
            }
        })
    }

    const uploadFileButton = ()=>{
        if(data.rol==='admin'){
            return(
                <Button my={'5'} colorScheme={"teal"} float={"right"} onClick={()=>subirArchivos(asambleas.asambleaId._id)} >
                    Subir Archivo
                    <Icon mx={'1.5'} w={5} h={5} as={BiUpload}/>
                </Button>
            )
        }
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

    const botonEditar = () =>{
        if(data.rol === "admin"){
            return(
                    <Button  leftIcon={<EditIcon />} w={"full"} colorScheme={"green"} onClick={() => router.push(`/asamblea/editar/${asambleas.asambleaId._id}`)}>Editar</Button>
            )
        }
    }

    const botonEliminar = () =>{
        if(data.rol === "admin"){
            return(
                    <Button leftIcon={<DeleteIcon />} w={"full"} colorScheme={"red"} onClick={onOpenAsamblea}>Eliminar Asamblea</Button>
            )
        }
    }

//----------------------------------------------------------------------------------------------------------------------------------------------------------------

    return (
        <Box>
            <Arriba token={data.existe}/>
            <Container maxW="container.xl" >
                <Heading my={15} textAlign={"center"}> {asambleas.asambleaId.name}</Heading>
                <Button leftIcon={<ArrowBackIcon />}  float={"left"} colorScheme={"teal"} onClick={() => router.push("/asamblea/ver")}>Volver</Button>
                    <HStack w={"full"} py={10}>
                        {botonEditar()}
                        <Button leftIcon={<ViewIcon />} w={"full"} colorScheme={"teal"} onClick={() => router.push(`/asistencia/ver/${asambleas.asambleaId._id}`)}>Ver Asistencias Asamblea</Button>
                        {/* <Button leftIcon={<DeleteIcon />} w={"full"} colorScheme={"red"} onClick={onOpenAsamblea}>Eliminar Asamblea</Button> */}
                        {botonEliminar()}
                        <Modal isOpen={isOpenAsamblea} onClose={onCloseAsamblea}>
                            <ModalOverlay/>
                                <ModalContent>
                                    <ModalHeader>Eliminar?</ModalHeader>
                                    <ModalCloseButton/>
                                    <ModalBody>¿Esta seguro de eliminar esta asamblea?</ModalBody>
                                    <ModalFooter justifyContent={"space-between"}>
                                        <Button colorScheme={"red"} onClick={() => {onCloseAsamblea(); desvincularArchivos();} }>Eliminar</Button>
                                        <Button colorScheme={"teal"} onClick={onCloseAsamblea}>Cancelar</Button>
                                    </ModalFooter>
                                </ModalContent>
                        </Modal>

                    </HStack>
                {/* <RadioGroup >
                    <HStack spacing='24px' >
                    <Radio value='user' onChange={onChange} name={"rolUsuario"}>user</Radio>
                    <Radio value='admin' onChange={onChange} name={"rolUsuario"}>admin</Radio>
                    </HStack>
                </RadioGroup> */}
                <Divider/>
                <Stack w={"full"} py={10}>
                    <ShowInfo tag="Nombre" data={asambleas.asambleaId.name} />
                    <ShowInfo tag="Tipo" data={asambleas.asambleaId.tipo} />
                    <Accordion allowMultiple w={"full"}>
                        <AccordionItem my={'5'}>
                            <h2>
                                <AccordionButton bg='gray.200'  _expanded={{  bg: 'teal.400', color: 'white' }}>
                                    <Box as="span" flex='1' textAlign='center'>
                                    Archivos Adjuntos
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={'4'}>
                                <Table  variant='striped' colorScheme='blackAlpha'>
                                    <Thead>
                                        <Tr>
                                            <Td>Archivos</Td>
                                            <Td>Fecha</Td>
                                            {showEliminar()}
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {showAsambleaArchivos()}
                                    </Tbody>
                                </Table>
                                {uploadFileButton()}
                            </AccordionPanel>
                        </AccordionItem>
                        {/* Acordeon 2  */}
                        <AccordionItem my={"5"}>
                            <h2>
                                {/* Colores boton */}
                                <AccordionButton bg='gray.200' _expanded={{  bg: 'orange.400', color: 'white' }}>
                                    <Box as="span" flex='1'>
                                        Comentarios
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={'5'}>
                                    <Container maxW='1250px'>
                                        <Table variant="simple">
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
                                    <Accordion allowMultiple w={"full"}>
                                            <AccordionItem my={'5'}>
                                            <h2>
                                                {/* Colores boton */}
                                                <AccordionButton bg='gray.200' _expanded={{  bg: 'orange.200', color: 'white' }}>
                                                    <Box as="span" flex='1' textAlign='center'>
                                                        Publicar comentario
                                                    </Box>
                                                    <AccordionIcon />
                                                </AccordionButton>
                                            </h2>
                                                <AccordionPanel pb={'5'}>
                                                    <Container>
                                                        <FormControl>
                                                            <Textarea placeholder="Ingresa un comentario" type={"text"} onChange={onChange} name="apartado"/>
                                                        </FormControl>
                                                        <FormControl my={2}>
                                                            <FormLabel>ID usuario</FormLabel>
                                                            <Input isReadOnly defaultValue={`${data.usuarioId}`} placeholder="Ingresa tu ID de usuario" type={"text"} onChange={onChange} name="user"/>
                                                        </FormControl>
                                                        <Center>
                                                            <Button colorScheme="messenger" size="md" type="submit" my={5} onClick={onSubmit}>Enviar</Button>
                                                        </Center>
                                                    </Container>
                                                </AccordionPanel>
                                            </AccordionItem>
                                    </Accordion>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </Stack>
            </Container>
        </Box>
    )
}

export default asamblea