import React, { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Button, Container, HStack, Input, Stack, Text, VStack,  Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Heading, useSafeLayoutEffect, useRadio, } from '@chakra-ui/react'
import { FormControl, FormLabel } from '@chakra-ui/react'

export async function getServerSideProps(context) {
    console.log("URL comentario---> "+context.params.comentario)
    try {
        const response = await axios.get(`${process.env.API_URL}/comentario/search/${context.params.comentario}`)
        console.log("ruta: "+`${process.env.API_URL}`+"/comentario/search/")
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

const comentario = (props) => {
    const {comentarioID} = props
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [values, setValues] = useState({
        rolUsuario: '',
    });

    console.log(values.user)

    const borrarComentario = async () => {
        try {
            const response = await axios.delete(`${process.env.API_URL}/comentario/delete/${comentarioID._id}`,{data: values})
            setSuccessMessage(response.data.message);
            window.location.reload();
            } catch (error) {
            setErrorMessage(error.response.data.message);
            }
        }
    return (
        
        <Container maxW="container.md">
        <Heading textAlign={"center"} my={10}>Comentario</Heading>
        <Stack>
            <Text>Comentario: {comentarioID.apartado} </Text>
            <Text>Fecha: {comentarioID.fecha} </Text>
            <Text>Usuario: {comentarioID.user && comentarioID.user.name} </Text>
            <Text>Asamblea: {comentarioID.asamblea && comentarioID.asamblea.name} </Text>
        </Stack>
        <Button colorScheme="red" mx={6} size="md" type="submit" my={5} onClick={borrarComentario}>Eliminar</Button>
        <Button colorScheme= "green" size="md" type="submit" my={5}>Modificar</Button>
        {errorMessage && <Text color="red">{errorMessage}</Text>}
        {successMessage && <Text color="green">{successMessage}</Text>}
    </Container>
    )
}

export default comentario
{/* <Text>User: {comentario1.comentarioID.user && (<>{comentario1.comentarioID.user.name}</>)} </Text>
            <Text>Asamblea: {comentario1.comentarioID.asamblea && (<>{comentario1.comentarioID.user.name}</>)} </Text>
            {comentario.user && (<><Td>{comentario.user.name}</Td></>)} */}