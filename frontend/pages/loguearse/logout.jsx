import Cookies from 'js-cookie'
import axios from "axios"
import { Container,Button } from '@chakra-ui/react'
import { useState } from 'react'
import { useRouter } from "next/router"
import {checkToken} from '../../data/usuario'


export const getServerSideProps = async (context) => {
    try {
        const response = await checkToken(context.req.headers.cookie)
        if (response.status === 200){
            return{
                props:{data: response.data}
            }
        }
    } catch (error) {
        return{
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }
}
const cerrar = () => {
const router = useRouter()
    const cerrarSesion = async () => {
        await axios.get(`${process.env.API_URL}/user/logout`)
        Cookies.remove("token")
        router.push("/")
    }
    return (
        <Container>
            <Button colorScheme={"red"} onClick={cerrarSesion}>Cerrar sesion</Button>
        </Container>
    )
}
export default cerrar