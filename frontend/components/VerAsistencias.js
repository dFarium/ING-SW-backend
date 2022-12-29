import { useEffect, useState } from 'react'
import { useRouter} from 'next/router'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Tr,
    Td,
    Thead,
    Tbody,
    Table,
    Checkbox
} from '@chakra-ui/react'
import axios from 'axios'



const VerAsistencias = ({id}) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const router = useRouter()
    const [asistencias, setAsistencias] = useState([])

    function asisteCheckbox (asiste){
        let checkbox;
        if(asiste === "Presente"){
            checkbox = <Checkbox isDisabled defaultChecked></Checkbox>;
        }else{
            checkbox = <Checkbox isDisabled></Checkbox>;
        }
        return checkbox;
    }

    const getAsistenciasAsamblea = async () => {
        const response =await axios.get(`${process.env.API_URL}/asistenciaAsamblea/search/${id}`)
        setAsistencias(response.data)
    }

    useEffect(()=>{
        getAsistenciasAsamblea()
    }, [])

    const showAsistencias = () =>{
        return asistencias.map(asistencia=>{
            return(
                <Tr key={asistencia._id}>
                    <Td>{asistencia.user.name}</Td>
                    <Td textAlign={"center"}>{asisteCheckbox(asistencia.asistencia)}</Td>
                </Tr>
            )
        })
    }


    return (
    <>
        <Button onClick={onOpen}>Open Modal</Button>

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Asistencia</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <Table>
                    <Thead>
                        <Tr>
                            <Td>Nombre</Td>
                            <Td>Asistencia</Td>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {showAsistencias()}
                    </Tbody>
                    </Table>
                </ModalBody>

                <ModalFooter>
                <Button variant='ghost' mr={3} onClick={onClose}>Modificar</Button>
                <Button colorScheme='teal' mr={3} onClick={onClose}>Cerrar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        </>
  )
}

export default VerAsistencias