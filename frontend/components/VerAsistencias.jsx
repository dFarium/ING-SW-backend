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
    Checkbox,
    Radio,
    RadioGroup,
    HStack
} from '@chakra-ui/react'
import axios from 'axios'

const VerAsistencias = ({id}) => {
    
    const { isOpen: isModal1Open, onOpen: onModal1Open, onClose:onModal1Close } = useDisclosure()
    const { isOpen: isModal2Open, onOpen: onModal2Open, onClose:onModal2Close} = useDisclosure()
    const [asistencias, setAsistencias] = useState([])

    const[values, setValues] = useState({
        rolUsuario: ''
    })

    function asisteCheckbox (asiste){
        let checkbox;
        if(asiste === "Presente"){
            checkbox = <Checkbox isDisabled defaultChecked></Checkbox>;
        }else{
            checkbox = <Checkbox isDisabled></Checkbox>;
        }
        return checkbox;
    }

    function modificarAsisteCheckbox (asiste){
        let checkbox;
        if(asiste === "Presente"){
            checkbox = <Checkbox defaultChecked></Checkbox>;
        }else{
            checkbox = <Checkbox ></Checkbox>;
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

    const modificarShowAsistencias = () =>{
        return asistencias.map(asistencia=>{
            return(
                <Tr key={asistencia._id}>
                    <Td>{asistencia.user.name}</Td>
                    <Td textAlign={"center"}>{modificarAsisteCheckbox(asistencia.asistencia)}</Td>
                </Tr>
            )
        })
    }

    const onChange = async (e) =>{
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }


    return (
    <>
        <Button colorScheme="teal" w="full" onClick={onModal1Open}>Ver Asistencias</Button>
        <Modal isOpen={isModal1Open} onClose={onModal1Close}>
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
                <Button variant='ghost' mr={3} onClick={() => { onModal1Close(); onModal2Open();}}>Modificar</Button>
                <Button colorScheme='teal' mr={3} onClick={onModal1Close}>Cerrar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>

        <Modal isOpen={isModal2Open} onClose={onModal2Close}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Editar Asistencia</ModalHeader>
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
                        {modificarShowAsistencias()}
                    </Tbody>
                    </Table>
                </ModalBody>
                <ModalFooter>
                    <RadioGroup>
                        <HStack spacing='24px'>
                            <Radio value='user' onChange={onChange} name={"rolUsuario"}>user</Radio>
                            <Radio value='admin' onChange={onChange} name={"rolUsuario"}>admin</Radio>
                        </HStack>
                    </RadioGroup>
                    <Button variant='ghost' mr={3} onClick={onModal2Close}>Finalizar Edicion</Button>
                    <Button colorScheme='teal' mr={3} onClick={onModal2Close}>Cancelar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        </>
)
}

export default VerAsistencias