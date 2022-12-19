import { useState } from 'react'
import { Button,Container, Input, Stack,HStack,Heading,FormControl,FormLabel,Radio,RadioGroup,Link } from '@chakra-ui/react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'



const asamblea = () => {

    const router = useRouter()

    const[values, setValues] = useState({
        name: '',
        tipo: '',
        fecha: '',
        rolUsuario: ''
    })

    const onSubmit = async (e) =>{
        //e.preventDefault()
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

    const onChange = async (e) =>{
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    return(
        <Container>
            <Heading textAlign={"center"} my={10}>Crear Asamblea</Heading>
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
    )
}

export default asamblea