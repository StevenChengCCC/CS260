import React, { useState, useEffect } from 'react';
import '../app.css';
import { Navigate } from 'react-router-dom';

function Score({ username }) {
  const [currentScore, setCurrentScore] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [userStatusMessage, setUserStatusMessage] = useState(null);

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

    // Fetch initial leaderboard
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

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//localhost:4000/`; 
    const ws = new WebSocket(wsUrl);
    var username=localStorage.getItem('username');

    ws.onopen = () => {
      console.log('WebSocket connection established.');
      const msg = {
        type: "user_login",
        username: username
      };
      ws.send(JSON.stringify(msg));
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      console.log(msg);
      if (msg.type === 'scoreboard') {
        // setLeaderboard(msg.scores || []);
      } else if (msg.type === 'user_status') {
        console.log(msg);
        const joinedUser = msg.username;
        setUserStatusMessage(`${joinedUser} joined the quiz.`);
        setTimeout(() => {
          setUserStatusMessage(null);
        }, 5000);
      }else{
        console.log(msg);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed.');
    };

    return () => {
      ws.close();
    };
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
      <h2>User Scores &amp; Leaderboard</h2>
      <p>Logged in as: {username}</p>
      <h3>Your Highest: {currentScore !== null ? currentScore : 'Loading...'}</h3>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleDeleteAccount}>Delete Account</button>

      {userStatusMessage && <div className="user-status">{userStatusMessage}</div>}

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