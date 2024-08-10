import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

const FornecedorForm = () => {

    const [fornecedor, setFornecedor] = useState({ nome: '', cnpj: '', email: ''})
    const { id } = useParams()

  return (
    <div className="form-container">
        <h2 style={{ position: 'relative '}}>
            {id ? 'Editar Fornecedor' : 'Adicionar Fornecedor'}
        </h2>

    </div>
  )
}

export default FornecedorForm