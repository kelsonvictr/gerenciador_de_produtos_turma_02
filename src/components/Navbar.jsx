import React, { useEffect, useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import axios from '../api'

const Navbar = () => {
  const [dropDownAberto, setDropDownAberto] = useState(false)
  const [usuarioLogado, setUsuarioLogado] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      axios.get('/users/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          setUsuarioLogado(response.data)
        })
        .catch(error => {
          console.error('Erro ao buscar dados do usuário logado:', error)
        })
    }
  }, [])

  const toggleDropdown = () => {
    setDropDownAberto(!dropDownAberto)
  }

  const isActive = (path) => {
    return location.pathname === path ? 'active' : ''
  }

  if (!localStorage.getItem('token')) {
    // Não renderiza o Navbar se não houver um token
    return null
  }

  return (
    <nav className="menu">
      <div className="logo-container">
        <Link to="/">
          <img src="/PRODUCT-manager-logo.png" alt="Logo do Sistema" className="logo-img" />
        </Link>
      </div>
      <div className="menu-links">
        <Link to="/" className={isActive('/')}>Inicial</Link>
        <Link to="/add-fornecedores" className={isActive('/add-fornecedores')}>Adicionar Fornecedor</Link>
        <Link to="/listar-fornecedores" className={isActive('/listar-fornecedores')}>Listar Fornecedores</Link>
        <Link to="/add-produtos" className={isActive('/add-produtos')}>Adicionar Produto</Link>
        <Link to="/listar-produtos" className={isActive('/listar-produtos')}>Listar Produtos</Link>
        <Link to="/add-clientes" className={isActive('/add-clientes')}>Adicionar Cliente</Link>
        <Link to="/listar-clientes" className={isActive('/listar-clientes')}>Listar Clientes</Link>
      </div>
      <div className="avatar-container">
        <div className="avatar-info" onClick={toggleDropdown}>
          <FaUserCircle className="avatar-icon" />
          {usuarioLogado && (
            <span className="logged-user-email">{usuarioLogado.email}</span>
          )}
        </div>
        {dropDownAberto && (
          <div className="dropdown-menu">
            <Link to="/alterar-senha">Alterar Senha</Link>
            <Link to="/login" onClick={() => localStorage.removeItem('token')}>Sair</Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar