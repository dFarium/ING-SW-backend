import { useState } from "react"
import { Input, Stack} from '@chakra-ui/react'
import InputMail from "../components/InputMail"

export default function Home() {

  const mensajes = ['Hola mundo 1', 'Hola mundo 2']
  return (
    <Stack>
      <InputMail mensajes={mensajes}/>

    </Stack>
  )
}
