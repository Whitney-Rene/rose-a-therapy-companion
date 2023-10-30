//imports React's state management and side effect hooks
import { useState, useEffect } from 'react';  
//import components from React Router to define routes
import { Route, Routes } from 'react-router-dom'; //'Switch' has been replaced with 'Routes'

//imports functions and components
import callBackEnd from '../utils/functions';
import HomePage from './components/HomePage';
import RequestBouquet from './components/RequestBouquet';
import NavBar from './components/NavBar';
import './App.css'

function App() {

//state
const [message, setMessage] = useState("");
const [user, setUser] = useState('');

//side effect hook
useEffect (() => {

//function for async operation, returns a promise
callBackEnd('')
  //promise based approach/method, called on the promise returned by above function
  //when the promise is resolved (async function is successful), then do the callback function
  //the data - resolved value of the promise, set this as the state
  .then(data => {
    setMessage(data);
    console.log('message:', data)
  })
  //promise method, used to handle errors
  //if the promise is rejected
  //error represents the error object
  //log an error message to the console
  .catch(error =>console.error("An error occured:", error));

callBackEnd('/users')
  //Curly braces are used to define a code block in arrow functions when you have multiple statements inside the function.
  .then(data => {
    setUser(data);
    console.log("user data:", data);
  })
  .catch(error => console.error('An error occured:', error));

}, []);

  return (

    <div className='App'>
      
      {/* This component renders logo and "home"/"request bouquet" texts.  
      The texts hyper links which take users to pages that render the components below. 
      This NavBar component is outside the Routes commponents, so that user can access the 
      links, making navigation simple.*/}
      <NavBar />

      <div className='content'>

        {/* component of react-router */}
        <Routes>
          {/* assigns a path to render of these elements */}
          <Route path="/" element={<HomePage message={message}/>} />
          <Route path="/request" element={<RequestBouquet />} />
        </Routes>
        
      </div>

    </div>

  )
}

export default App

//note: //400 -client side, issue with request
