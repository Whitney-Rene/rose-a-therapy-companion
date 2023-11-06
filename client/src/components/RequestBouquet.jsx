//imports from react and other files
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

import functions from '../../utils/functions';

export default function RequestBouquet() {

  const navigateTo = useNavigate();

  //useRefs and state
  const userStartDate = useRef(null);
  const userEndDate = useRef(null);
  const [bouquetData, setBouquetData] = useState([]);

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
          <input type="date" ref={userStartDate} />
        </label>
        <label>
          End Date:
          <input type='date' ref={userEndDate} />
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
            <FontAwesomeIcon icon={faTrash} className='iconEye '/>
            <FontAwesomeIcon icon={faPenSquare} className='iconPen' />
          </div>
       ))}
      </div>
    )}

    </div>
  )
}
