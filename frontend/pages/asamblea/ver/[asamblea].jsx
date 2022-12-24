import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Container, Heading, Tbody,Stack,HStack,Button,RadioGroup,Radio } from '@chakra-ui/react'
import ShowInfo from '../../../components/ShowInfo'
import Swal from 'sweetalert2'

export async function getServerSideProps(context){
    //console.log(context.params.asamblea)
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
    const router = useRouter()
    const [asambleas] = useState(data)
    const[values, setValues] = useState({
    })

    const onChange = async (e) =>{
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }


    const eliminarAsamblea = async () =>{
        console.log(values)
        try {
            const response = await axios.delete(`${process.env.API_URL}/asamblea/delete/${asambleas.asambleaId._id}`,{data: values })//revisar
            if (response.status === 200){
                Swal.fire({
                    title: 'Asamblea eliminada',
                    text: 'La asamblea se ha eliminado con exito',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
            }
            }catch (error) {
            Swal.fire({
                title: 'Error',
                text: `La asamblea no se ha podido eliminar ${error}`,
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    }

    return (
        <Container maxW="container.xl" centerContent>
            <Heading my={10}> {asambleas.asambleaId.name}</Heading>
            <HStack w={"full"} py={10}>
                <Button w={"full"} colorScheme={"teal"} onClick={() => router.push(`/asamblea/editar/${asambleas.asambleaId._id}`)}>Editar</Button>
                <Button w={"full"} colorScheme={"teal"} onClick={() => eliminarAsamblea()}>Eliminar</Button>
                <Button w={"full"} colorScheme={"teal"} onClick={() => router.push("/asamblea/ver")}>Volver</Button>
            </HStack>
            <Stack w={"full"}>
                <ShowInfo tag="Nombre" data={asambleas.asambleaId.name} />
                <ShowInfo tag="Tipo" data={asambleas.asambleaId.tipo} />
                <ShowInfo tag="Archivos " data={asambleas.asambleaId.archivos}/>
            </Stack>
            <RadioGroup >
                <HStack spacing='24px'>
                <Radio value='user' onChange={onChange} name={"rolUsuario"}>user</Radio>
                <Radio value='admin' onChange={onChange} name={"rolUsuario"}>admin</Radio>
                </HStack>
            </RadioGroup>
        </Container>
    )
}

export default asamblea