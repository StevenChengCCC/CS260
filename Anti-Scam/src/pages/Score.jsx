import React, { useState, useEffect } from 'react';
import '../app.css';
import { Navigate } from 'react-router-dom';

function Score({ username }) {
  const [currentScore, setCurrentScore] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  useEffect(() => {
    fetch('/api/score/current', {
      credentials: 'include' 
    })
      .then(res => {
        if (res.status === 401) {
          setRedirectToLogin(true);
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (data && data.currentScore != null) {
          setCurrentScore(data.currentScore);
        } else {
          setCurrentScore(0);
        }
      })
      .catch(() => {
        setRedirectToLogin(true);
      });

    // Fetch the top 10 scores
    fetch('/api/scores', {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => {
        if (res.status === 401) {
          setRedirectToLogin(true);
          return null;
        }
        return res.json();
      })
      .then(data => {
        setLeaderboard(data || []);
      })
      .catch(() => {
        setRedirectToLogin(true);
      });
  }, []);

  if (redirectToLogin) {
    return <Navigate to="/" />;
  }

  function handleLogout() {
    fetch('/api/auth/logout', {
      method: 'DELETE',
      credentials: 'include'
    })
    .finally(() => {
      localStorage.removeItem('username');
      localStorage.removeItem('token');
      setRedirectToLogin(true);
    });
  }
  
  function handleDeleteAccount() {
    fetch('/api/user/delete', {
      method: 'DELETE',
      credentials: 'include'
    })
      .then(res => {
        if (res.ok) {
          localStorage.removeItem('username');
          localStorage.removeItem('token');
          setRedirectToLogin(true);
        } else {
          console.error('Failed to delete account.');
        }
      })
      .catch(err => {
        console.error('Error deleting account:', err);
      });
  }
  
  return (
    <section>
      <h2>User Scores & Leaderboard</h2>
      <p>Logged in as: {username}</p>
      <h3>Your Highest: {currentScore !== null ? currentScore : 'Loading...'}</h3>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleDeleteAccount}>Delete Account</button>

      <h3>Leaderboard (Top 10)</h3>
      <ul>
        {leaderboard.map((entry, index) => (
          <li key={index}>
            {entry.username}: {entry.score}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Score;
