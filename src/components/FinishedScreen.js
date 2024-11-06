import React from 'react'

const FinishedScreen = ({points, maxPossiblePoints, highscore}) => {

    let emoji;
    const percantage = (points / maxPossiblePoints) * 100

    if(percantage == 100) emoji = '🥇'
    if(percantage >= 80 && percantage < 100)  emoji ='🎉'
    if(percantage >= 50 && percantage < 80)  emoji ='😃'
    if(percantage >= 0 && percantage < 50)  emoji ='🤓'
    if(percantage === 0)  emoji = '🤦‍♂️'
  return (
        <>
            <p className='result'>
                <span>{emoji}</span>You Scored <strong>{points}</strong> Ouf Of {maxPossiblePoints} ({Math.ceil(percantage)}%)
            </p>
            <p className='highscore'>(Highscore: {highscore} points)</p>
        </>

  )
}

export default FinishedScreen