import React from 'react'
import { Stack,HStack,FormControl,FormLabel,Input,RadioGroup,Radio } from '@chakra-ui/react'

const FormularioAsamblea = () => {
    return (
        <Stack>
                <FormControl isRequired="true">
                    <FormLabel>Nombre asamblea</FormLabel>
                    <Input defaultValue={`${asambleas.asambleaId.name}`} placeholder="Asamblea" type={"text"} maxLength={100} onChange={onChange} name={"name"}/>
                </FormControl>
                <FormControl isRequired="true">
                    <FormLabel >Tipo asamblea</FormLabel>
                        <RadioGroup defaultValue={asambleas.asambleaId.tipo}>
                            <HStack spacing='24px'>
                                <Radio value='Ordinaria' onChange={onChange} name={"tipo"}>Ordinaria</Radio>
                                <Radio value='Extraordinaria' onChange={onChange} name={"tipo"}>Extraordinaria</Radio>
                            </HStack>
                        </RadioGroup>
                </FormControl>
                <FormControl isRequired="true">
                    <FormLabel>Fecha</FormLabel>
                    <Input defaultValue={`${date}`} Value={`${date}`} placeholder="Select Date and Time" size="xl" type="datetime-local" onChange={onChange} name={"fecha"}/>
                </FormControl>
                <FormControl isRequired="true">
                    <FormLabel >rolUsuario</FormLabel>
                        <RadioGroup >
                            <HStack spacing='24px'>
                                <Radio value='user' onChange={onChange} name={"rolUsuario"}>user</Radio>
                                <Radio value='admin' onChange={onChange} name={"rolUsuario"}>admin</Radio>
                            </HStack>
                        </RadioGroup>
                </FormControl>
            </Stack>
    )
}

export default FormularioAsamblea