import {useState} from "react";
import React from "react";  
import { Textarea, Button, Container, Input, Stack, Text, HStack, Heading, FormControl, FormLabel} from '@chakra-ui/react'
import axios from "axios";
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

const comentarios = () => {

    const [values, setValues] = useState({
        apartado: '',
        user: '',
        asamblea: ''
    })

    const router = useRouter()

    const onSubmit = async (e) => {
        e.preventDefault()
        console.log(values)
        try {
            const response = await axios.post(`${process.env.API_URL}/comentario`, values)
            console.log("hola"+response.data.apartado)
            if (response.status === 201){
                Swal.fire({
                    title: 'Comentario creado',
                    text: 'Comentario creado correctamente',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                }).then((result) => {
                    if (result.isConfirmed) {
                        router.push('/')
                    }
                })
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Ha ocurrido un error',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            }
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
        console.log(e.target.name, e.target.value)
    }

    return (
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
    )
}

export default comentarios