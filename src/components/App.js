import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';

const initialState = { 
  questions: [],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,

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
        index: state.index++
      };
    default:
      throw new Error("Action is unknown!");
  }

}
function App() {

  const [{questions, status, index, answer}, dispatch] = useReducer(reducer, initialState)
  const numQuestions = questions.length;
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
           <Question dispatch={dispatch} answer={answer} question={questions[index]}/>
           <NextButton dispatch={dispatch} answer={questions[index].question}/>
         </>
          ) }
        

       </Main>
      </div>
    </>
  );
}

export default App;
