import {useState,useEffect} from 'react'
import { Button,Container, Input, Stack,Text,HStack,Heading,FormControl,FormLabel,Radio,RadioGroup } from '@chakra-ui/react'
import axios from 'axios'



const asamblea = () => {

    const[values, setValues] = useState({
        name: '',
        tipo: '',
        fecha: '',
        rolUsuario: ''
    })

    const onSubmit = async (e) =>{
        e.preventDefault()
        console.log(values)
        const response = await axios.post(`${process.env.API_URL}/asamblea`,values)
        console.log(response)
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
            <Button colorScheme={"teal"} type="submit" my={5} onClick={onSubmit}>Crear Asamblea</Button>
        </Container>
    )
}

export default asamblea