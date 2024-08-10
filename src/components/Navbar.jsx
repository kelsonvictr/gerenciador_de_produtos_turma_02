import React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

const Navbar = () => {

  const [dropDownAberto, setDropDownAberto] = useState(false)
  const location = useLocation()

  const toggleDropdown = () => {
    setDropDownAberto(!dropDownAberto)
  }

  const isActive = (path) => {
    return location.pathname === path ? 'active' : ''
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
          <FaUserCircle className="avatar-icon" onClick={toggleDropdown} />
          {dropDownAberto && (
            <div className="dropdown-menu">
              <Link to="/meu-usuario">Meu usuário</Link>
              <Link to="/sair">Sair</Link>
            </div>
          ) }

        </div>

    </nav>
  )
}

export default Navbar