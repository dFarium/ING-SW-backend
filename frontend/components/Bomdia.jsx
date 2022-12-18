import React from 'react'
import { Input, InputGroup,InputLeftAddon } from "@chakra-ui/react"

const Bomdia = () => {
  return (
    <InputGroup>
        <InputLeftAddon children='BOM' />
        <Input placeholder='DIA' />
    </InputGroup>
  )
}

export default Bomdia