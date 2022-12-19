import React from "react"
import { Stack, Button } from "@chakra-ui/react"


const InputButton = ({value}) => {
  return (
    <Stack spacing ={3}>
        <Button bg={'#C0B590'} colorScheme={'yellow'} style={{color: "#492B2B"}}>Boton numero {value}</Button>
    </Stack>
  )
}

export default InputButton