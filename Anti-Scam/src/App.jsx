import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Quiz from './pages/Quiz.jsx'
import Score from './pages/Score.jsx'
import About from './pages/About.jsx'
import './app.css' 

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [score, setScore] = useState(0)

  return (
    <BrowserRouter>
      <header>
        <nav>
          <ul>
            <li><Link to="/">Home (Login)</Link></li>
            <li><Link to="/quiz">Quiz</Link></li>
            <li><Link to="/score">Scores</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </nav>
        <h1>Anti-Scam Awareness</h1>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Login username={username} password={password} setUsername={setUsername} setPassword={setPassword} setScore={setScore} />} />
          <Route path="/quiz" element={<Quiz username={username} score={score} setScore={setScore} />} />
          <Route path="/score" element={<Score username={username} score={score} setScore={setScore} />} />
          <Route path="/about" element={<About />} />
          <Route path="/*"  element={<NotFound />} />
        </Routes>
      </main>

      <footer>
        <p>© 2024 Anti-Scam Awareness</p>
        <p><a href="https://github.com/StevenChengCCC/CS260">Our GitHub Repository</a></p>
      </footer>
    </BrowserRouter>
  )
}

function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}

export default App;