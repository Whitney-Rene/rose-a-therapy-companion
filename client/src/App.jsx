import { useState, useEffect } from 'react';
//'switch' has been replaced with 'routes'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CreateRoseBudThorn from './components/CreateRoseBudThorn';
import HomePage from './components/HomePage';
import ListLatestEntrie from './components/ListLatestEntries';
import RequestBouquet from './components/RequestBouquet';

import './App.css'

function App() {


  return (

      <Router>

        <div className='App'>

          {/* navbar? */}

          <div className='content'>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/create" element={<CreateRoseBudThorn />} />
            </Routes>
          </div>

        </div>

      </Router>
  )
}

export default App
