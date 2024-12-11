import React, { useState, useEffect } from 'react';
import '../app.css';

function Score({ username }) {
  const [currentScore, setCurrentScore] = useState(null);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  // Fetch current score from DB
  useEffect(() => {
    fetch('/api/score/current', {
      credentials: 'include' // Ensure cookies are sent
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
        }
      })
      .catch(() => {
        setRedirectToLogin(true);
      });
  }, []);

  if (redirectToLogin) {
    return <p>Please <a href="/">login</a> to view scores.</p>;
  }

  function handleLogout() {
    fetch('/api/auth/logout', {
      method: 'DELETE',
      credentials: 'include'
    })
    .finally(() => {
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
          // Account deleted successfully, redirect to login
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
      <h3>Your Final Score: {currentScore !== null ? currentScore : 'Loading...'}</h3>
      <p>Designed for login and WebSockets</p>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleDeleteAccount}>Delete Account</button>
    </section>
  );
}

export default Score;
