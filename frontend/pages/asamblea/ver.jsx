import { useState, useEffect } from 'react'
import { Container, Table, Thead, Tbody, Tr, Td, Heading, Button,Box } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Arriba from '../../components/Arriba'
import Swal from 'sweetalert2'
import {checkToken} from '../../data/usuario'
import {ArrowBackIcon, AddIcon} from '../../node_modules/@chakra-ui/icons'
const jwt = require('jwt-simple')

export const getServerSideProps = async (context) => {
    try {
        const response = await checkToken(context.req.headers.cookie)
        const decode = jwt.decode(context.req.cookies.token,process.env.SECRET_KEY)
        if (response.status === 200){
            return{
                props:{
                    existe: response.config.headers.cookie,
                    rol: decode.rol
                }
            }
        }
    } catch (error) {
        console.log(error)
        return{
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }
}

const asamblea = (data) => {
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

    useEffect(()=>{
        getAsambleas()
    }, [])

    const showAsambleas = () =>{
        return asambleas.map(asamblea =>{
            const [fecha, horas] = asamblea.fecha.split('T')
            const [ano,mes,dia] =fecha.split('-')
            const [hora, min] =horas.split(':')
            const time = dia + '-' + mes + '-'  + ano + ' ' + hora +':' + min
            return(
                <Tr key={asamblea._id}>
                    <Td>{asamblea.name}</Td>
                    <Td>{asamblea.tipo}</Td>
                    <Td>{time}</Td>
                    <Td>
                        <Button onClick={()=>router.push(`/asamblea/ver/${asamblea._id}`)}>Ver mas</Button>
                    </Td>
                </Tr>
            )
        })
    }

    const botonCrear= () =>{
        let boton
        if(data.rol === "admin"){
            boton = <Button leftIcon={<AddIcon />}  colorScheme={"teal"} float={"right"} onClick={()=>router.push('/asamblea/crear')} >Crear Asamblea</Button>
        }else{
            boton = <div></div>
        }
        return boton
    }


    return (
        <Box>
            <Arriba token={data.existe}/>
            <Container maxW="container.xl">
                <Heading textAlign={"center"} my={15}>Asambleas</Heading>
                {botonCrear()}
                {/* <Button leftIcon={<AddIcon />}  colorScheme={"teal"} float={"right"} onClick={()=>router.push('/asamblea/crear')} >Crear Asamblea</Button> */}
                <Button leftIcon={<ArrowBackIcon />}  colorScheme={"teal"} float={"left"} onClick={()=>router.push('/')} >Volver</Button>
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
        </Box>
    )
    }

export default asamblea
