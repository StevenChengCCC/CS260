import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import '../app.css';

function Login({ setUsername, setPassword }) {
  const [localUsername, setLocalUsername] = useState('');
  const [localPassword, setLocalPassword] = useState('');
  const [createUserUsername, setCreateUserUsername] = useState('');
  const [createUserPassword, setCreateUserPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [displayError, setDisplayError] = useState('');

  function loginOrCreate(endpoint, username, password) {
    return fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    })
    .then(response => {
      if (response && response.status === 200) {
        return response.json();
      } else {
        return response.json().then(body => {
          setDisplayError(`⚠ Error: ${body.msg}`);
          throw new Error(body.msg);
        });
      }
    })
    .then(data => {
      const token = data.token;
      if (token) {
        localStorage.setItem('username', username);
        localStorage.setItem('token', token);
        setUsername(username);
        setPassword(password);
        setRedirect(true);
      }
    });
  }

  function handleLogin(e) {
    e.preventDefault();
    loginOrCreate('/api/auth/login', localUsername, localPassword);
  }

  function handleCreateAccount(e) {
    e.preventDefault();
    loginOrCreate('/api/auth/create', createUserUsername, createUserPassword);
  }

  if (redirect) {
    return <Navigate to="/quiz" />;
  }

  return (
    <section>
      <h2>Login or Create an Account</h2>
      {displayError && <p className="error">{displayError}</p>}

      <div>
        <form onSubmit={handleLogin}>
          <h3>Login</h3>
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

        <form onSubmit={handleCreateAccount}>
          <h3>Create Account</h3>
          <label htmlFor="new-username">Username:</label>
          <input 
            type="text" 
            id="new-username" 
            value={createUserUsername} 
            onChange={(e) => setCreateUserUsername(e.target.value)} 
            placeholder="Enter new username"
          />

          <label htmlFor="new-password">Password:</label>
          <input 
            type="password" 
            id="new-password" 
            value={createUserPassword} 
            onChange={(e) => setCreateUserPassword(e.target.value)} 
            placeholder="Enter new password"
          />

          <button type="submit">Create Account</button>
        </form>
      </div>

      <section id="welcome-section">
        <h2>Welcome!</h2>
        <p>Once you log in or create an account, you will be able to take a quiz to test your anti-fraud awareness, see your scores, and learn more about how to avoid scams.</p>
      </section>
    </section>
  );
}

export default Login;
