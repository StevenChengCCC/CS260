import React from 'react'
import './score.css'

function Score({ username, score }) {
  if (!username) {
    return <p>Please <a href="/">login</a> to view scores.</p>
  }

  return (
    <section>
      <h2>User Scores & Leaderboard</h2>
      <p>Logged in as: {username}</p>
      <h3>Your Final Score: {score}</h3>
      <p>Designed for login and WebSockets</p>
    </section>
  )
}

export default Score
