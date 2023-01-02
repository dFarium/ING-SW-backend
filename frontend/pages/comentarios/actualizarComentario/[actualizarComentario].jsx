import React, {useState} from "react"
import { Textarea, RadioGroup, Radio, Button, Container, Input, Stack, Text, HStack, Heading, FormControl, FormLabel, Center, Box} from '@chakra-ui/react'

import axios from "axios"
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import Arriba from "../../../components/Arriba"
import {checkToken} from '../../../data/usuario'
const jwt = require("jwt-simple")
import { ArrowBackIcon, ChatIcon } from '../../../node_modules/@chakra-ui/icons'

export async function getServerSideProps(context){
    try {
        const res = await checkToken(context.req.headers.cookie)
        const decode = jwt.decode(context.req.cookies.token,process.env.SECRET_KEY)
        if (res.status === 200){
            const response = await axios.get(`${process.env.API_URL}/comentario/search/${context.params.actualizarComentario}`)
                return{
                    props:{
                        comentarioID: response.data,
                        existe: res.config.headers.cookie,
                        rol: decode.rol,
                        usuarioId: decode.sub,
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
            props: {
                data: "null"
            }
        }
    }
}

const actualizarComentario = (props) => {
    const router = useRouter()
    const [comentario] = useState(props)
    const [values, setValues] = useState({
            // apartado: `${comentario.comentarioID.apartado}`,
            // user: `${comentario.comentarioID.user}`,
            // asamblea: `${comentario.comentarioID.asamblea}`,
            rolUsuario: `${props.rol}`
    })
    // console.log("User --> "+ comentario.comentarioID.apartado)
    const onSubmit = async (e) => {
        e.preventDefault()
        if (!values.apartado) {
            Swal.fire({
                title: 'Error',
                text: 'Escribe un comentario',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
            return
        }
        try {
            await axios.put(`${process.env.API_URL}/comentario/update/${comentario.comentarioID._id}`,values)
            Swal.fire({
                title: 'Comentario modificado',
                text: 'Comentario modificado correctamente',
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then((result) => {
                if (result.isConfirmed) {
                    router.push(`/asamblea/ver/${comentario.comentarioID.asamblea._id}`)
                }
            })
        } catch (error) {
            if(error.status === 401){
                Swal.fire({
                    title: 'Error',
                    text: 'No está autorizado para modificar el comentario',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            }else if(error.status === 404){
                Swal.fire({
                    title: 'Error',
                    text: 'No se encontró el comentario',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            }else if(error.status === 400){
                Swal.fire({
                    title: 'Error',
                    text: 'No se pudo modificar error:'  + error.response.status,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            }
        }
    }

    const onChange = async (e) =>{
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    return (
        <Box>
            <Arriba token={props.existe}/>
        <Container maxW="container.md">
            <Heading textAlign={"center"} my={10}>Modificación de comentario</Heading>
            <Stack>
                <FormControl>
                    <FormLabel>Comentario Anterior:</FormLabel>
                    <Text> {comentario.comentarioID.apartado} </Text>
                    <FormLabel my={5}>Modifica aquí:</FormLabel>
                    <Textarea placeholder="Escribe aquí" type={"text"} onChange={onChange} name={"apartado"}/>
                </FormControl>
            </Stack>
            {/* <RadioGroup my={5}>
                <HStack spacing='24px'>
                <Center> <Radio value='user' onChange={onChange} name={"rolUsuario"}>user</Radio> </Center>
                    <Radio value='admin' onChange={onChange} name={"rolUsuario"}>admin</Radio>
                </HStack>
            </RadioGroup>
            */}
                {values.rolUsuario === 'user' && (
                        <FormControl my={2} onChange={onChange} isRequired="true">
                            <FormLabel my={4} htmlFor="name">Usuario</FormLabel>
                            <Input id="user" name="user" placeholder="Ingrese tú id usuario" onChange={onChange} />
                        </FormControl>
                )}

                <Button  float={"right"} leftIcon={<ChatIcon/>} colorScheme="green" size="md" type="submit" my={5} onClick={onSubmit}>Enviar</Button>
                {console.log(`/comentarios/comentario/${comentario.comentarioID._id}`)}
                <Button  float={"left"} leftIcon={<ArrowBackIcon />}  colorScheme={"teal"} my={5} onClick={() => router.push(`/comentarios/comentario/${comentario.comentarioID._id}`)}>Volver</Button>
        </Container>
        </Box>
    )
}

export default actualizarComentario