import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Container, Heading, Tbody,Stack,HStack,Button } from '@chakra-ui/react'
import ShowInfo from '../../../components/ShowInfo'

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
            props:{
                data:null
            }
        }
    }
}

const asamblea = (data) => {
    const router = useRouter()
    const [asambleas] = useState(data)


    return (
        <Container maxW="container.xl" centerContent>
            <Heading my={10}> {asambleas.asambleaId.name}</Heading>
            <Stack w={"full"}>
                <ShowInfo tag="Nombre" data={asambleas.asambleaId.name} color="blue.500" />
                <ShowInfo tag="Tipo" data={asambleas.asambleaId.tipo} color="yellow.500" />
                <ShowInfo tag="Archivos" data={asambleas.asambleaId.archivos} color="green.500" />
            </Stack>
            <HStack w={"full"} py={10}>
                <Button w={"full"} colorScheme={"teal"} onClick={() => router.push(`/producto/editar/${product._id}`)}>Editar</Button>
                <Button w={"full"} colorScheme={"teal"} onClick={() => handleDelete()}>Eliminar</Button>
                <Button w={"full"} colorScheme={"teal"} onClick={() => router.push("/asamblea/ver")}>Volver</Button>
            </HStack>
        </Container>
    )
}

export default asamblea