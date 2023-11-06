//imports React's state management and side effect hooks
import { useState, useEffect } from 'react';  
//import components from React Router to define routes
import { Route, Routes } from 'react-router-dom'; //'Switch' has been replaced with 'Routes'

//imports functions and components
import HomePage from './components/HomePage';
import RequestBouquet from './components/RequestBouquet';
import NavBar from './components/NavBar';
import EntryForm from './components/EntryForm';
import Login from './components/Login';
import './App.css'
import EditEntry from './components/EditEntry';


function App() {

  // store username and userid
  const [currentUser, setCurrentUser] = useState({});

  return (

    <div className='App'>
      
      <NavBar />

      <div className='content'>

        <Routes> {/* component of react-router */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
          <Route path="/request" element={<RequestBouquet />} />
          <Route path="/create/form/:entry_type" element={<EntryForm />} />
          <Route path="/edit/:entry_id" element={<EditEntry />} />
        </Routes>
        
      </div>

    </div>

  )
};

export default App
