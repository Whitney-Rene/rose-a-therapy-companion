//imports from react, libraries and other files
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { Typography } from '@mui/material';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

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
    <div className='center-container'>

      <Typography variant="h4" className='header-lle'>
        your latest rose, bud and thorns
      </Typography>

      <ResponsiveMasonry
              columnsCountBreakPoints={{900: 4, 750: 3, 350: 1}}
      >

        {/* gutter is the margin surrounding each item */}
        <Masonry columnsCount={3} gutter="40px">
          
          {/* map over entries state and show relevant data and buttons */}
          {entries && entries.map((entry, index) => (

            <div key={index} className='masonry-card'>

              <p className='entry-type'>{entry.entry_type}</p>
              <p className='entry-content'>{entry.entry_content}</p>

              <span aria-label='Delete' onClick={() => handleDelete(entry.entry_id)}>
                <DeleteOutlineIcon className='icon-trash' />
              </span>

              <Link to={`/edit/${entry.entry_id}`} state={entry} aria-label='Edit'>
                <EditTwoToneIcon className='icon-edit' />
              </Link>

            </div>
            
          ))}

        </Masonry>

      </ResponsiveMasonry>

    </div>

  );
};
    