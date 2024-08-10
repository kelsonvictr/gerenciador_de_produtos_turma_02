import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FornecedorList from './pages/Fornecedor/FornecedorList'
import Navbar from './components/Navbar'
import FornecedorForm from './pages/Fornecedor/FornecedorForm'
import ProdutoList from './pages/Produto/ProdutoList'
import ProdutoForm from './pages/Produto/ProdutoForm'

const App = () => {
  return (
    <BrowserRouter>
    <Navbar />
    <div className="container">
    <Routes>
        <Route path="/" element={<FornecedorList />} />
        <Route path="/listar-fornecedores" element={<FornecedorList />} />
        <Route path="/add-fornecedores" element={<FornecedorForm />} />
        <Route path="/edit-fornecedores/:id" element={<FornecedorForm />} />
        <Route path="/listar-produtos" element={<ProdutoList />} />
        <Route path="/add-produtos" element={<ProdutoForm />} />
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App