import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import myImage from './logo.png'
import '../app.css'

function Login({ username, password, setUsername, setPassword }) {
  const [localUsername, setLocalUsername] = useState('')
  const [localPassword, setLocalPassword] = useState('')
  const [redirect, setRedirect] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    setUsername(localUsername)
    setPassword(localPassword)
    setRedirect(true)
  }

  if (redirect) {
    return <Navigate to="/quiz" />
  }

  return (
    <section>
      <h2>Login or Create an Account</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username:</label>
        <input 
          type="text" 
          id="username" 
          value={localUsername} 
          onChange={(e) => setLocalUsername(e.target.value)} 
          placeholder="Enter username" 
        />

        <label htmlFor="password">Password:</label>
        <input 
          type="password" 
          id="password" 
          value={localPassword} 
          onChange={(e) => setLocalPassword(e.target.value)} 
          placeholder="Enter password" 
        />

        <button type="submit">Login</button>
      </form>

      <section id="welcome-section">
        <h2>Welcome!</h2>
        <p>Once you log in, you will be able to take a quiz to test your anti-fraud awareness, see your scores, and learn more about how to avoid scams.</p>
      </section>
    </section>
  )
}

export default Login
