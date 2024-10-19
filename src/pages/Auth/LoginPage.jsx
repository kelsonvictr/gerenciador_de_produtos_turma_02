import React, { useState } from 'react'
import axios from '../../api'
import { useNavigate } from 'react-router-dom'
import styles from './LoginPage.module.css'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('/auth/signin', {
        email,
        senha
      })

      localStorage.setItem('token', response.data.token)
      navigate('/')
    } catch (error) {
      setErrorMessage('Email ou senha incorretos. Tente novamente.')
    }
  }

  return (
    <div className={styles['login-container']}>
      <div className={styles['login-card']}>
      <img src="/PRODUCT-manager-logo.png" alt="Logo do Sistema" className="logo-img" />
        <h2 className={styles.title}>Login</h2>
        {errorMessage && <div className={styles['error-message']}>{errorMessage}</div>}
        <form onSubmit={handleLogin} className={styles['login-form']}>
          <div className={styles['form-group']}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              className={styles['form-control']}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="senha" className={styles.label}>Senha</label>
            <input
              type="password"
              id="senha"
              className={styles['form-control']}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles['btn-success']}>Entrar</button>
        </form>
        <p className={styles['register-link']}>
          Não possui uma conta? <a href="/register">Registre-se</a>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
