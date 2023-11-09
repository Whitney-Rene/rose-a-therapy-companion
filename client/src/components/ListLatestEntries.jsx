//imports from react, libraries and other files
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

import functions from '../../utils/functions';

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
        
      <p> your latest rose, bud and thorns </p>

      {/* map over entries state and show relevant data and buttons */}
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

//FUTURE PLANS:
//add styling

//NICE-TO-HAVES:
//confirm/alert for delete -- go back to Eventonica project

//LEARNED:
  //filter method, if a entry does not have an id, don't show it
  // setEntries((prevEntries) => prevEntries.filter((entry) => entry.entry_id !== entry_id));
    