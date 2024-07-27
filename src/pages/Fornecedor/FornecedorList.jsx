import React, { useEffect, useState } from 'react'
import axios from '../../api'
import { Link } from 'react-router-dom'

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
    <div className="container mt-5">
        <h2 className="mb-4">Lista de Fornecedores</h2>
        <Link to="/add-fornecedores" className="btn btn-primary mb-2">
            <FaPlus className="icon" /> Adicionar Fornecedor
        </Link>

    </div>
  )
}

export default FornecedorList