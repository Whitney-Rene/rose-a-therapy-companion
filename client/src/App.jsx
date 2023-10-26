import { useState, useEffect } from 'react';

import './App.css'

function App() {

  const [backEndMessage, setBackEndMessage] = useState("");

  const callBackEnd = async () => {
    try{
      const response = await fetch('http://localhost:8888');
      if(!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }
      const data = await response.json();
      setBackEndMessage(data);
    } catch{
      console.error('An error occured:', error);
    }
  }

  useEffect(() => {
    callBackEnd();
  }, []);


  return (
    <>
      <div>
        <h1>rose: a therapy companion</h1>
        <p>{backEndMessage}</p>
        <button>add a rose</button>
      </div>
    </>
  )
}

export default App
