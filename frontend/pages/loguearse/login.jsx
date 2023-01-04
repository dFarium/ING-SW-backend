import { useState } from "react";
import { Container, Heading, Box, Button, Input, Stack, FormControl, FormLabel, HStack} from '@chakra-ui/react'
import Swal from "sweetalert2"
import {login, checkToken } from "../../data/usuario"
import { useRouter } from "next/router"
import Cookie from "js-cookie"
import Arriba from '../../components/Arriba'
const jwt = require("jwt-simple")


export const getServerSideProps = async (context) => {
    try {
        const response = await checkToken(context.req.headers.cookie)
        if (response.status === 200){
            return{
                redirect: {
                    destination: "/",
                    permanent: false
                }
            }
        }
    } catch (error) {
        return{
            props: {}
        }
    }
}

const logearse = ({data}) => {
    let prueba
    const [usuario, setUsuario] = useState({correo: ""})
    const router = useRouter()

    const handleChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (e) => {
        //e.preventDefault()
        try {
            const response = await login(usuario.correo)
            if (response.status === 200){
                Cookie.set("token", response.data.token, {expires: 1})
                Swal.fire({
                    icon:'success',
                    title:'Se ha iniciado sesión',
                    text:'Ha iniciado sesión correctamente'
                }).then(() => {
                    router.push("/")
                }
            )}
        } catch (error) {
            return Swal.fire({
                icon: "error",
                title:"Error",
                text: 'A ocurrido un error con el token'
            })
        }
        prueba = Cookie.get("token")
        const decode = jwt.decode(prueba, process.env.SECRET_KEY)
        console.log(decode.rol)
    }

    return (
        <Box>
            <Container maxW="container.md">
                <Heading textAlign={"center"} my={15}>Iniciar Sesión</Heading>
                <Stack>
                    <FormControl>
                        <FormLabel>Correo</FormLabel>
                        <Input type="email" name="correo" onChange={handleChange}/>
                    </FormControl>
                </Stack>
                <HStack justifyContent={"space-between"} py={5}>
                <Button colorScheme={"teal"}  onClick={()=>router.push('/')} >Volver</Button>
                <Button colorScheme="teal" size="md" type="submit" my={5} onClick={onSubmit}>Login</Button>
                
                </HStack>
            </Container>
        </Box>
    )
}

export default logearse