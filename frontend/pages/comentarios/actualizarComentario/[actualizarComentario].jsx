import React, {useState} from "react"
import { Textarea, RadioGroup, Radio, Button, Container, Input, Stack, Text, HStack, Heading, FormControl, FormLabel} from '@chakra-ui/react'
import axios from "axios"
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

export async function getServerSideProps(context) {
    try {
        const response = await axios.get(`${process.env.API_URL}/comentario/search/${context.params.actualizarComentario}`)
        return {
            props: {
                comentarioID: response.data
            }
        }
    } catch (error) {
        return {
            props: {
                data: "null"
            }
        }
    }
}

const actualizarComentario = (props) => {
    const router = useRouter()
    const {comentarioID} = props
    const [values, setValues] = useState({
            apartado: `${comentarioID.apartado}`,
            user: `${comentarioID.user._id}`,
            asamblea: `${comentarioID.asamblea._id}`
    })

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`${process.env.API_URL}/comentario/update/${comentarioID._id}`,values)
            Swal.fire({
                title: 'Comentario modificado',
                text: 'Comentario modificado correctamente',
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then((result) => {
                if (result.isConfirmed) {
                    router.push('/comentarios')
                }
            })
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Error al modificar comentario',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
            
        }
    }

    const onChange = async (e) =>{
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    return (
        <Container maxW="container.md">
            <Heading textAlign={"center"} my={10}>Modificar Comentario</Heading>
            <Stack>
                <FormControl>
                    <FormLabel>Comentario Anterior:</FormLabel>
                    <Text> {comentarioID.apartado} </Text>
                    <FormLabel my={5}>Modifica aquí:</FormLabel>
                    <Textarea placeholder="Escribe aquí" type={"text"} onChange={onChange} name={"apartado"}/>
                </FormControl>
            </Stack>
            <RadioGroup my={5}>
                <HStack spacing='24px'>
                    <Radio value='user' onChange={onChange} name={"rolUsuario"}>user</Radio>
                    <Radio value='admin' onChange={onChange} name={"rolUsuario"}>admin</Radio>
                </HStack>
            </RadioGroup>
                <FormControl>
                    <FormLabel my={4} htmlFor="name">Usuario</FormLabel>
                    <Input id="user" name="user" placeholder="Ingrese tú id usuario" onChange={onChange} />
                </FormControl>
                <Button colorScheme="facebook" size="md" type="submit" my={5} onClick={onSubmit}>Enviar</Button>
                <Button my={5} mx={5} onClick={() => router.push(`/comentarios`)}>Volver</Button>
        </Container>
    )
}

export default actualizarComentario