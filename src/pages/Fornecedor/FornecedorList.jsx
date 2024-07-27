import React, { useEffect, useState } from 'react'
import axios from '../../api'

const FornecedorList = () => {

    const [fornecedores, setFornecedores] = useState([])

    useEffect(() => {
        const buscarFornecedores = () => {
            axios.get('/fornecedores')
            .then(response => {
                setFornecedores(response.data)
            })
            .catch(error => {
                console.error("Ocorreu um erro", error)
            })
        }
        buscarFornecedores()
    }, [])


  return (
    <div>FornecedorList</div>
  )
}

export default FornecedorList