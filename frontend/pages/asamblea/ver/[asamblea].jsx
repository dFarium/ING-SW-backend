import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Container, Heading, Tbody,Stack,HStack,Button,RadioGroup,Radio, Box,Divider } from '@chakra-ui/react'
import ShowInfo from '../../../components/ShowInfo'
import Swal from 'sweetalert2'
import Arriba from '../../../components/Arriba'
import VerAsistencias from '../../../components/VerAsistencias'



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
            const response = await axios.delete(`${process.env.API_URL}/asamblea/delete/${asambleas.asambleaId._id}`,{data: values })
            if (response.status === 200){
                Swal.fire({
                    title: 'Asamblea eliminada',
                    text: 'La asamblea se ha eliminado con exito',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                }).then((result)=>{
                    if (result.isConfirmed){
                        router.push("/asamblea/ver")
                    }
                })
            }
            }catch (error) {
            Swal.fire({
                title: 'Error',
                text: `La asamblea no se ha podido eliminar`,
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    }


    return (
        <Box>
            <Arriba/>
            <Container maxW="container.xl" centerContent>
                <Heading my={15}> {asambleas.asambleaId.name}</Heading>
                    <HStack w={"full"} py={10}>
                        <Button w={"full"} colorScheme={"teal"} onClick={() => router.push(`/asamblea/editar/${asambleas.asambleaId._id}`)}>Editar</Button>
                        <Button w={"full"} colorScheme={"teal"} onClick={() => eliminarAsamblea()}>Eliminar</Button>
                        <Button w={"full"} colorScheme={"teal"} onClick={() => router.push(`/asistencia/ver/${asambleas.asambleaId._id}`)}>Ver Asistencias</Button>
                        <Button w={"full"} colorScheme={"teal"} onClick={() => router.push("/asamblea/ver")}>Volver</Button>
                    </HStack>
                <Divider/>
                <Stack w={"full"} py={10}>
                    <ShowInfo tag="Nombre" data={asambleas.asambleaId.name} />
                    <ShowInfo tag="Tipo" data={asambleas.asambleaId.tipo} />
                    <ShowInfo tag="Archivos" data={asambleas.asambleaId.archivos}/>
                </Stack>
                <RadioGroup>
                    <HStack spacing='24px'>
                    <Radio value='user' onChange={onChange} name={"rolUsuario"}>user</Radio>
                    <Radio value='admin' onChange={onChange} name={"rolUsuario"}>admin</Radio>
                    </HStack>
                </RadioGroup>
            </Container>
        </Box>
    )
}

export default asamblea