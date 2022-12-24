import React from 'react'
import { Input,Stack } from '@chakra-ui/react'

const InputMail = ({mensajes}) => {
    const mensaje = 'Hola mundo 1'
    return (
    <Stack spacing={3}>
        <Input placeholder={mensajes[0]}/>
        <Input placeholder={mensajes[1]}/>
    </Stack>
  )
}

export default InputMail