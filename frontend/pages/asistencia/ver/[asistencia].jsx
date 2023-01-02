import { useEffect, useState } from 'react'
import { useRouter} from 'next/router'
import {
    Button,
    useDisclosure,
    Tr,
    Td,
    Thead,
    Tbody,
    Table,
    Checkbox,
    Radio,
    RadioGroup,
    HStack,
    Heading,
    Box,
    Container,
    Input,
    FormControl,
    Switch
} from '@chakra-ui/react'
import axios from 'axios'
import Arriba from '../../../components/Arriba'
import {checkToken} from '../../../data/usuario'
const jwt = require("jwt-simple")
import Swal from 'sweetalert2'

export async function getServerSideProps(context){
    try {
        const res = await checkToken(context.req.headers.cookie)
        const decode = jwt.decode(context.req.cookies.token,process.env.SECRET_KEY)
            if (res.status === 200){
                const response = await axios.get(`${process.env.API_URL}/asistenciaAsamblea/search/${context.params.asistencia}`)
                return{
                    props:{
                        asambleaId: response.data,
                        existe: res.config.headers.cookie,
                        rol:decode.rol
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
            redirect:{
                destination: `/asamblea/ver/${context.params.asistencia}`,
                permanent: true
            }
        }
    }
}


const asistencia = (data) => {
    const router = useRouter()
    const [asistencia] = useState(data)

    const showAsistencia = () =>{
        return asistencia.asambleaId.map(asistencia =>{
            return(
                <Tr key={asistencia._id}>
                    <Td>{asistencia.user.name}</Td>
                    <Td>
                        <FormControl>
                            {modificarAsisteCheckbox(asistencia)}
                        </FormControl>
                    </Td>
                </Tr>
            )
        })
    }


    function modificarAsisteCheckbox (asistencia){
            let checkbox;
            if(asistencia.asistencia === "Presente"){
                checkbox = <Switch colorScheme="teal" isReadOnly defaultChecked ></Switch>;
            }else{
                checkbox = <Switch colorScheme="teal" isReadOnly></Switch>;
            }
            return checkbox;
    }

    return (
        <Box>
            <Arriba token={data.existe}/>
            <Container maxW="container.xl">
                <Heading textAlign={"center"} my={15}>Asistencia de {asistencia.asambleaId[0].asamblea.name}</Heading>
                <Button colorScheme={"teal"} float={"left"} onClick={() => router.push(`/asamblea/ver/${asistencia.asambleaId[0].asamblea._id}`)}>Volver</Button>
                <Button colorScheme={"teal"} float={"right"} onClick={() => router.push(`/asistencia/editar/${asistencia.asambleaId[0].asamblea._id}`)}>Modificar Asistencia</Button>
                <Table variant="simple" my={15}>
                    <Thead>
                        <Tr>
                            <Td>Nombre</Td>
                            <Td>Asistencia</Td>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {showAsistencia()}
                    </Tbody>
                </Table>
            </Container>
        </Box>

    )
}

export default asistencia