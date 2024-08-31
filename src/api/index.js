import axios from "axios"

const instance = axios.create({
    baseURL: 'http://localhost:8080'  // Atualize para o backend real
})

export default instance
