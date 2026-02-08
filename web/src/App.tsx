import React, { useState } from 'react'
import Calendar from './Calendar'
import ProductRegister from './ProductRegister'
import './App.css'

function App() {
  const [activeMenu, setActiveMenu] = useState('home')

  return (
    <div className="app">
      <header>
        <h1>Simple ERP Diary</h1>
      </header>
      <nav className="menu">
        <button 
          className={`menu-item ${activeMenu === 'home' ? 'active' : ''}`}
          onClick={() => setActiveMenu('home')}
        >
          홈
        </button>
        <button 
          className={`menu-item ${activeMenu === 'product' ? 'active' : ''}`}
          onClick={() => setActiveMenu('product')}
        >
          상품등록
        </button>
        <button 
          className={`menu-item ${activeMenu === 'inventory' ? 'active' : ''}`}
          onClick={() => setActiveMenu('inventory')}
        >
          재고등록
        </button>
      </nav>
      <main>
        {activeMenu === 'home' && <Calendar />}
        {activeMenu === 'product' && <ProductRegister />}
        {activeMenu === 'inventory' && <div><h2>재고등록</h2><p>상품의 재고를 등록하세요.</p></div>}
      </main>
    </div>
  )
}

export default App
