import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../../api'
import InputMask from 'react-input-mask'
import Modal from 'react-modal'
import { FaCheckCircle, FaExclamationTriangle, FaQuestionCircle } from 'react-icons/fa'

Modal.setAppElement('#root')

const FornecedorForm = () => {
    const [fornecedor, setFornecedor] = useState({
        nome: '',
        cnpj: '',
        email: '',
        tipoFornecedor: 'COMUM', // Valor padrão
        endereco: {
            cep: '',
            logradouro: '',
            numero: '',
            complemento: '',
            bairro: '',
            cidade: '',
            estado: '',
            pais: 'Brasil'
        }
    })
    const [modalAberto, setModalAberto] = useState(false)
    const [modalErroAberto, setModalErroAberto] = useState(false)
    const [mensagensErro, setMensagensErro] = useState([])
    const [tooltipAberto, setTooltipAberto] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        if (id) {
            axios.get(`/fornecedores/${id}`)
                .then(response => {
                    setFornecedor(response.data)
                })
                .catch(error => console.error("Ocorreu um erro: ", error))
        }
    }, [id])

    const handleSubmit = (event) => {
        event.preventDefault()
        setMensagensErro([]) // Limpa erros anteriores

        // Remover pontuações do CNPJ
        const fornecedorData = {
            ...fornecedor,
            cnpj: fornecedor.cnpj.replace(/[^\d]/g, '')
        }

        const request = id 
            ? axios.put(`/fornecedores/${id}`, fornecedorData)
            : axios.post('/fornecedores', fornecedorData)

        request.then(() => {
            setModalAberto(true)
        })
        .catch(error => {
            if (error.response && error.response.status === 500) {
                setMensagensErro(["Erro no sistema, entre em contato com o administrador"])
                setModalErroAberto(true)
            } else if (error.response && error.response.data) {
                setMensagensErro(Object.values(error.response.data))
                setModalErroAberto(true)
            } else {
                console.error("Ocorreu um erro: ", error)
            }
        })
    }

    const fecharModal = () => {
        setModalAberto(false)
        navigate("/listar-fornecedores")
    }

    const fecharModalErro = () => {
        setModalErroAberto(false)
    }

    const adicionarOutroFornecedor = () => {
        setModalAberto(false)
        setFornecedor({
            nome: '',
            cnpj: '',
            email: '',
            tipoFornecedor: 'COMUM',
            endereco: {
                cep: '',
                logradouro: '',
                numero: '',
                complemento: '',
                bairro: '',
                cidade: '',
                estado: '',
                pais: 'Brasil'
            }
        })
    }

    const toggleTooltip = () => {
        setTooltipAberto(!tooltipAberto)
    }

    const handleCepChange = (e) => {
        const cep = e.target.value.replace(/\D/g, '')
        setFornecedor({ 
            ...fornecedor, 
            endereco: { ...fornecedor.endereco, cep: e.target.value } 
        })

        if (cep.length === 8) {
            axios.get(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => {
                    if (!response.data.erro) {
                        setFornecedor(prevFornecedor => ({
                            ...prevFornecedor,
                            endereco: {
                                ...prevFornecedor.endereco,
                                logradouro: response.data.logradouro,
                                bairro: response.data.bairro,
                                cidade: response.data.localidade,
                                estado: response.data.uf
                            }
                        }))
                    }
                })
                .catch(error => console.error("Erro ao buscar CEP: ", error))
        }
    }

    return (
        <div className="form-container">
            <h2 style={{ position: 'relative ' }}>
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
                        onChange={e => setFornecedor({ ...fornecedor, cnpj: e.target.value })}
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
                        onChange={e => setFornecedor({ ...fornecedor, email: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="tipoFornecedor">Tipo de Fornecedor</label>
                    <select
                        className="form-control"
                        id="tipoFornecedor"
                        name="tipoFornecedor"
                        value={fornecedor.tipoFornecedor}
                        onChange={e => setFornecedor({ ...fornecedor, tipoFornecedor: e.target.value })}
                        required
                    >
                        <option value="COMUM">COMUM</option>
                        <option value="PREMIUM">PREMIUM</option>
                    </select>
                </div>

                {/* Campos de endereço */}
                <div className="form-group">
                    <label htmlFor="cep">CEP</label>
                    <InputMask
                        mask="99999-999"
                        className="form-control"
                        id="cep"
                        name="cep"
                        value={fornecedor.endereco.cep}
                        onChange={handleCepChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="logradouro">Logradouro</label>
                    <input
                        type="text"
                        className="form-control"
                        id="logradouro"
                        name="logradouro"
                        value={fornecedor.endereco.logradouro}
                        onChange={e => setFornecedor({
                            ...fornecedor,
                            endereco: { ...fornecedor.endereco, logradouro: e.target.value }
                        })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="numero">Número</label>
                    <input
                        type="text"
                        className="form-control"
                        id="numero"
                        name="numero"
                        value={fornecedor.endereco.numero}
                        onChange={e => setFornecedor({
                            ...fornecedor,
                            endereco: { ...fornecedor.endereco, numero: e.target.value }
                        })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="complemento">Complemento</label>
                    <input
                        type="text"
                        className="form-control"
                        id="complemento"
                        name="complemento"
                        value={fornecedor.endereco.complemento}
                        onChange={e => setFornecedor({
                            ...fornecedor,
                            endereco: { ...fornecedor.endereco, complemento: e.target.value }
                        })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="bairro">Bairro</label>
                    <input
                        type="text"
                        className="form-control"
                        id="bairro"
                        name="bairro"
                        value={fornecedor.endereco.bairro}
                        onChange={e => setFornecedor({
                            ...fornecedor,
                            endereco: { ...fornecedor.endereco, bairro: e.target.value }
                        })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cidade">Cidade</label>
                    <input
                        type="text"
                        className="form-control"
                        id="cidade"
                        name="cidade"
                        value={fornecedor.endereco.cidade}
                        onChange={e => setFornecedor({
                            ...fornecedor,
                            endereco: { ...fornecedor.endereco, cidade: e.target.value }
                        })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="estado">Estado</label>
                    <input
                        type="text"
                        className="form-control"
                        id="estado"
                        name="estado"
                        value={fornecedor.endereco.estado}
                        onChange={e => setFornecedor({
                            ...fornecedor,
                            endereco: { ...fornecedor.endereco, estado: e.target.value }
                        })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="pais">País</label>
                    <input
                        type="text"
                        className="form-control"
                        id="pais"
                        name="pais"
                        value={fornecedor.endereco.pais}
                        onChange={e => setFornecedor({
                            ...fornecedor,
                            endereco: { ...fornecedor.endereco, pais: e.target.value }
                        })}
                        required
                    />
                </div>

                <button type="submit" className="btn-success">
                    {id ? 'Editar' : 'Adicionar'}
                </button>
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
                    <h2>{id ? 'Fornecedor atualizado com sucesso!' : 'Fornecedor adicionado com sucesso!'}</h2>

                    <div className="modalButtons">
                        <button onClick={fecharModal} className="btn-success">Fechar</button>
                        {!id && <button onClick={adicionarOutroFornecedor} className="btn-secondary">Adicionar outro fornecedor</button>}
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
                    <br/>
                    <button onClick={fecharModalErro} className="btn-secondary">Fechar</button>
                </div>
            </Modal>
        </div>
    )
}

export default FornecedorForm