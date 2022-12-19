import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import axios from 'axios'

const verArchivos = () => {

    const router = useRouter()
    const {arch} = router.query

    const [files, setArchivos] = useState()

    const getFiles = async () => {
        const response = await axios.get(`${process.env.API_URL}/archivos/${arch}`)
        setArchivos(response.data)
    }

    useEffect(()=>{
        getFiles()
        console.log(files)
    }, [files])

    return (
        <h1>La pagina es {arch} </h1>
    )
}

export default verArchivos