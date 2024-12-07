import React from 'react'
import myImage from './logo.png'
import '../app.css'

function About() {
  return (
    <section>
      <h2>About Anti-Scam Awareness</h2>
      <p>The original intention of this website is to help users recognize and avoid common online scams. Through interactive quizzes and educational resources, we aim to raise awareness about fraudulent schemes and empower individuals to protect themselves.</p>
      <img src={myImage} alt="About Image" />
    </section>
  )
}
export default About
