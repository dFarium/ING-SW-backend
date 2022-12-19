import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Container, Heading } from '@chakra-ui/react'

export async function getServerSideProps(context){
    console.log(context.params.asamblea)
    try {
        const response = await axios.get(`${process.env.API_URL}/asamblea/search/${context.params.asamblea}`)
        return{
            props:{
                asambleaId: response.data
            }
        }
    } catch (error) {
        console.log("ERROR",error)
        return{
            props:{
                data:null
            }
        }
    }
}

const asamblea = (data) => {
    console.log(data)
    const router = useRouter()
    const {asamblea} = router.query
    const [asambleas, setAsamblea] = useState()

    // const getAsamblea = async() =>{
    //     const response = await axios.get(`${process.env.API_URL}/asamblea/search/${asamblea}`)
    //     setAsamblea(response.data)
    // }

    // useEffect(()=>{
    //      try{
    //         getAsamblea()
    //      }catch(error){
    //         console.log(error)
    //      }
    // },[asamblea])

    
    return (
        <Heading>Esta es la pag de {asamblea}</Heading>        
    )
}

export default asamblea