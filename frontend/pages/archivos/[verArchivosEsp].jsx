import React from 'react'
import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import axios from 'axios'

const verArchivos = () => {

    const router = useRouter()
    const {archivos} = router.query
    console.log(archivos)
    //const [files, setArchivos] = useState()

    // const getFiles = async () => {
    //     const response = await axios.get(`${process.env.API_URL}/archivos/${archivos}`)
    //     setArchivos(response.data)
    // }

    // useEffect(()=>{
    //     getFiles()
    //     console.log(files)
    // }, [files])

    return (
        <h1>La pagina es {archivos} </h1>
    )
}

export default verArchivos