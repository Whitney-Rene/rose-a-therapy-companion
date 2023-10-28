import { useState, useEffect } from 'react';
//'Switch' has been replaced with 'Routes'
import { Route, Routes } from 'react-router-dom';

import callBackEnd from '../utils/functions';

import CreateRoseBudThorn from './components/CreateRoseBudThorn';
import HomePage from './components/HomePage';
import ListLatestEntries from './components/ListLatestEntries';
import RequestBouquet from './components/RequestBouquet';
import NavBar from './components/NavBar';
import './App.css'

//400 -client side, issue with request

function App() {


//fetch users

const [message, setMessage] = useState('');

useEffect (() => {

  const fetchMessage = async () => {
    try {
      const data = await callBackEnd("");
      setMessage(data);
    } catch (error) {
      console.error("An error occured:" , error);
    }
  };

  fetchMessage();

}, []);

  return (

        <div className='App'>

          <NavBar />

          <div className='content'>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/request" element={<RequestBouquet />} />
            </Routes>
          </div>

        <p>{message}</p>

        </div>

  )
}

export default App
