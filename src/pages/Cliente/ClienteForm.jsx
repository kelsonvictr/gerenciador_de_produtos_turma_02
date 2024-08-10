import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../../api'
import InputMask from 'react-input-mask'
import Modal from 'react-modal'
import { FaCheckCircle, FaQuestionCircle } from 'react-icons/fa'

Modal.setAppElement('#root')

const ClienteForm = () => {
  const [cliente, setCliente] = useState({
    nome: '',
    cpf: '',
    email: '',
    cep: '',
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
    pais: 'Brasil',
  })
  const [modalAberto, setModalAberto] = useState(false)
  const [tooltipAberto, setTooltipAberto] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      axios.get(`/clientes/${id}`)
        .then(response => {
          setCliente(response.data)
        })
        .catch(error => console.error("Ocorreu um erro: ", error))
    }
  }, [id])

  const handleSubmit = (event) => {
    event.preventDefault()

    if (id) {
      axios.put(`/clientes/${id}`, cliente)
        .then(() => {
          setModalAberto(true)
        })
        .catch(error => console.error("Ocorreu um erro: ", error))
    } else {
      axios.post('/clientes', cliente)
        .then(() => {
          setModalAberto(true)
        })
        .catch(error => console.error("Ocorreu um erro: ", error))
    }
  }

  const fecharModal = () => {
    setModalAberto(false)
    navigate("/listar-clientes")
  }

  const adicionarOutroCliente = () => {
    setModalAberto(false)
    setCliente({
      nome: '',
      cpf: '',
      email: '',
      cep: '',
      rua: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: '',
      pais: 'Brasil',
    })
  }

  const toggleTooltip = () => {
    setTooltipAberto(!tooltipAberto)
  }

  const handleCepChange = (e) => {
    const cep = e.target.value.replace(/\D/g, '')
    setCliente({ ...cliente, cep: e.target.value })

    if (cep.length === 8) {
      axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => {
          if (!response.data.erro) {
            setCliente(prevCliente => ({
              ...prevCliente,
              rua: response.data.logradouro,
              bairro: response.data.bairro,
              cidade: response.data.localidade,
              estado: response.data.uf
            }))
          }
        })
        .catch(error => console.error("Erro ao buscar CEP: ", error))
    }
  }

  return (
    <div className="form-container">
      <h2 style={{ position: 'relative' }}>
        {id ? 'Editar Cliente' : 'Adicionar Cliente'}{' '}
        <FaQuestionCircle
          className="tooltip-icon"
          onClick={toggleTooltip}
        />
        {tooltipAberto && (
          <div className="tooltip">
            {id 
              ? 'Nesta tela, você pode editar as informações de um cliente existente.'
              : 'Nesta tela, você pode adicionar um novo cliente ao sistema.'
            }
          </div>
        )}
      </h2>
      <form onSubmit={handleSubmit} className="fornecedor-form">
        <div className="form-group">
          <label htmlFor="nome">Nome do cliente:</label>
          <input 
            type="text" 
            className="form-control" 
            id="nome" 
            name="nome" 
            value={cliente.nome} 
            onChange={e => setCliente({ ...cliente, nome: e.target.value })} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpf">CPF do cliente:</label>
          <InputMask 
            mask="999.999.999-99" 
            className="form-control" 
            id="cpf" 
            name="cpf" 
            value={cliente.cpf} 
            onChange={e => setCliente({ ...cliente, cpf: e.target.value })} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email do cliente:</label>
          <input 
            type="email" 
            className="form-control" 
            id="email" 
            name="email" 
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            title="Digite um email válido"
            value={cliente.email} 
            onChange={e => setCliente({ ...cliente, email: e.target.value })} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="cep">CEP:</label>
          <InputMask 
            mask="99999-999" 
            className="form-control" 
            id="cep" 
            name="cep" 
            value={cliente.cep} 
            onChange={handleCepChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="rua">Rua:</label>
          <input 
            type="text" 
            className="form-control" 
            id="rua" 
            name="rua" 
            value={cliente.rua} 
            onChange={e => setCliente({ ...cliente, rua: e.target.value })} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="numero">Número:</label>
          <input 
            type="text" 
            className="form-control" 
            id="numero" 
            name="numero" 
            value={cliente.numero} 
            onChange={e => setCliente({ ...cliente, numero: e.target.value })} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="bairro">Bairro:</label>
          <input 
            type="text" 
            className="form-control" 
            id="bairro" 
            name="bairro" 
            value={cliente.bairro} 
            onChange={e => setCliente({ ...cliente, bairro: e.target.value })} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="cidade">Cidade:</label>
          <input 
            type="text" 
            className="form-control" 
            id="cidade" 
            name="cidade" 
            value={cliente.cidade} 
            onChange={e => setCliente({ ...cliente, cidade: e.target.value })} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="estado">Estado:</label>
          <input 
            type="text" 
            className="form-control" 
            id="estado" 
            name="estado" 
            value={cliente.estado} 
            onChange={e => setCliente({ ...cliente, estado: e.target.value })} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="pais">País:</label>
          <input 
            type="text" 
            className="form-control" 
            id="pais" 
            name="pais" 
            value={cliente.pais} 
            onChange={e => setCliente({ ...cliente, pais: e.target.value })} 
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
        <div className="modal-content">
          <FaCheckCircle className="icon" />
          <h2>{id ? 'Cliente atualizado com sucesso!' : 'Cliente adicionado com sucesso!'}</h2>
          <div className="modal-buttons">
            <button onClick={fecharModal} className="btn-success">Fechar</button>
            {!id && <button onClick={adicionarOutroCliente} className="btn-secondary">Adicionar outro cliente</button>}
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ClienteForm
