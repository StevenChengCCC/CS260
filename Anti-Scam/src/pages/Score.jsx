import React, { useState, useEffect } from 'react';
import '../app.css';
import { Navigate } from 'react-router-dom';

function Score({ username }) {
  const [currentScore, setCurrentScore] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [notification, setNotification] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const ws = new WebSocket(`${protocol}://${window.location.host}/ws`);
    setSocket(ws);

    ws.onopen = () => {
      console.log('WebSocket connection established.');
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'leaderboard') {
        setLeaderboard(message.data);
      } else if (message.type === 'scoreSubmitted') {
        setNotification({
          user: message.user,
          score: message.score,
        });
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed.');
    };
    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    fetchCurrentScore();
    fetchLeaderboard();
  }, []);

  const fetchCurrentScore = () => {
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
  };

  const fetchLeaderboard = () => {
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
  };

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

      {notification && (
        <div className="notification">
          {notification.user} has submitted a new score of {notification.score}! Check the leaderboard.
        </div>
      )}
    </section>
  );
}

export default Score;
