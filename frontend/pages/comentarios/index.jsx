import { useState, useEffect } from 'react'
import {Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Center, Textarea, Button, Container, Input, Stack, Table, Thead, Tbody, Tr, Th, Td, Heading, Box} from '@chakra-ui/react'
import { FormControl, FormLabel } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

export default function Home() {
  const [comentarios, setComentarios] = useState([])
  const router = useRouter()

  const obtenerComentarios = async () => {
    const response = await axios.get(`${process.env.API_URL}/comentarios`)
    setComentarios(response.data)
  }

  useEffect(() => {
    obtenerComentarios()
  }, [])

  const showComentarios = () => {
    return comentarios.map(comentario => {
      return (
        <Tr key={comentario._id}>
          <Td maxW="500">{comentario.apartado}</Td>
          <Td maxW="500">{comentario.fecha}</Td>
          <Td maxW="500">{comentario.user && comentario.user.name}</Td>
          <Td><Button colorScheme="twitter" variant='link' onClick={() => router.push(`/comentarios/comentario/${comentario._id}`)}>detalle</Button></Td>
        </Tr>
      )
    })
  }
  
  const [values, setValues] = useState({
    apartado: '',
    user: '',
    asamblea: ''
  })

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
        await axios.post(`${process.env.API_URL}/comentario`, values)
        //setSuccessMessage(response.data.message)
        Swal.fire({
            title: 'Comentario creado',
            text: 'Comentario creado correctamente',
            icon: 'success',
            confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.reload()
            }
        })
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: 'Ha ocurrido un error',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }
  }
  const onChange = (e) => {
    setValues({
        ...values,
        [e.target.name]: e.target.value
    })
  }

  return (
    <Box>
      <Center>
        <Heading mx={10} my={10}> Comentarios </Heading>
        {/* <Button mx={10} my={10} onClick={() => window.location.reload()}>REFRESH</Button> */}
      </Center>
      
      <Accordion allowMultiple w={"full"}>
        <AccordionItem my={'15'}>
          <h2>
            {/* Colores boton */}
              <AccordionButton bg='gray.200' _expanded={{  bg: 'orange.400', color: 'white' }}>
                <Box as="span" flex='1' textAlign='center'>
                  Comentarios
                </Box>
                <AccordionIcon />
              </AccordionButton>
          </h2>
                <AccordionPanel pb={'5'}>
                  <Container maxW='1250px'>
                    <Table variant="simple" centerContent>
                      <Thead>
                        <Tr>
                          <Th>Comentario</Th>
                          <Th>Fecha</Th>
                          <Th>Usuario</Th>
                        </Tr>
                      </Thead>
                      <Tbody wy={10}>
                          {showComentarios()}
                      </Tbody>
                    </Table>
                  </Container>
                  <Stack>
          <Container maxW='700px'>
            <FormControl>
              <Center>
                <FormLabel my={10} mx={10}>Crear Comentario </FormLabel>
              </Center>
              <Textarea placeholder="Ingresa un comentario" type={"text"} onChange={onChange} name="apartado"/>
            </FormControl>
            <FormControl my={2}>
              <Input placeholder="Ingresa tu nombre" type={"text"} onChange={onChange} name="user"/>
            </FormControl>
            <FormControl>
              <Input placeholder="Ingresa la asamblea" type={"text"} onChange={onChange} name="asamblea"/>
            </FormControl>
            <Center>
              <Button colorScheme="messenger" size="md" type="submit" my={5} onClick={onSubmit}>Enviar</Button>
            </Center>
          </Container>
        </Stack>
                </AccordionPanel>
        </AccordionItem>
      </Accordion>
        
        
    </Box>
  )
}
