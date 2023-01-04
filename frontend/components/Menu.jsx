import React from 'react'
import { useRouter } from 'next/router'
import {
    Icon,
    Button,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box} from '@chakra-ui/react'
import {HamburgerIcon, ArrowBackIcon } from '../node_modules/@chakra-ui/icons'
import { GrMail } from 'react-icons/gr'
import { HiUserGroup } from 'react-icons/hi'
import { FaUserAlt } from 'react-icons/fa'
import { AiFillFile, AiFillHome } from 'react-icons/ai'


const Menu = () => {

    const router = useRouter()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    const mostrarElemento = (nombre, ruta, nombreIcon) => {
        return(
            <Accordion allowMultiple w={"full"}>
                    <AccordionItem>
                        <h2>
                            <AccordionButton   _expanded={{  bg: 'teal.400', color: 'white' }}>
                                <Box as="span" flex='1' textAlign='center'>
                                    {nombre}
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                    <AccordionPanel pb={'4'}>
                        <Button w={"full"} onClick={()=>router.push(ruta)}>
                            <Icon mx={'1.5'} color={'teal.500'} w={5} h={5} as={nombreIcon}/>
                            {nombre}
                        </Button>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        )
    }

    return (
        <>
        <Button ref={btnRef} variant='outline' colorScheme='white' onClick={onOpen}>
            <HamburgerIcon></HamburgerIcon>
        </Button>
        <Drawer isOpen={isOpen} placement='left' onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent >
            <DrawerCloseButton />
            <DrawerHeader my={5}> Menu</DrawerHeader>
            <Button  bg={'gray.100'} onClick={()=>router.push('/')}>
                <Icon mx={'1.5'} color={'teal.500'} w={5} h={5} as={AiFillHome}/>
                Inicio
            </Button>
            <DrawerBody>
            {/* Acordeon 1 */}
            {mostrarElemento('Asamblea','/asamblea/ver', HiUserGroup)}
            {/* Acordeon 2 */}
            {mostrarElemento('Historial de Actas', '/archivos/verArchivos', AiFillFile )}
            {/* Acordeon 3 */}
            {mostrarElemento('Mandar Avisos', '/enviar_email/email', GrMail)}
            {/* Acordeon 4 */}
            {mostrarElemento('Ver Usuarios','/usuarios/ver', FaUserAlt)}
            </DrawerBody>
            <DrawerFooter>
                <Button  bg={'white'} variant='outline' mr={1} onClick={onClose}>
                    <ArrowBackIcon color="teal" ></ArrowBackIcon>
                </Button>
            </DrawerFooter>
        </DrawerContent>
        </Drawer>
        </>
    )
}

export default Menu