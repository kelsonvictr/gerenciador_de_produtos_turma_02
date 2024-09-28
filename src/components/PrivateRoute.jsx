import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token')

  if (!token) {
    console.log("Token não encontrado, redirecionando para login")
    return <Navigate to="/login" />
  }

  return children
}

export default PrivateRoute
