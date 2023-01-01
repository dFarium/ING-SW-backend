import { useState } from 'react'
import { Button,Container, Input, Stack,HStack,Heading,FormControl,FormLabel,Radio,RadioGroup,Box } from '@chakra-ui/react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import Arriba from '../../components/Arriba'
const jwt = require("jwt-simple")
import {checkToken} from '../../data/usuario'

export const getServerSideProps = async (context) => {
    try {
        const response = await checkToken(context.req.headers.cookie)
        const decode = jwt.decode(context.req.cookies.token,process.env.SECRET_KEY)
        if (decode.rol === 'admin'){
            if (response.status === 200){
                return{
                    props: {
                        existe: response.config.headers.cookie
                    }
                }
            }else{
                return{
                    redirect: {
                        destination: "/",
                        permanent: false
                    }
                }
            }
        }else{
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

const asamblea = (data) => {

    const router = useRouter()
    const[values, setValues] = useState({
        name: '',
        tipo: '',
        fecha: '',
        rolUsuario: ''
    })

    const onChange = async (e) =>{
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }
    
    const onSubmit = async (e) =>{
        try {
            const response = await axios.post(`${process.env.API_URL}/asamblea`,values)
            console.log(response)
            if (response.status === 201){
                Swal.fire({
                    title: 'Asamblea creada',
                    text: 'La asamblea se ha creado con exito',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                }).then((result)=>{
                    if (result.isConfirmed){
                        router.push("/asamblea/ver")
                    }
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



    return(
        <Box>
            <Arriba token={data.existe}/>
            <Container>
                <Heading textAlign={"center"} my={15}>Crear Asamblea</Heading>
                <Stack>
                    <FormControl isRequired="true">
                        <FormLabel>Nombre asamblea</FormLabel>
                        <Input placeholder="Asamblea X" type={"text"} maxLength={100} onChange={onChange} name={"name"}/>
                    </FormControl>
                    <FormControl isRequired="true">
                        <FormLabel >Tipo asamblea</FormLabel>
                            <RadioGroup >
                                <HStack spacing='24px'>
                                    <Radio value='Ordinaria' onChange={onChange} name={"tipo"}>Ordinaria</Radio>
                                    <Radio value='Extraordinaria' onChange={onChange} name={"tipo"}>Extraordinaria</Radio>
                                </HStack>
                            </RadioGroup>
                    </FormControl>
                    <FormControl isRequired="true">
                        <FormLabel>Fecha</FormLabel>
                        <Input placeholder="Select Date and Time" size="xl" type="datetime-local" onChange={onChange} name={"fecha"}/>
                    </FormControl>
                    <FormControl isRequired="true">
                        <FormLabel >rolUsuario</FormLabel>
                            <RadioGroup >
                                <HStack spacing='24px'>
                                    <Radio value='user' onChange={onChange} name={"rolUsuario"}>user</Radio>
                                    <Radio value='admin' onChange={onChange} name={"rolUsuario"}>admin</Radio>
                                </HStack>
                            </RadioGroup>
                    </FormControl>
                </Stack>
                <HStack justifyContent={"space-between"}>
                    <Button colorScheme={"teal"} type="submit" my={5} onClick={onSubmit}>Crear Asamblea</Button>
                    <Button colorScheme={"teal"} onClick={()=>router.push('/asamblea/ver')}>Volver</Button>
                </HStack>
            </Container>
        </Box>
    )
}

export default asamblea