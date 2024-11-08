import React from 'react'

const NextButton = ({ dispatch, answer, numQuestions, index  }) => {
    if(answer == null) return

    if(index < numQuestions - 1){
        return (
            <button className='btn btn-ui' onClick={() => dispatch({type:"nextQuestion",})}>NextButton</button>
          )
    }

    if(index === numQuestions - 1){
        return (
            <button className='btn btn-ui' onClick={() => dispatch({type:"finish"})}>Complete</button>
          )
    }

}

export default NextButton