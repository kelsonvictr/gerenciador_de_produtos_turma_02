import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../../api'
import Modal from 'react-modal'
import { FaCheckCircle, FaExclamationTriangle, FaQuestionCircle } from 'react-icons/fa'

Modal.setAppElement('#root')

const ProdutoForm = () => {
  const [produto, setProduto] = useState({ nome: '', preco: '', descricao: '', quantidadeEstoque: '', fornecedorId: '' })
  const [fornecedores, setFornecedores] = useState([])
  const [modalAberto, setModalAberto] = useState(false)
  const [modalErroAberto, setModalErroAberto] = useState(false)
  const [mensagensErro, setMensagensErro] = useState([])
  const [tooltipAberto, setTooltipAberto] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    // Buscar fornecedores
    axios.get('/fornecedores')
      .then(response => {
        setFornecedores(response.data)
      })
      .catch(error => console.error("Erro ao buscar fornecedores: ", error))

    // Se houver um ID, buscar os dados do produto
    if (id) {
      axios.get(`/produtos/${id}`)
        .then(response => {
          setProduto({
            ...response.data,
            fornecedorId: response.data.fornecedor ? response.data.fornecedor.id : ''
          })
        })
        .catch(error => console.error("Ocorreu um erro: ", error))
    } else {
      // Se não houver ID, redefinir o estado do produto para adicionar um novo
      setProduto({ nome: '', preco: '', descricao: '', quantidadeEstoque: '', fornecedorId: '' })
    }
  }, [id])

  const handleSubmit = (event) => {
    event.preventDefault()
    setMensagensErro([]) // Limpa erros anteriores

    // Garantir que o preço esteja no formato correto antes de enviar
    const precoFormatado = parseFloat(produto.preco).toFixed(2)
    const produtoData = { ...produto, preco: precoFormatado }

    const request = id 
      ? axios.put(`/produtos/${id}`, produtoData)
      : axios.post('/produtos', produtoData)

    request.then(() => {
      setModalAberto(true)
    }).catch(error => {
      if (error.response && error.response.data) {
        setMensagensErro(Object.values(error.response.data))
        setModalErroAberto(true)
      } else {
        console.error("Ocorreu um erro: ", error)
      }
    })
  }

  const handlePrecoChange = (event) => {
    let valor = event.target.value

    // Substituir vírgula por ponto
    valor = valor.replace(',', '.')

    // Remover caracteres que não sejam dígitos ou ponto
    valor = valor.replace(/[^0-9.]/g, '')

    // Garantir que tenha no máximo um ponto e duas casas decimais
    if (valor.includes('.')) {
      const [parteInteira, parteDecimal] = valor.split('.')
      valor = parteInteira + '.' + (parteDecimal ? parteDecimal.slice(0, 2) : '')
    }

    // Atualizar o estado do produto com o valor formatado
    setProduto({ ...produto, preco: valor })
  }

  const fecharModal = () => {
    setModalAberto(false)
    navigate("/listar-produtos")
  }

  const fecharModalErro = () => {
    setModalErroAberto(false)
  }

  const adicionarOutroProduto = () => {
    setModalAberto(false)
    setProduto({ nome: '', preco: '', descricao: '', quantidadeEstoque: '', fornecedorId: '' })
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
            type="text" 
            className="form-control" 
            id="preco" 
            name="preco" 
            value={produto.preco} 
            onChange={handlePrecoChange}
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
        <div className="form-group">
          <label htmlFor="fornecedorId">Fornecedor:</label>
          <select
            className="form-control"
            id="fornecedorId"
            name="fornecedorId"
            value={produto.fornecedorId}
            onChange={e => setProduto({ ...produto, fornecedorId: e.target.value })}
            required
          >
            <option value="">Selecione um fornecedor</option>
            {fornecedores.map(fornecedor => (
              <option key={fornecedor.id} value={fornecedor.id}>
                {fornecedor.nome}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn-success">{id ? 'Salvar' : 'Adicionar'}</button>
      </form>

      {/* Modal de sucesso */}
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

      {/* Modal de erro */}
      <Modal
        isOpen={modalErroAberto}
        onRequestClose={fecharModalErro}
        className="modal"
        overlayClassName="overlay"
      >
        <div className="modalContent">
          <FaExclamationTriangle className="icon errorIcon" />
          <h2>Ocorreu um erro:</h2>
          {mensagensErro.map((mensagem, index) => (
            <h4 key={index}>{mensagem}</h4>
          ))}
          <button onClick={fecharModalErro} className="btn-secondary">Fechar</button>
        </div>
      </Modal>
    </div>
  )
}

export default ProdutoForm