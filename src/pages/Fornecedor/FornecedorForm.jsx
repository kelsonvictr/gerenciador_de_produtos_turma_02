import React, { useEffect } from 'react'
import { useState } from 'react'
import { FaQuestionCircle, FaCheckCircle } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import InputMask from 'react-input-mask'
import axios from '../../api'
import Modal from 'react-modal'

Modal.setAppElement('#root')

const FornecedorForm = () => {
    const [fornecedor, setFornecedor] = useState({ nome: '', cnpj: '', email: ''})
    const [tooltipAberto, setTooltipAberto] = useState(false)
    const [modalAberto, setModalAberto] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        if (id) {
            // SE tiver id, é que precisa fazer o get (edição)
            axios.get(`/fornecedores/${id}`)
            .then(response => {
                setFornecedor(response.data)
            })
            .catch(error => console.error("Ocorreu um erro: ", error))
        }
    }, [id])
    

    const toggleTooltip = () => {
        setTooltipAberto(!tooltipAberto)
    }

    const handleSubmit = (event) => { 
        event.preventDefault()

        if (id) {
            // Se tiver id, então é edição
            axios.put(`/fornecedores/${id}`, fornecedor)
            .then(() => {
                setModalAberto(true)
            })
            .catch(error => console.error("Ocorreu um erro: ", error))
        } else {
            // Se não tem id, significa add um novo fornecedor
            axios.post('/fornecedores', fornecedor)
            .then(() => {
                setModalAberto(true)
            })
            .catch(error => console.error("Ocorreu um erro: ", error))
        }
    }

    const fecharModal = () => {
        setModalAberto(false)
        navigate("/listar-fornecedores")
    }

    const adicionarOutroFornecedor = () => {
        setModalAberto(false)
        setFornecedor({ nome: '', cnpj: '', email: '' })
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

        <form onSubmit={handleSubmit} className="fornecedor-form">
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

        <Modal
            isOpen={modalAberto}
            onRequestClose={fecharModal}
            className="modal"
            overlayClassName="overlay"
        >
        <div className="modalContent">
            <FaCheckCircle className="icon successIcon" />
            <h2>{id ? 'Fornecedor atualizado com sucesso!' : 'Fornecedor adicionado com sucesso!'}</h2>

            <div className="modalButtons">
                <button onClick={fecharModal} className="btn-success">Fechar</button>
                {!id && <button onClick={adicionarOutroFornecedor} className="btn-secondary">Adicionar outro fornecedor</button>}
            </div>
        </div>
        </Modal>


        

    </div>
  )
}

export default FornecedorForm