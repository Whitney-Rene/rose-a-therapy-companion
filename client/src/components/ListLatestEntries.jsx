import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenSquare, faTrash } from '@fortawesome/free-solid-svg-icons';


import functions from '../../utils/functions';


export default function ListLatestEntries() {

  //state
  const [entries, setEntries] = useState(null); //this could be initialized to an empty array []

  const handleDelete = async (entry_id) => {
    try { 
      const response = await fetch (`http://localhost:9999/delete-entries/${entry_id}`, {
        method: 'DELETE',
      });
      if(!response.ok) {
        throw new Error('Failed to delete entry');
      }

      //very new for me, but great!  less lines of code
      //FUTURE PLANS: some sort of confirm/alert  --eventcard.jsx, eventonica, confirm alert
      setEntries((prevEntries) => prevEntries.filter((entry) => entry.entry_id !== entry_id));
    } catch (error) {
      console.error('Error deleting entry:', error)
    }
  };
  

  //side effect hook, triggers getRequest function (imported from utils folder)
  useEffect (() => {

    //I am concerned because I hardcoded this...need to figure out how to get this to work dynamically?
    //maybe there would be a way to grab the user_id upon login and send that id here?
    functions.getRequest('/list-latest-entries/1')
      .then(data => {
        setEntries(data)
        console.log('entries data:', entries)
      
      }
        )
      // inside catch throw new Error
      .catch(error => {
        console.error('An error occured while fetching entries:', error)
        console.log(error.response);
      });
    
    
    }, []);

  return (
    <>

      <div>
        
      <p>ListLatestEntries Component</p>

      {/* FUTURE PLANS: 
          add functionality to edit and delete entries,
          delete/edit icons for each entry with functionality
      */}

        {entries && entries.map((entry, index) => (
          <div key={index}>
            <p>{entry.entry_type}</p>
            <p>{entry.entry_content}</p>
            <FontAwesomeIcon icon={faTrash} className='iconEye' onClick={() => handleDelete(entry.entry_id)}/>
            <Link to={`/edit/${entry.entry_id}`} state={entry} className='iconPen'>
              <FontAwesomeIcon icon={faPenSquare} /> 
            </Link>
          </div>
        ))}

      </div>
    </>
  );
};
