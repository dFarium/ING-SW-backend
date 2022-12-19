import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Container, Heading, Tbody,Stack,HStack,Button,FormControl,FormLabel,Input,RadioGroup,Radio } from '@chakra-ui/react'
import Swal from 'sweetalert2'



export async function getServerSideProps(context){
    console.log(context.params.asamblea)
    try {
        const response = await axios.get(`${process.env.API_URL}/asamblea/search/${context.params.asamblea}`)
        return{
            props:{
                asambleaId: response.data
            }
        }
    } catch (error) {
        console.log("ERROR",error)
        return{
            redirect:{
                destination: '/asamblea/ver',
                permanent: true
            }
        }
    }
}

const asamblea = (data) => {

    const onChange = async (e) =>{
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const[values, setValues] = useState({
        name: '',
        tipo: '',
        fecha: '',
        rolUsuario: ''
    })

    const onSubmit = async (e) =>{
        //e.preventDefault()
        try {
            const response = await axios.put(`${process.env.API_URL}/asamblea/update/${asambleas.asambleaId._id}`,values)
            console.log(response)
            if (response.status === 200){
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

    const router = useRouter()
    const [asambleas] = useState(data)
    let date = asambleas.asambleaId.fecha.substring(0,16)
    console.log(asambleas.asambleaId._id)
    return (
        <Container>
            <Heading textAlign={"center"} my={10}>Editar Asamblea</Heading>
            <Stack>
                <FormControl isRequired="true">
                    <FormLabel>Nombre asamblea</FormLabel>
                    <Input defaultValue={`${asambleas.asambleaId.name}`} placeholder="Asamblea" type={"text"} maxLength={100} onChange={onChange} name={"name"}/>
                </FormControl>
                <FormControl isRequired="true">
                    <FormLabel >Tipo asamblea</FormLabel>
                        <RadioGroup defaultValue={asambleas.asambleaId.tipo}>
                            <HStack spacing='24px'>
                                <Radio value='Ordinaria' onChange={onChange} name={"tipo"}>Ordinaria</Radio>
                                <Radio value='Extraordinaria' onChange={onChange} name={"tipo"}>Extraordinaria</Radio>
                            </HStack>
                        </RadioGroup>
                </FormControl>
                <FormControl isRequired="true">
                    <FormLabel>Fecha</FormLabel>
                    <Input defaultValue={`${date}`} Value={`${date}`} placeholder="Select Date and Time" size="xl" type="datetime-local" onChange={onChange} name={"fecha"}/>
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
                <Button colorScheme={"teal"} type="submit" my={5} onClick={onSubmit}>Finalizar edicion</Button>
                <Button colorScheme={"teal"} onClick={()=>router.push(`/asamblea/${asambleas.asambleaId._id}`)}>Volver</Button>
            </HStack>
        </Container>
    )
}

export default asamblea