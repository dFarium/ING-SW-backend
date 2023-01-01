import {useState} from "react";
import React from "react";  
import { Textarea, Button, Container, Input, Stack, Text, HStack, Heading, FormControl, FormLabel, Box} from '@chakra-ui/react'
import axios from "axios";
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import Arriba from '../../components/Arriba'
const jwt = require("jwt-simple")

//Validacion mediante cookies
export const getServerSideProps = async (context) => {
    try {
        const response = await checkToken(context.req.headers.cookie)
            if (response.status === 200){
                return{
                    props: {
                        existe: response.config.headers.cookie
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
        console.log(error)
        return{
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }
}


const comentarios = (data) => {

    const [values, setValues] = useState({
        apartado: '',
        user: '',
        asamblea: ''
    })

    const router = useRouter()

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
                    router.push('/comentarios')
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

    const onChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
    })
        
    }

    return (
        <Box>
            <Arriba token={data.existe}/>
        <Container maxW="container.md">
            <Heading textAlign={"center"} my={10}>Crear Comentario</Heading>
            <Stack>
                <FormControl>
                    <FormLabel>Comentario </FormLabel>
                    <Textarea placeholder="Ingresa un comentario" type={"text"} onChange={onChange} name="apartado"/>
                </FormControl>
                <FormControl>
                    <Input placeholder="Ingresa tu nombre" type={"text"} onChange={onChange} name="user"/>
                </FormControl>
                <FormControl>
                    <Input placeholder="Ingresa la asamblea" type={"text"} onChange={onChange} name="asamblea"/>
                </FormControl>
            </Stack>
            <Button colorScheme="facebook" size="md" type="submit" my={5} onClick={onSubmit}>Enviar</Button>
        </Container>
        </Box>
    )
}

export default comentarios