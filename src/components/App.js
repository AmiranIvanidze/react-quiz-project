import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishedScreen from './FinishedScreen';

const initialState = { 
  questions: [],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0

 }

function reducer (state, action) {
  console.log(state)
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state, 
        questions: action.payload,
        status: "ready"
      };
    case "dataFailed":
      return {
        ...state, 
        status: "error"
      };
    case "start":
      return {
        ...state, 
        status: "active"
      };
    case "newAnswer":
      const question = state.questions[state.index]
      return {
        ...state, 
        answer: action.payload,
        points: action.payload == question.correctOption ? question.points  : state.points
      };
    case "nextQuestion":
      return {
        ...state, 
        index: state.index++,
        answer:null
      };
    case "finish":
      return {
        ...state, 
        status: "finished",
        highscore: state.points > state.highscore ? state.points : state.highscore
      };
    default:
      throw new Error("Action is unknown!");
  }

}
function App() {

  const [{questions, status, index, answer, points, highscore}, dispatch] = useReducer(reducer, initialState)
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((prev, curr) => prev + curr.points, 0)
  useEffect(function(){
    fetch('http://localhost:8000/questions/')
    .then(res =>  res.json())
    .then(data => dispatch({type:'dataReceived', payload: data}))
    .catch(err => dispatch({type:"dataFailed"}))
  }, [])
  return (
    <>
      <div className="app">
       <Header/>
       <Main>
        { status === 'loading'  && <Loader/> }
        { status === 'error'  && <Error/> }
        { status === 'ready'  &&  <StartScreen num={numQuestions} dispatch={dispatch}/> }
        { status === 'active' && (
         <>
          <Progress index={index} numQuestions={questions.length} points={points} maxPossiblePoints={maxPossiblePoints} answer={answer} />
           <Question dispatch={dispatch} answer={answer} question={questions[index]}/>
           <NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions}/>
         </>
          ) }
       </Main>
      </div>
      {status === 'finished' && (
          <FinishedScreen points={points} maxPossiblePoints={maxPossiblePoints} highscore={highscore}/>
        )}
    </>
  );
}

export default App;
