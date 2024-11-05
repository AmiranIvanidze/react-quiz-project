import { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Main from './Main';
function App() {

  const [state, dispatch] = useReducer()

  useEffect(function(){
    fetch('http://localhost:8000/questions/').then(res =>  res.json()).then(data => console.log(data)).catch(err => console.log(err))
  }, [])
  return (
    <>
      <div className="app">
       <Header/>
       <Main>
        <p>1/15</p>
        <p>Question!</p>
       </Main>
      </div>
    </>
  );
}

export default App;
