import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import '../app.css';

function Login({ setUsername, setPassword }) {
  const [localUsername, setLocalUsername] = useState('');
  const [localPassword, setLocalPassword] = useState('');
  const [createUserUsername, setCreateUserUsername] = useState('');
  const [createUserPassword, setCreateUserPassword] = useState('');
  const [updatePasswordUsername, setUpdatePasswordUsername] = useState('');
  const [updatePasswordNewPassword, setUpdatePasswordNewPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [displayError, setDisplayError] = useState('');
  const [displaySuccess, setDisplaySuccess] = useState('');
  
  // activeForm can be: 'login', 'signup', or 'updatePassword'
  const [activeForm, setActiveForm] = useState('login');

  async function loginOrCreate(endpoint, username, password) {
    setDisplayError('');
    setDisplaySuccess('');
    const response = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
    });

    if (response.status === 200) {
      const data = await response.json();
      const token = data.token;
      localStorage.setItem('username', username);
      localStorage.setItem('token', token);
      setUsername(username);
      setPassword(password);
      setRedirect(true);
    } else {
      const body = await response.json();
      setDisplayError(`⚠ Error: ${body.msg}`);
    }
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

  async function handleUpdatePassword(e) {
    e.preventDefault();
    setDisplayError('');
    setDisplaySuccess('');

    if (!updatePasswordUsername || !updatePasswordNewPassword) {
      setDisplayError('⚠ Please provide username and new password.');
      return;
    }

    // For changing password, user must be logged in or we modify the endpoint to accept credentials.
    // If the endpoint requires authentication, you may need the user to login first. 
    // If it's open (just for demonstration), this will try to update.
    const response = await fetch('/api/user/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
      body: JSON.stringify({ newPassword: updatePasswordNewPassword })
    });

    if (response.status === 200) {
      setDisplaySuccess('✅ Password updated successfully! Please log in with your new password.');
      // Optionally, you can clear fields or switch back to login form
      setUpdatePasswordUsername('');
      setUpdatePasswordNewPassword('');
      // Switch back to login form so user can log in with new password.
      setActiveForm('login');
    } else {
      const body = await response.json();
      setDisplayError(`⚠ Error updating password: ${body.msg}`);
    }
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
        {activeForm !== 'updatePassword' && (
          <p>
            Forgot your password? <button onClick={() => setActiveForm('updatePassword')}>Change it here</button>
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

      {activeForm === 'updatePassword' && (
        <form onSubmit={handleUpdatePassword}>
          <h3>Change Your Password</h3>
          <p>Make sure you're logged in or have a valid session if needed.</p>
          <label htmlFor="update-username">Username:</label>
          <input
            type="text"
            id="update-username"
            value={updatePasswordUsername}
            onChange={(e) => setUpdatePasswordUsername(e.target.value)}
            placeholder="Enter your username"
          />
          <label htmlFor="update-new-password">New Password:</label>
          <input
            type="password"
            id="update-new-password"
            value={updatePasswordNewPassword}
            onChange={(e) => setUpdatePasswordNewPassword(e.target.value)}
            placeholder="Enter new password"
          />
          <button type="submit">Update Password</button>
        </form>
      )}
    </section>
  );
}

export default Login;
