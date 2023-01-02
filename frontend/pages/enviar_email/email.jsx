import { useState, useEffect }from 'react'
import { Textarea, Button, Container, Input, Stack, Box, Heading, FormControl, FormLabel, Icon, HStack } from '@chakra-ui/react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
const jwt = require("jwt-simple")
import {checkToken} from '../../data/usuario'
import Arriba from '../../components/Arriba'
import { ArrowBackIcon} from '../../node_modules/@chakra-ui/icons'
import { GrMail } from 'react-icons/gr'

export const getServerSideProps = async (context) => {
  try {
      const response = await checkToken(context.req.headers.cookie)
      const decode = jwt.decode(context.req.cookies.token,process.env.SECRET_KEY)
      if (decode.rol === 'admin'){
          if (response.status === 200){
              return{
                  props: {
                    existe: response.config.headers.cookie
                  }
              }
          }else{
              return{
                  redirect: {
                      destination: "/",
                      permanent: false
                  }
              }
          }
      }else{
          return{
              redirect: {
                  destination: "/",
                  permanent: false
              }
          }
      }
  } catch (error) {
      console.log(error)
      return{
        redirect: {
            destination: "/",
            permanent: false
        }
    }
  }
}


const email = (data) => {

const [values, setValues] = useState ({
  from: '',
  asunto: '',
  texto: ''
})

const router = useRouter()

const onSubmit = async (e) => {
  e.preventDefault()
  console.log(values)
  try{
    const response = await axios.post(`${process.env.API_URL}/mail`, values)
    console.log(response.status)
    if(response.status === 200){
      Swal.fire({
        title: 'Correo enviado',
        text: 'El correo ha sido enviado exitosamente',
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then((result) => {
        router.push('/')
      })
    }else{
      Swal.fire({
        title: 'Error al enviar correo',
        text: 'Ha ocurrido un error al enviar el correo',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
  }catch (error){
    Swal.fire({
      title: 'Error al enviar correo',
      text: 'Ha ocurrido un error al enviar el correo',
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
  console.log(e.target.name, e.target.value)
}

  return (
    <Box>
    <Arriba token={data.existe}/>
    <Container maxW= "container.md">
      <Heading textAlign={"center"} my={15}>Enviar Correos</Heading>
      <Stack>
          <FormControl>
              <FormLabel fontWeight="bold" >¿Quien envia el correo?</FormLabel>
              <Input placeholder='Nombre o rol' type={"text"} onChange={onChange} name={"from"}/>
          </FormControl>

          <FormControl>
              <FormLabel fontWeight="bold" >Asunto</FormLabel>
              <Input placeholder='Introduzca el asunto del correo' type={"text"} onChange={onChange} name={"asunto"}/>
          </FormControl>

          <FormControl>
              <FormLabel fontWeight="bold" >Cuerpo del correo</FormLabel>
              <Textarea placeholder='Escriba su correo' onChange={onChange} name={"texto"}/>
          </FormControl>
      </Stack>
      <Button leftIcon={<Icon as={GrMail}/>} float={"right"} colorScheme="green" size="md" type="submit" my={15} onClick={onSubmit}>Enviar correo</Button>
      <Button leftIcon={<ArrowBackIcon />}  my={15} colorScheme={"teal"} float={"left"} onClick={()=>router.push('/')} >Volver</Button>
    </Container>
    </Box>
  )
}

export default email