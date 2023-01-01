import { useState, useEffect } from 'react'
import { Button, Container, HStack, Table, Thead, Tbody, Tfoot, Tr, Th, Td, Heading,Box, AccordionIcon, Link, chakra } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Arriba from '../../components/Arriba'
import Swal from 'sweetalert2'
import {checkToken} from '../../data/usuario'
const jwt = require('jwt-simple')
import { DownloadIcon, DeleteIcon} from '../../node_modules/@chakra-ui/icons'


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
        //Si el usuario es admin podra eliminar archivos
        if(data.rol==='admin'){
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
                    <Td>
                        <Link color='blue.400' href={`/asamblea/ver/${archivos.asamblea._id}`}>{archivos.asamblea.name}</Link>
                    </Td>
                    <Td>{archivos.fecha}</Td>
                    <Td>
                        <Button mx={'2.5'} bg={'white'} onClick={()=>router.push(`${process.env.API_URL}/file/download/${archivos._id}`)}>
                            <DownloadIcon  w={6} h={6} color="green.500" ></DownloadIcon>
                        </Button>
                    </Td>
                    <Td>
                        <Button mx={'2.5'}  bg={'white'} onClick={()=>eliminarArchivos(archivos._id, archivos.asamblea._id)}>
                            <DeleteIcon  w={6} h={6} color="red.400"></DeleteIcon>
                        </Button>
                    </Td>
                </Tr>
            )
        })
    }

    return (
        <Box>
            <Arriba token={data.existe}/>
            <Container maxW="container.xl">
            <Heading textAlign={"center"} my={16}>Historial de Actas</Heading>
            <Button colorScheme={"teal"} my={15} mx={15} float={'left'} onClick={()=>router.push('/')} >Volver</Button>
            <Table my={15} variant="simple">
                <Thead>
                    <Tr>
                        <Td>Archivo</Td>
                        <Td>Asamblea</Td>
                        <Td>Fecha</Td>
                        <Td>Descargar</Td>
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