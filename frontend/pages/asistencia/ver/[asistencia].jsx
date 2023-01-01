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
            checkbox = <Switch isReadOnly defaultChecked ></Switch>;
        }else{
            checkbox = <Switch isReadOnly></Switch>;
        }
        return checkbox;
    }

    return (
        <Box>
            <Arriba/>
            <Container maxW="container.xl">
                <Heading textAlign={"center"} my={15}>Asistencia de {asistencia.asambleaId[0].asamblea.name}</Heading>
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
                <Button colorScheme={"teal"} float={"right"} onClick={() => router.push(`/asistencia/editar/${asistencia.asambleaId[0].asamblea._id}`)}>Modificar Asistencia</Button>

            </Container>
            <Button colorScheme={"teal"} float={"right"} onClick={()=>giveId()}>Ver</Button>
        </Box>

    )
}

export default asistencia