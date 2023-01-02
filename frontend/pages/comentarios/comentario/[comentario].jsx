import React, { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

import { FormLabel, Tr, Table, Button, Container, HStack, Input, FormControl, RadioGroup, Radio, Text, Heading, SimpleGrid, Td, Thead, Center, Box} from '@chakra-ui/react'

import Swal from 'sweetalert2'
import {checkToken} from '../../../data/usuario'
const jwt = require('jwt-simple')
import Arriba from '../../../components/Arriba'

export async function getServerSideProps(context){
    try {
        const res = await checkToken(context.req.headers.cookie)
        const decode = jwt.decode(context.req.cookies.token,process.env.SECRET_KEY)
        if(decode.rol==='admin'){
        if (res.status === 200){
                const response = await axios.get(`${process.env.API_URL}/comentario/search/${context.params.comentario}`)
                return{
                    props:{
                        comentarioID: response.data,
                        existe: res.config.headers.cookie,
                        usuarioId: decode.sub,
                        rol: decode.rol
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
        }else{
            console.log("No eres admin")
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
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }
}

const comentario = (props) => {
    const router = useRouter()
    const {comentarioID} = props
    const [values, setValues] = useState({
        rolUsuario:`${props.rol}`,
        user: `${props.usuarioId}`
    })

    const onChange = async (e) =>{
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const borrarComentario = async () => {
        try {
            await axios.delete(`${process.env.API_URL}/comentario/delete/${comentarioID._id}`,{data: values})
            Swal.fire({
                title: 'Comentario eliminado',
                text: 'Comentario eliminado correctamente',
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then((result) => {
                if (result.isConfirmed) {
                    router.push('/asamblea/ver')
                }
            })
            } catch (error) {
                if(error.response.status === 401){
                    Swal.fire({
                        title: 'Error',
                        text: 'No está autorizado para eliminar el comentario',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    })
                }else if(error.response.status === 404){
                    Swal.fire({
                        title: 'Error',
                        text: 'No se encontró el comentario',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    })
                }else if(error.response.status === 400){
                    Swal.fire({
                        title: 'Error',
                        text: 'No se pudo eliminar',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    })
                }
            }
        }
        const [fecha, horas] = comentarioID.fecha.split('T')
        const [ano,mes,dia] =fecha.split('-')
        const [hora, min] =horas.split(':')
        const time = dia + '-' + mes + '-'  + ano + ' ' + hora +':' + min
    return (
        <Box>
            <Arriba token={props.existe}/>
            <Container maxW="1500px">
                <Heading textAlign={"center"} my={10} >Detalles del comentario</Heading>
                <Button my={5} float='left' colorScheme="teal" size="md" type="submit" onClick={() => router.push(`/asamblea/ver/${comentarioID.asamblea._id}`)}>Volver</Button>
                <Table>
                    <Thead>
                        <Tr>
                            <Td>Comentario</Td>
                            <Td>Fecha</Td>
                            <Td>Usuario</Td>
                            <Td>Correo</Td>
                            <Td>Asamblea</Td>
                            <Td>Tipo</Td>
                        </Tr>
                    </Thead>
                    <Thead>
                        <Tr>
                            <Td maxW="400px">{comentarioID.apartado}</Td>
                            <Td maxW="400px">{time}</Td>
                            <Td>{comentarioID.user && comentarioID.user.name}</Td>
                            <Td>{comentarioID.user && comentarioID.user.email}</Td>
                            <Td>{comentarioID.asamblea && comentarioID.asamblea.name}</Td>
                            <Td>{comentarioID.asamblea && comentarioID.asamblea.tipo}</Td>
                        </Tr>
                    </Thead>
                </Table>
                <Center>
                    <Button colorScheme="red" mx={6} size="md" type="submit" my={5} onClick={borrarComentario}>Eliminar</Button>
                    <Button colorScheme= "green" size="md" type="submit" my={5} onClick={() => router.push(`/comentarios/actualizarComentario/${comentarioID._id}`)}>Editar</Button>
                </Center>
                {/* <Center>
                    <RadioGroup my={5}>
                        <HStack spacing='24px'>
                            <Radio value='user' onChange={onChange} name={"rolUsuario"}>user</Radio>
                            <Radio value='admin' onChange={onChange} name={"rolUsuario"}>admin</Radio>
                        </HStack>
                    </RadioGroup>
                </Center> */}
                <Center>
                    {values.rolUsuario === 'user' && (
                        <FormControl my={2} onChange={onChange} isRequired="true">
                            <Center> <FormLabel>Ingresa tú ID</FormLabel> </Center>
                            <Center> <Input defaultValue={`${props.usuarioId}`} isReadOnly maxW="300px" id="user" name="user" placeholder="Ingresa tú id" onChange={onChange} /> </Center>
                        </FormControl>
                    )}
                </Center>
            </Container>
            </Box>
    )
}

export default comentario