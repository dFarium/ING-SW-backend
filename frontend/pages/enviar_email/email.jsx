import React from 'react'
import { Textarea, Button, Container, Input, Stack, Text, HStack, Heading, FromControl, FormLabel } from '@chakra-ui/react'
import axios from 'axios'

const email = () => {
  return (
    <Container maxW= "container.md">
      <Heading textAlign={"center"} my={10}>Enviar Correos</Heading>
      <Stack>
          <FromControl>
              <FormLabel>¿Quien envia el correo?</FormLabel>
              <Input placeholder='Nombre o rol' type={"text"}/>
          </FromControl>

          <FromControl>
              <FormLabel>Asunto</FormLabel>
              <Input placeholder='Introduzca el asunto del correo' type={"text"} />
          </FromControl>

          <FromControl>
              <FormLabel>Cuerpo del correo</FormLabel>
              <Textarea placeholder="Escriba su correo"/>
          </FromControl>
      </Stack>
      <Button colorScheme="yellow" size="md" type="submit" my={5}>Enviar correo</Button>
    </Container>
  )
}

export default email