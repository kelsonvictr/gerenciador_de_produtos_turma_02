import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FornecedorList from './pages/Fornecedor/FornecedorList'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FornecedorList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App