//imports from react, libraries and other files
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

import { Typography } from '@mui/material';

import functions from '../../utils/functions';
import '../css/ListLatestEntries.css';


export default function ListLatestEntries() {

  //state
  const [entries, setEntries] = useState(null); 

  //variables
  const updateListLatestEntries = () => {
    functions.getRequest('/list-latest-entries/1')
  .then(data => {
    setEntries(data)
  }
    )
  // inside catch throw new Error
  .catch(error => {
    console.error('An error occured while fetching entries:', error)
    console.log(error.response);
  });

}

  //function to handle delete
  const handleDelete = async (entry_id) => {
    try { 
      const response = await fetch (`http://localhost:9999/delete-entries/${entry_id}`, {
        method: 'DELETE',
      });
      if(!response.ok) {
        throw new Error('Failed to delete entry');
      }

      updateListLatestEntries();

    } catch (error) {
      console.error('Error deleting entry:', error)
    }
  };
  

  //side effect hook, triggers function
  useEffect (() => {

    updateListLatestEntries();
    
    }, []);

  return (
    <>

      <div>
      
      <Typography 
      // variant="subtitle"
      // noWrap
      align="center"
      color="#FFB085"
      style={{ fontFamily: 'monospace' }}
      >
        your latest rose, bud and thorns
      </Typography>

      {/* map over entries state and show relevant data and buttons */}
      {entries && entries.map((entry, index) => (
        <div key={index}>
          <p>{entry.entry_type}</p>
          <p>{entry.entry_content}</p>
          <DeleteOutlineIcon className='icon-trash' onClick={() => handleDelete(entry.entry_id)}/>
          <Link to={`/edit/${entry.entry_id}`} state={entry}>
            <EditTwoToneIcon className='icon-edit'/> 
          </Link>
        </div>
      ))}

      </div>
    </>
  );
};

//FUTURE PLANS:
//add styling

//NICE-TO-HAVES:
//confirm/alert for delete -- go back to Eventonica project

//LEARNED:
  //filter method, if a entry does not have an id, don't show it
  // setEntries((prevEntries) => prevEntries.filter((entry) => entry.entry_id !== entry_id));
    