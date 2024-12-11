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
      question: "When you receive a suspicious call, and they just ask 'are you (your name)?'",
      options: ["I am (your name)", "Check the phone number to see if it belongs to any institution.", "No that is not me, my name is your favorite professor's name", "Give them your SSN"],
      correct: 1
    },
    {
      question: "What should you do when you find a website that your browser says is high risk?",
      options: ["Keep using it.", "Click the subscribe button and provide your bank info", "Close the website immediately"],
      correct: 2
    },
    {
      question: "Real institutions will never call to ask you for which of the following?",
      options: ["Credit Card numbers", "Date of Birth", "Social Security Number", "Passwords", "All of the above"],
      correct: 4
    }
  ];

  if (!username || !token) {
    return <p>Please <a href="/">login</a> first.</p>;
  }

  function handleAnswer(index) {
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    const nextQ = currentQuestion + 1;
    if (nextQ < questions.length) {
      setCurrentQuestion(nextQ);
    } else {
      setQuizDone(true);
    }
  }

  // Function to submit score to the database
  async function submitScore() {
    try {
      const response = await fetch('/api/score/currentscore', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({ score })
      });

      if (response.status !== 200) {
        const body = await response.json();
        setErrorMsg(`⚠ Error submitting score: ${body.msg}`);
      }
    } catch (err) {
      setErrorMsg(`⚠ Error submitting score: ${err.message}`);
    }
  }

  useEffect(() => {
    if (quizDone) {
      submitScore();
    }
  }, [quizDone]);

  if (quizDone) {
    return <Navigate to="/score" />;
  }

  function handleLogout() {
    fetch('/api/auth/logout', {
      method: 'DELETE',
    })
      .catch(() => {})
      .finally(() => {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        setRedirectToLogin(true);
      });
  }

  function handleDeleteAccount() {
    fetch('/api/user/delete', {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.status === 204) {
          localStorage.removeItem('username');
          localStorage.removeItem('token');
          setRedirectToLogin(true);
        } else {
          return res.json().then(data => {
            setErrorMsg(`⚠ Error deleting account: ${data.msg}`);
          });
        }
      })
      .catch((err) => {
        setErrorMsg(`⚠ Error deleting account: ${err.message}`);
      });
  }

  if (redirectToLogin) {
    return <Navigate to="/" />;
  }

  const q = questions[currentQuestion];

  return (
    <section id="quiz-questions">
      {errorMsg && <p className="error">{errorMsg}</p>}
      <p>
        Current Score: {score} 
        <button onClick={handleLogout}>Logout</button>
        <button onClick={handleDeleteAccount}>Delete Account</button>
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

export default Quiz;
