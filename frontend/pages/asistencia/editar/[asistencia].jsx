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
import Swal from 'sweetalert2'
import {checkToken} from '../../../data/usuario'
const jwt = require("jwt-simple")

export async function getServerSideProps(context){
    try {
        const res = await checkToken(context.req.headers.cookie)
        const decode = jwt.decode(context.req.cookies.token,process.env.SECRET_KEY)
        if(decode.rol==='admin'){
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
    let rolUsuario = 0
    const[values, setValues] = useState({
        asistencia: '',
        rolUsuario: 'admin'
    })

    const onChangeSwitch = async (e,id) =>{
        let asist
        if(e.target.checked){
            asist = "Presente"
        }else{
            asist = "Ausente"
        }
        updateAsistencia(id,asist,rolUsuario)
    }

    const onChangeRol = async (e) =>{
        if(e.target.value === "admin"){
            rolUsuario = 1
        }else{
            rolUsuario = 0
        }
    }

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
            checkbox = <Switch colorScheme="teal" defaultChecked onChange={(event)=>onChangeSwitch(event,asistencia._id,rolUsuario)} name="asistencia"  ></Switch>;
        }else{
            checkbox = <Switch colorScheme="teal" onChange={(event)=>onChangeSwitch(event,asistencia._id,rolUsuario)} name="asistencia" value={asistencia._id}></Switch>;
        }
        return checkbox;
    }

    const updateAsistencia = async (id,values,rolUser) =>{
        
        try {
            const response = await axios.put(`${process.env.API_URL}/asistenciaURL/update/${id}/${values}/1`)
            // if (response.status != 200){
            //     Swal.fire({
            //         title: 'Error',
            //         text: `La asistencia no se ha podido modificar`,
            //         icon: 'error',
            //         confirmButtonText: 'Ok'
            //     }).then((result)=>{
            //         if (result.isConfirmed){
            //             router.reload()
            //         }
            //     })
            // }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: `La asistencia no se ha podido modificar`,
                icon: 'error',
                confirmButtonText: 'Ok'
            }).then((result)=>{
                if (result.isConfirmed){
                    router.reload()
                }
            })
        }
    }

    return (
        <Box>
            <Arriba token={data.existe} />
            <Container maxW="container.xl">

                <Heading textAlign={"center"} my={15}>Editar asistencia de {asistencia.asambleaId[0].asamblea.name}</Heading>
                <HStack float={"right"}>
                    {/* <RadioGroup >
                        <Radio onChange={onChangeRol} name="rolUsuario" value="user">user</Radio>
                        <Radio onChange={onChangeRol} name="rolUsuario" value="admin">admin</Radio>
                    </RadioGroup> */}
                <Button colorScheme={"teal"} float={"right"} onClick={() => router.push(`/asistencia/ver/${asistencia.asambleaId[0].asamblea._id}`)}>Finalizar Edicion</Button>
                </HStack>
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