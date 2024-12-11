import React, { useState } from 'react';
import '../app.css';

function Score({ username }) {
  const [currentScore, setCurrentScore] = useState(null);
  const token = localStorage.getItem('token');

  fetch(`/api/score/current?token=${token}`)
  .then(res => res.json())
  .then(data => {
    if (data && data.currentScore != null) {
      setCurrentScore(data.currentScore);
    }
  });

  if (!username || !token) {
    return <p>Please <a href="/">login</a> to view scores.</p>;
  }

  function handleLogout() {
    fetch('/api/auth/logout', {
      method: 'DELETE',
    })
      .catch(() => {
      })
      .finally(() => {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        setRedirectToLogin(true);
      });
  }
  
  return (
    <section>
      <h2>User Scores & Leaderboard</h2>
      <p>Logged in as: {username}</p>
      <h3>Your Final Score: {currentScore !== null ? currentScore : 'Loading...'}</h3>
      <p>Designed for login and WebSockets</p>
      <button onClick={handleLogout} >Logout</button>
    </section>
  );
}

export default Score;
