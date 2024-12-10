import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import '../app.css';

function Quiz({ username, score, setScore }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const token = localStorage.getItem('token');
  
  const questions = [
    {
      question: "Which of the following is a common sign of a phishing email?",
      options: ["Suspicious links and requests for personal info.", "Proper spelling and grammar throughout.", "Email only from known contacts."],
      correct: 0
    },
    {
      question: "To protect your password, you should:",
      options: ["Write it on a sticky note under your keyboard.", "Use a unique, strong password for each account.", "Share it with friends you trust."],
      correct: 1
    },
    {
      question: "What if someone sends you a random link?",
      options: ["Click it in the app you received the link.", "Ignore it.", "Open it in google chrome"],
      correct: 1
    },
    {
      question: "What should you do when someone sends you a STEAM message, and they want you to click a link to vote for their team?",
      options: ["accept the offer, and click the link", "Buy them a gift card.", "block them, and decline the offer"],
      correct: 2
    },
    {
      question: "What should you do if someone claims that they are Shanghai entry-exit Administration Bureau, and tells you that you can't go back to your country?",
      options: ["I don't want go back", "Be worried, and give them your credit card information.", "Hang up the phone,  because Shanghai entry-exit Administration Bureau would never call you even you are Chinese citizen."],
      correct: 2
    },
    {
      question: "when you receive a suspicious call, and just ask 'are you (your name)?'",
      options: ["I am (your name)", "check the phone number, see if the number belongs to any institutions.", "No that is not me, my name is your favorite professor's name", "give them your SSN"],
      correct: 1
    },
    {
      question: "what should you do when you found a website that your browser says it is high risk website?",
      options: ["keep using it.", "click the subscribe button, and provide your bank info", "close the website immediately"],
      correct: 2
    },
    {
      question: "Real institutions will never call to ask you for which of the following?",
      options: ["Credit Card numbers", "Date of Birth", "Social Security Number", "Passwords", "All of the above"],
      correct: 4
    }
  ]

  // If user is did not logged in (add token to it)
  if (!username || !token) {
    return <p>Please <a href="/">login</a> first.</p>;
  }
  function handleAnswer(index) {
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    const nextQ = currentQuestion + 1; //get one points
    if (nextQ < questions.length) {
      setCurrentQuestion(nextQ); //nextquestion
    } else {
      // finished quiz
      setQuizDone(true);
    }
  }
//send score to restore in local storage
  async function submitScore() {
    const response = await fetch('/score/currentscore', {
      method: 'POST',
      body: JSON.stringify({ token, score }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });
    if (response?.status === 200) {
    } else {
      const body = await response.json();
      setErrorMsg(`⚠ Error submitting score: ${body.msg}`);
    }
  }
//after quiz is done take user to score page
  useEffect(() => {
    if (quizDone) {
      submitScore();
    }
  }, [quizDone]);

  if (quizDone) {
    return <Navigate to="/score" />;
  }
// add a log out function
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
// if login failed take back
  if (redirectToLogin) {
    return <Navigate to="/" />;
  }

  const q = questions[currentQuestion];
// add a log out function
  return (
    <section id="quiz-questions">
      {errorMsg && <p className="error">{errorMsg}</p>}
      <p>
        Current Score: {score} 
        <button onClick={handleLogout}>Logout</button>
      </p> 
      <h2>Anti-Scam Awareness Quiz</h2>
      <p>Logged in as: {username}</p>
      <h3>Question {currentQuestion + 1}: {q.question}</h3>
      <ul>
        {q.options.map((opt, idx) => (
          <li key={idx}>
            <button onClick={() => handleAnswer(idx)}>{opt}</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Quiz
