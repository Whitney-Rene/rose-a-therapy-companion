import { useState, useEffect } from 'react';
//'switch' has been replaced with 'routes'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CreateRoseBudThorn from './components/CreateRoseBudThorn';
import HomePage from './components/HomePage';
import ListLatestEntrie from './components/ListLatestEntries';
import RequestBouquet from './components/RequestBouquet';
import NavBar from './components/NavBar';

import './App.css'

function App() {


  return (

      <Router>

        <div className='App'>

          <NavBar />

          <div className='content'>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/request" element={<RequestBouquet />} />
            </Routes>
          </div>

        </div>

      </Router>
  )
}

export default App
