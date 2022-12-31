import { useState, useEffect } from 'react'
import { Button, Container, HStack, Input, Stack, Text, VStack,  Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Heading, useSafeLayoutEffect, } from '@chakra-ui/react'
import { FormControl, FormLabel } from '@chakra-ui/react'
import InputButton from '../../components/InputButton'
import InputTest from '../../components/InputTest'
import axios from 'axios'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import comentarios from '../comentarios/crearComentario'

export default function Home() {

  //comentarios(variable usada para acceder a los valores) y setComentarios(Función para almacenar valores en el estado)
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
          <Td>{comentario.apartado}</Td>
          <Td>{comentario.fecha}</Td>
          <Td>{comentario.user && (<><Td>{comentario.user.name}</Td></>)}</Td>
          <Td><Button onClick={() => router.push(`/comentarios/comentario/${comentario._id}`)}>Ver más</Button></Td>
          <Td><Button onClick={() => router.push(`/eliminar/${comentario._id}`)}>Eliminar comentario {comentario._id}</Button></Td> 
        </Tr>
      )
    })
  }
  return (
    <Container maxW="container.xl">
      <Heading textAlign={"center"} my={10}> Comentarios </Heading>
      <Button colorSchema = "teal" onClick={()=>router.push('/comentarios/crearComentario')}>Crear Comentario </Button>
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

    
  )
}

async function deleteComment(commentId) {
  console.log("ID DEL COMENTARIO QLO: "+commentId)
  // Obtiene la información de usuario del almacenamiento local del navegador
  
  try {
    const user = localStorage.getItem('user');
    const rol = localStorage.getItem('rolUsuario');

    // Envía una solicitud DELETE a la URL del comentario junto con la información de usuario
    const response = await fetch(`${process.env.API_URL}/comentario/delete/${commentId}`, {
      method: 'DELETE',
      body: JSON.stringify({ user, rol }),
      headers: { 'Content-Type': 'application/json' },
    })

      const updatedComments = comentarios.filter((comentario) => comentario._id !== commentId);
      setComments(updatedComments)
  } catch (error) {
    console.log("AWENAOO no estás autorizado para eliminar el comentario")
    if (error.response && error.response.status) {
      // Si el objeto error.response existe y tiene una propiedad status, verifica el valor de la propiedad status
      if (error.response.status === 401) {
        console.log("AWENAOO no estás autorizado para eliminar el comentario")
      }
    }
    
  }
}

async function eliminarComentario(id) {
  console.log("Id del comentario: "+id)
  axios.delete(`${process.env.API_URL}/comentario/delete`)
  .then(response =>{
    if (response.status === 200){
      Swal.fire({
          title: 'Comentario eliminado',
          text: 'Comentario eliminado correctamente',
          icon: 'success',
          confirmButtonText: 'Ok'
      })
    } else {
      Swal.fire({
          title: 'Error',
          text: 'Ha ocurrido un error',
          icon: 'error',
          confirmButtonText: 'Ok'
      })
  }
  }).catch(error=>{
      Swal.fire({
          title: 'Error',
          text: 'Ha ocurrido un error',
          icon: 'error',
          confirmButtonText: 'Ok'
      })
  })

}
