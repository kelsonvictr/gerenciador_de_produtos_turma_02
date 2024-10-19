import React, { useState } from 'react'
import axios from '../../api'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {
  const [nomeCompleto, setNomeCompleto] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [passwordMismatch, setPasswordMismatch] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async (event) => {
    event.preventDefault()
    setPasswordMismatch(false)
    setErrorMessage('')

    if (senha !== confirmarSenha) {
      setPasswordMismatch(true)
      return
    }

    try {
      await axios.post('/auth/signup', {
        nomeCompleto,
        cpf,
        email,
        senha
      })

      // Redireciona para a página de login após o registro bem-sucedido
      navigate('/login')
    } catch (error) {
      setErrorMessage('Erro ao registrar. Verifique os campos e tente novamente.')
    }
  }

  return (
    <div className="form-container register-container">
      <h2>Registro</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleRegister} className="register-form">
        <div className="form-group">
          <label htmlFor="nomeCompleto">Nome Completo</label>
          <input
            type="text"
            id="nomeCompleto"
            className="form-control"
            value={nomeCompleto}
            onChange={(e) => setNomeCompleto(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpf">CPF</label>
          <input
            type="text"
            id="cpf"
            className="form-control"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            className="form-control"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmarSenha">Confirmar Senha</label>
          <input
            type="password"
            id="confirmarSenha"
            className="form-control"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
          />
        </div>
        {passwordMismatch && (
          <div className="error-message">As senhas não conferem. Tente novamente.</div>
        )}
        <button type="submit" className="btn-success">Registrar</button>
      </form>
    </div>
  )
}

export default RegisterPage