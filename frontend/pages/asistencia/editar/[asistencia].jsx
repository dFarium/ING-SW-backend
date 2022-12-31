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

export async function getServerSideProps(context){
    try {
        const response = await axios.get(`${process.env.API_URL}/asistenciaAsamblea/search/${context.params.asistencia}`)
        return{
            props:{
                asambleaId: response.data
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

    const[values, setValues] = useState({
        asistencia: '',
        rolUsuario: ''
    })

    const onChangeSwitch = async (e,id) =>{
        if(e.target.checked){
            setValues({
                ...values,
                [e.target.name]: "Presente"
            })
            console.log(values)
        }else{
            setValues({
                ...values,
                [e.target.name]: "Ausente"
            })
        }
        setValues({
            ...values,
            values
        })
        //updateAsistencia(id,values)
    }

    const onChangeRol = async (e) =>{
            setValues({
                ...values,
                [e.target.name]: e.target.value
            })
            console.log(values)
}

    const showAsistencia = () =>{
        return asistencia.asambleaId.map(asistencia =>{
            return(
                <Tr key={asistencia._id}>
                    <Td>{asistencia.user.name}</Td>
                    <Td>{asistencia._id}</Td>
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
            checkbox = <Switch  defaultChecked onChange={(event)=>onChangeSwitch(event,asistencia._id)} name="asistencia" value={asistencia._id} ></Switch>;
        }else{
            checkbox = <Switch onChange={(event)=>onChangeSwitch(event,asistencia._id)} name="asistencia" value={asistencia._id}></Switch>;
        }
        return checkbox;
    }


    const updateAsistencia = async (id,values) =>{

        
        console.log("id asistencia:",id)
        try {
            const response = await axios.put(`${process.env.API_URL}/asistencia/update/${id}`,values)
            if (response.status === 200){
                Swal.fire({
                    title: 'Asistencia Modificada',
                    text: 'La asamblea se ha creado con exito',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: `La asamblea no se ha podido crear ${error}`,
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    }

    return (
        <Box>
            <Arriba/>
            <Container maxW="container.xl">
                <Heading textAlign={"center"} my={15}>Editar asistencia de {asistencia.asambleaId[0].asamblea.name}</Heading>
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
                <HStack float={"right"}>
                    <RadioGroup >
                        <Radio onChange={onChangeRol} name="rolUsuario" value="user">user</Radio>
                        <Radio onChange={onChangeRol} name="rolUsuario" value="admin">admin</Radio>
                    </RadioGroup>
                <Button colorScheme={"teal"} float={"right"} onClick={() => router.push(`/asistencia/ver/${asistencia.asambleaId[0].asamblea._id}`)}>Finalizar Edicion</Button>
                </HStack>
                

            </Container>
        </Box>

    )
}

export default asistencia