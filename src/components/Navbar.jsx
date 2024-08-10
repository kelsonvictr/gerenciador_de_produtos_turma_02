import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {

  const location = useLocation()

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

    </nav>
  )
}

export default Navbar