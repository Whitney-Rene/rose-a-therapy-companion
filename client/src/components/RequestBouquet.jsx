//imports from react and other files
import React, { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

import functions from '../../utils/functions';

export default function RequestBouquet() {

  const navigateTo = useNavigate();

  //useRefs and state
  const userStartDate = useRef(null);
  const userEndDate = useRef(null);
  const [bouquetData, setBouquetData] = useState([]);

  const handleDelete = async (entry_id) => {
    try { 
      const response = await fetch (`http://localhost:9999/delete-entries/${entry_id}`, {
        method: 'DELETE',
      });
      if(!response.ok) {
        throw new Error('Failed to delete entry');
      }

      //very new for me, but great!  less lines of code
      setBouquetData((prevEntries) => prevEntries.filter((entry) => entry.entry_id !== entry_id));
    } catch (error) {
      console.error('Error deleting entry:', error)
    }
  };

  //function to handle the submit/button click
  //will call backend and retrieve r/b/th between specific dates
  const handleSubmit = async (event) => {
    //prevent the default nature of event
    event.preventDefault();

    //variables to house the values of useRefs
    const start_date = userStartDate.current?.value;
    const end_date = userEndDate.current?.value;

    //async call in try/catch (handles success or failure of async call)
    try {
      const data = await functions.getRequest(`/date-specific-entries/${start_date}/${end_date}`);
      console.log(data);
      setBouquetData(data);
    } catch (error) {
      console.error("Error while fetching bouquet data:", error);
    }
  }

  const routeHome = () => {
    navigateTo("/");
  }

  return (
    <div>
      
      <p>RequestBouquet Component</p>

      <form onSubmit={handleSubmit}>
        <label>
          Start Date:
          <input required type="date" ref={userStartDate} />
        </label>
        <label>
          End Date:
          <input required type='date' ref={userEndDate} />
        </label>
        <button type='submit'>Submit</button>
      </form>
      <button onClick={routeHome}>Cancel</button>

    {/* if bouquetData not empty, render details of bouquet */}
    {bouquetData.length > 0 && (
      <div>
        {bouquetData.map((item) => (
          <div key={item.entry_id}>
            {item.entry_type}
            {functions.formatTime(item.entry_date)}
            {item.entry_content}
            <FontAwesomeIcon icon={faTrash} className='iconEye' onClick={() => handleDelete(item.entry_id)}/>
            <Link to={`/edit/${item.entry_id}`} state={item} className='iconPen'>
              <FontAwesomeIcon icon={faPenSquare} /> 
            </Link>
          </div>
       ))}
      </div>
    )}

    </div>
  )
}
