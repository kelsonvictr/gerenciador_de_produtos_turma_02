import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FornecedorList from './pages/Fornecedor/FornecedorList'
import Navbar from './components/Navbar'
import FornecedorForm from './pages/Fornecedor/FornecedorForm'
import ProdutoList from './pages/Produto/ProdutoList'
import ProdutoForm from './pages/Produto/ProdutoForm'
import Inicial from './pages/Inicial'
import ClienteList from './pages/Cliente/ClienteList'
import ClienteForm from './pages/Cliente/ClienteForm'
import LoginPage from './pages/Auth/LoginPage'
import RegisterPage from './pages/Auth/RegisterPage'
import PrivateRoute from './components/PrivateRoute'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Rotas Privadas */}
          <Route path="/" element={<PrivateRoute><Inicial /></PrivateRoute>} />
          <Route path="/listar-fornecedores" element={<PrivateRoute><FornecedorList /></PrivateRoute>} />
          <Route path="/add-fornecedores" element={<PrivateRoute><FornecedorForm /></PrivateRoute>} />
          <Route path="/edit-fornecedores/:id" element={<PrivateRoute><FornecedorForm /></PrivateRoute>} />
          <Route path="/listar-produtos" element={<PrivateRoute><ProdutoList /></PrivateRoute>} />
          <Route path="/edit-produtos/:id" element={<PrivateRoute><ProdutoForm /></PrivateRoute>} />
          <Route path="/add-produtos" element={<PrivateRoute><ProdutoForm /></PrivateRoute>} />
          <Route path="/add-clientes" element={<PrivateRoute><ClienteForm /></PrivateRoute>} />
          <Route path="/listar-clientes" element={<PrivateRoute><ClienteList /></PrivateRoute>} />
          <Route path="/edit-clientes/:id" element={<PrivateRoute><ClienteForm /></PrivateRoute>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
