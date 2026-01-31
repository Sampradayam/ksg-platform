import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './MainLayout.css'

const MainLayout = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      <main className="layout-content">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
