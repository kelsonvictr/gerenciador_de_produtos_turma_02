import React from 'react'
import { Link } from 'react-router-dom'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import '../index.css'

// npm install react-chartjs-2 chart.js

// Registrar componentes do ChartJS
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const Inicial = () => {
  // Dados para o gráfico de vendas
  const vendasData = {
    labels: ['Maio', 'Junho', 'Julho'],
    datasets: [
      {
        label: 'Quantidade de Vendas',
        data: [30, 45, 60], // Dados aleatórios
        backgroundColor: '#fd7e14',
      },
    ],
  }

  // Dados para o gráfico de novos clientes
  const clientesData = {
    labels: ['Maio', 'Junho', 'Julho'],
    datasets: [
      {
        label: 'Novos Clientes',
        data: [20, 35, 50], // Dados aleatórios
        backgroundColor: '#28a745',
      },
    ],
  }

  return (
    <div className="inicial-container">
      <Link to="/listar-fornecedores" className="stat-box stat-box-blue">
        <h3>Fornecedores</h3>
        <p>16</p>
      </Link>
      <Link to="/listar-clientes" className="stat-box stat-box-green">
        <h3>Clientes</h3>
        <p>80</p>
      </Link>
      <Link to="/listar-produtos" className="stat-box stat-box-orange">
        <h3>Produtos</h3>
        <p>50</p>
      </Link>
      <div className="charts-container">
        <div className="chart">
          <h3>Vendas de Produtos (Últimos 3 meses)</h3>
          <Bar data={vendasData} />
        </div>
        <div className="chart">
          <h3>Novos Clientes (Últimos 3 meses)</h3>
          <Bar data={clientesData} />
        </div>
      </div>
    </div>
  )
}

export default Inicial
