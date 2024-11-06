import React from 'react'

const NextButton = ({ dispatch, answer=null  }) => {
    if(answer == null) return
  return (
    <button className='btn btn-ui' onClick={() => dispatch({type:"nextQuestion"})}>NextButton</button>
  )
}

export default NextButton