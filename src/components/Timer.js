import { useEffect } from "react"

const Timer = ({ dispatch, secondsRemaining }) => {

    useEffect(function(){
        setInterval(function(){
            dispatch({type: 'tick', })
        }, 1000);
    }, [dispatch, secondsRemaining])

  return (
    <div className="timer">
        {secondsRemaining}
    </div>
  )
}

export default Timer