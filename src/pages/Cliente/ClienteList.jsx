import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../api'
import { FaPlus, FaEdit, FaTrash, FaExclamationTriangle, FaCheckCircle, FaQuestionCircle } from 'react-icons/fa'
import Modal from 'react-modal'

const ClienteList = () => {
    const [clientes, setClientes] = useState([])
    const [modalAberto, setModalAberto] = useState(false)
    const [modalSucessoAberto, setModalSucessoAberto] = useState(false)
    const [clienteSelecionado, setClienteSelecionado] = useState(null)
    const [tooltipAberto, setTooltipAberto] = useState(false)
    const [tooltipAcoesAberto, setTooltipAcoesAberto] = useState(false)

    useEffect(() => {
        axios.get('/clientes')
            .then(response => setClientes(response.data))
            .catch(error => console.error("Ocorreu um erro: ", error))
    }, [])

    const abrirModal = (cliente) => {
        setClienteSelecionado(cliente)
        setModalAberto(true)
    }

    const fecharModal = () => {
        setModalAberto(false)
        setClienteSelecionado(null)
    }

    const abrirModalSucesso = () => {
        setModalSucessoAberto(true)
        setTimeout(() => setModalSucessoAberto(false), 2000)
    }

    const removerCliente = () => {
        axios.delete(`/clientes/${clienteSelecionado.id}`)
            .then(() => {
                setClientes(prev => prev.filter(cliente => cliente.id !== clienteSelecionado.id))
                fecharModal()
                abrirModalSucesso()
            })
            .catch(error => {
                console.error("Ocorreu um erro: ", error)
                fecharModal()
            })
    }

    const toggleTooltip = () => {
        setTooltipAberto(!tooltipAberto)
    }

    const toggleTooltipAcoes = () => {
        setTooltipAcoesAberto(!tooltipAcoesAberto)
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4" style={{ position: 'relative' }}>
                Lista de Clientes{' '}
                <FaQuestionCircle
                    className="tooltip-icon"
                    onClick={toggleTooltip}
                />
                {tooltipAberto && (
                    <div className="tooltip">
                        Aqui você pode ver, editar ou excluir clientes cadastrados no sistema.
                    </div>
                )}
            </h2>
            <Link to="/add-clientes" className="btn btn-primary mb-2">
                <FaPlus className="icon" /> Adicionar Cliente
            </Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nome:</th>
                        <th>CPF:</th>
                        <th>Email:</th>
                        <th>
                            Ações{' '}
                            <FaQuestionCircle
                                className="tooltip-icon"
                                onClick={toggleTooltipAcoes}
                            />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tooltipAcoesAberto && (
                        <div className="tooltip">
                            Aqui você pode editar ou excluir um cliente.
                        </div>
                    )}
                    {clientes.map(cliente => (
                        <tr key={cliente.id}>
                            <td>{cliente.nome}</td>
                            <td>{cliente.cpf}</td>
                            <td>{cliente.email}</td>
                            <td>
                                <Link to={`/edit-clientes/${cliente.id}`} className="btn btn-sm btn-warning">
                                    <FaEdit className="icon icon-btn" /> Editar
                                </Link>
                                <button onClick={() => abrirModal(cliente)} className="btn btn-sm btn-danger">
                                    <FaTrash className="icon icon-btn" /> Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal
                isOpen={modalAberto}
                onRequestClose={fecharModal}
                className="modal"
                overlayClassName="overlay"
            >
                <div className="modalContent">
                    <FaExclamationTriangle className="icon" />
                    <h2>Confirmar Exclusão</h2>
                    <p>Tem certeza que deseja excluir o cliente {clienteSelecionado && clienteSelecionado.nome}?</p>
                    <div className="modalButtons">
                        <button onClick={fecharModal} className="btn btn-secondary">Cancelar</button>
                        <button onClick={removerCliente} className="btn btn-danger">Excluir</button>
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={modalSucessoAberto}
                onRequestClose={() => setModalSucessoAberto(false)}
                className="modal"
                overlayClassName="overlay"
            >
                <div className="modalContent">
                    <FaCheckCircle className="icon successIcon" />
                    <h2>Cliente excluído com sucesso!</h2>
                </div>
            </Modal>
        </div>
    )
}

export default ClienteList
