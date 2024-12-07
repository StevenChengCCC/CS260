import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import '../styles/quiz.css'

function Quiz({ username, score, setScore }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [quizDone, setQuizDone] = useState(false)

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

  if (!username) {
    return <p>Please <a href="/">login</a> first.</p>
  }

  const handleAnswer = (index) => {
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1)
    }
    const nextQ = currentQuestion + 1
    if (nextQ < questions.length) {
      setCurrentQuestion(nextQ)
    } else {
      setQuizDone(true)
    }
  }

  if (quizDone) {
    return <Navigate to="/score" />
  }
  const q = questions[currentQuestion]

  return (
    <section id="quiz-questions">
      <p>Current Score: {score}</p>
    </section>
  )
}

export default Quiz
