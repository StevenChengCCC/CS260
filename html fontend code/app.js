import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './header';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Score from './pages/Score';
import About from './pages/About';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/score" element={<Score />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
