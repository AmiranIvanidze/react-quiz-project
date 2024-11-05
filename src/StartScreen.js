import React from 'react'

const StartScreen = ({num}) => {
  return (
    <div className="start">
      <h2>Welcome To The React Quizz!</h2>
      <h3>{num} Question To Test Your React Mastery!</h3>
      <button className='btn btn-ui'>Let's Start</button>
    </div>
  )
}

export default StartScreen
