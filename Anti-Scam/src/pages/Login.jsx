import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import '../app.css';

  
function Login({ setUsername, setPassword, setScore }) {
  const [localUsername, setLocalUsername] = useState('');
  const [localPassword, setLocalPassword] = useState('');
  const [createUserUsername, setCreateUserUsername] = useState('');
  const [createUserPassword, setCreateUserPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [displayError, setDisplayError] = useState('');
  const [displaySuccess, setDisplaySuccess] = useState('');
  const [activeForm, setActiveForm] = useState('login');

  function loginOrCreate(endpoint, username, password) {
    setDisplayError('');
    setDisplaySuccess('');

    fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
    })
    .then(response => response.json().then(body => ({ response, body })))
    .then(({ response, body }) => {
      if (response.ok) {
        const token = body.token;
        if (endpoint.includes('create')) {
          setDisplaySuccess('🎉 User created successfully! Logging you in...');
        }

        // Reset score after successful login or account creation
        setUsername(username);
        setPassword(password);
        setScore(0); 
        localStorage.setItem('username', username);
        localStorage.setItem('token', token);
        setRedirect(true);
      } else {
        setDisplayError(`⚠ ${body.msg}`);
      }
    })
    .catch(err => {
      setDisplayError(`⚠ Network error: ${err.message}`);
    });
  }


  async function handleLogin(e) {
    e.preventDefault();
    if (!localUsername || !localPassword) {
      setDisplayError('⚠ Please fill in both fields.');
      return;
    }
    await loginOrCreate('/api/auth/login', localUsername, localPassword);
  }

  async function handleCreateAccount(e) {
    e.preventDefault();
    if (!createUserUsername || !createUserPassword) {
      setDisplayError('⚠ Please fill in both fields.');
      return;
    }
    await loginOrCreate('/api/auth/create', createUserUsername, createUserPassword);
  }

  if (redirect) {
    return <Navigate to="/quiz" />;
  }

  return (
    <section>
      <h2>Welcome!</h2>
      <p>
        Once you log in or create an account, you will be able to take a quiz 
        to test your anti-fraud awareness, see your scores, and learn more about how to avoid scams.
      </p>
      
      {displayError && <p className="error">{displayError}</p>}
      {displaySuccess && <p className="success">{displaySuccess}</p>}

      <div className="form-toggle">
        {activeForm !== 'login' && (
          <p>
            Already have an account? <button onClick={() => setActiveForm('login')}>Login Here</button>
          </p>
        )}
        {activeForm !== 'signup' && (
          <p>
            Don't have an account? <button onClick={() => setActiveForm('signup')}>Sign Up Here</button>
          </p>
        )}
      </div>

      {activeForm === 'login' && (
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
      )}

      {activeForm === 'signup' && (
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
      )}
    </section>
  );
}
export default Login;
