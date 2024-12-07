import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header style={{ background: '#264653', color: '#f9f9f9', padding: '1rem' }}>
      <nav>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '1rem', padding: 0, margin: 0 }}>
          <li><Link to="/" style={{ color: '#f9f9f9', textDecoration: 'none' }}>Home</Link></li>
          <li><Link to="/quiz" style={{ color: '#f9f9f9', textDecoration: 'none' }}>Quiz</Link></li>
          <li><Link to="/score" style={{ color: '#f9f9f9', textDecoration: 'none' }}>Scores</Link></li>
          <li><Link to="/about" style={{ color: '#f9f9f9', textDecoration: 'none' }}>About</Link></li>
        </ul>
      </nav>
      <h1>Anti-Scam Awareness</h1>
    </header>
  )
}
