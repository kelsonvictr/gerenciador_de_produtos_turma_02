import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../../api'
import Modal from 'react-modal'
import { FaCheckCircle, FaQuestionCircle } from 'react-icons/fa'

Modal.setAppElement('#root')

const ProdutoForm = () => {
  const [produto, setProduto] = useState({ nome: '', preco: '', descricao: '', quantidadeEstoque: '' })
  const [modalAberto, setModalAberto] = useState(false)
  const [tooltipAberto, setTooltipAberto] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      axios.get(`/produtos/${id}`)
        .then(response => {
          setProduto(response.data)
        })
        .catch(error => console.error("Ocorreu um erro: ", error))
    }
  }, [id])

  const handleSubmit = (event) => {
    event.preventDefault()

    if (id) {
      axios.put(`/produtos/${id}`, produto)
        .then(() => {
          setModalAberto(true)
        })
        .catch(error => console.error("Ocorreu um erro: ", error))
    } else {
      axios.post('/produtos', produto)
        .then(() => {
          setModalAberto(true)
        })
        .catch(error => console.error("Ocorreu um erro: ", error))
    }
  }

  const fecharModal = () => {
    setModalAberto(false)
    navigate("/listar-produtos")
  }

  const adicionarOutroProduto = () => {
    setModalAberto(false)
    setProduto({ nome: '', preco: '', descricao: '', quantidadeEstoque: '' })
  }

  const toggleTooltip = () => {
    setTooltipAberto(!tooltipAberto)
  }

  return (
    <div className="form-container">
      <h2 style={{ position: 'relative' }}>
        {id ? 'Editar Produto' : 'Adicionar Produto'}{' '}
        <FaQuestionCircle
          className="tooltip-icon"
          onClick={toggleTooltip}
        />
        {tooltipAberto && (
          <div className="tooltip">
            {id 
              ? 'Nesta tela, você pode editar as informações de um produto existente.'
              : 'Nesta tela, você pode adicionar um novo produto ao sistema.'
            }
          </div>
        )}
      </h2>
      <form onSubmit={handleSubmit} className="fornecedor-form">
        <div className="form-group">
          <label htmlFor="nome">Nome do produto:</label>
          <input 
            type="text" 
            className="form-control" 
            id="nome" 
            name="nome" 
            value={produto.nome} 
            onChange={e => setProduto({ ...produto, nome: e.target.value })} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="preco">Preço do produto:</label>
          <input 
            type="number" 
            step="0.01"
            className="form-control" 
            id="preco" 
            name="preco" 
            value={produto.preco} 
            onChange={e => setProduto({ ...produto, preco: e.target.value })} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="descricao">Descrição do produto:</label>
          <input 
            type="text" 
            className="form-control" 
            id="descricao" 
            name="descricao" 
            value={produto.descricao} 
            onChange={e => setProduto({ ...produto, descricao: e.target.value })} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantidadeEstoque">Quantidade em estoque:</label>
          <input 
            type="number"
            className="form-control" 
            id="quantidadeEstoque" 
            name="quantidadeEstoque" 
            value={produto.quantidadeEstoque} 
            onChange={e => setProduto({ ...produto, quantidadeEstoque: e.target.value })} 
            required 
          />
        </div>
        <button type="submit" className="btn-success">{id ? 'Salvar' : 'Adicionar'}</button>
      </form>

      <Modal
        isOpen={modalAberto}
        onRequestClose={fecharModal}
        className="modal"
        overlayClassName="overlay"
      >
        <div className="modalContent">
          <FaCheckCircle className="icon successIcon" />
          <h2>{id ? 'Produto atualizado com sucesso!' : 'Produto adicionado com sucesso!'}</h2>
          <div className="modalButtons">
            <button onClick={fecharModal} className="btn-success">Fechar</button>
            {!id && <button onClick={adicionarOutroProduto} className="btn-secondary">Adicionar outro produto</button>}
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ProdutoForm
