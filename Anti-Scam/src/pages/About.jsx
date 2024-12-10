import React, { useState, useEffect } from 'react';
import myImage from './logo.png'
import '../app.css'

function About() {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    async function fetchQuote() {
      try {
        const response = await fetch('https://perl.is/random');
        const data = await response.json();
        setQuote(data.quote);
      } catch (error) {
        console.error("Failed to fetch quote:", error);
        setQuote("Failed to load quote.");
      }
    }
    fetchQuote();
  }, []);
  return (
    <section>
      <h2>About Anti-Scam Awareness</h2>
      <p>The original intention of this website is to help users recognize and avoid common online scams. Through interactive quizzes and educational resources, we aim to raise awareness about fraudulent schemes and empower individuals to protect themselves.</p>
      <img src={myImage} alt="About Image" />
      <h3>Alan Perlis Quote</h3>
      <p>{quote}</p>
    </section>
  )
}
export default About
