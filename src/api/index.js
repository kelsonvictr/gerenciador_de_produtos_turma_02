import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const instance = axios.create({
    baseURL: 'http://localhost:8080'
})

// Adiciona o token em cada requisição, se ele estiver presente
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Redireciona para o login se receber um 403
instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 403) {
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

export default instance
