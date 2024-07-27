import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FornecedorList from './pages/Fornecedor/FornecedorList'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <BrowserRouter>
    <Navbar />
    <div className="container">
    <Routes>
        <Route path="/" element={<FornecedorList />} />
        <Route path="/listar-fornecedores" element={<FornecedorList />} />
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App