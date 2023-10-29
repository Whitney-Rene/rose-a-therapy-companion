import { useState, useEffect } from 'react';
//'Switch' has been replaced with 'Routes'
import { Route, Routes } from 'react-router-dom';

import callBackEnd from '../utils/functions';

import CreateRoseBudThorn from './components/CreateRoseBudThorn';
import HomePage from './components/HomePage';
import RequestBouquet from './components/RequestBouquet';
import NavBar from './components/NavBar';
import './App.css'

//400 -client side, issue with request

function App() {


//fetch users

const [message, setMessage] = useState('');
const [user, setUser] = useState('');

useEffect (() => {

//function for async operation, returns a promise
callBackEnd('')
  //promise based approach/method, called on the promise returned by above function
  //when the promise is resolved (async function is successful), then do the callback function
  //the data - resolved value of the promise, set this as the state
  .then(data => setMessage(data))
  //promise method, used to handle errors
  //if the promise is rejected
  //error represents the error object
  //log an error message to the console
  .catch(error =>console.error("An error occured:", error));

callBackEnd('/users')
  //Curly braces are used to define a code block in arrow functions when you have multiple statements inside the function.
  .then(data => {
    setUser(data);
    console.log("user data", data);
  })
  .catch(error => console.error('An error occured:', error));

}, []);

  return (

    <div className='App'>

      <NavBar />

      <div className='content'>
        <Routes>
          <Route path="/" element={<HomePage message={message}/>} />
          <Route path="/request" element={<RequestBouquet />} />
        </Routes>
      </div>

    </div>

  )
}

export default App
