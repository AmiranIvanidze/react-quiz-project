import React from 'react'

const StartScreen = ({num, dispatch}) => {
  return (
    <div className="start">
      <h2>Welcome To The React Quizz!</h2>
      <h3>{num} Question To Test Your React Mastery!</h3>
      <button className='btn btn-ui' onClick={() => dispatch({type:'start'})} >Let's Start</button>
    </div>
  )
}

export default StartScreen
