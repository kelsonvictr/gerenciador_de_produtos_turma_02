import React from 'react'
import { useState } from 'react'
import { FaQuestionCircle } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import InputMask from 'react-input-mask'

const FornecedorForm = () => {

    const [fornecedor, setFornecedor] = useState({ nome: '', cnpj: '', email: ''})
    const [tooltipAberto, setTooltipAberto] = useState(false)
    const { id } = useParams()

    const toggleTooltip = () => {
        setTooltipAberto(!tooltipAberto)
    }

  return (
    <div className="form-container">
        <h2 style={{ position: 'relative '}}>
            {id ? 'Editar Fornecedor' : 'Adicionar Fornecedor'}
            {' '}
            <FaQuestionCircle
                className="tooltip-icon"
                onClick={toggleTooltip}
            />
            {tooltipAberto && (
                <div className="tooltip">
                    {id ? 'Nesta tela, você pode editar as informações de um fornecedor existente.'
                    :
                    'Nesta tela, você pode adicionar um novo fornecedor ao sistema.'
                    }
                </div>
            )}
        </h2>

        <form className="fornecedor-form">
            <div className="form-group">
                <label htmlFor="nome">Nome do fornecedor</label>
                <input
                    type="text"
                    className="form-control"
                    id="nome"
                    name="nome"
                    value={fornecedor.nome}
                    onChange={e => setFornecedor({ ...fornecedor, nome: e.target.value })}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="cnpj">CNPJ do fornecedor</label>
                <InputMask
                    mask="99.999.999/9999-99"
                    className="form-control"
                    id="cnpj"
                    name="cnpj"
                    value={fornecedor.cnpj}
                    onChange={e => setFornecedor({ ...fornecedor, cnpj: e.target.value})}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email do fornecedor</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    title="Digite um email válido"
                    value={fornecedor.email}
                    onChange={e => setFornecedor({ ...fornecedor, email: e.target.value})}
                    required
                />
            </div>
            <button type="submit" className="btn-success">
                {id ? 'Editar' : 'Adicionar'}
            </button>
        </form>

    </div>
  )
}

export default FornecedorForm