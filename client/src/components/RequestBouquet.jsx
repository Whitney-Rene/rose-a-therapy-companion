//imports from react, libraries and other files
import React, { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

import functions from '../../utils/functions';

export default function RequestBouquet() {

  //variable to store useNavigate react-router-dom
  const navigateTo = useNavigate();

  //useRefs and state
  const userStartDate = useRef(null);
  const userEndDate = useRef(null);
  const [bouquetData, setBouquetData] = useState([]);
  const [noEntriesMessage, setNoEntriesMessage] = useState(false);

  //functionality for delete buttons
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

  const handleSubmit = async (event) => {
    //prevent the default nature of event
    event.preventDefault();

    //variables to house the values of useRefs
    const start_date = userStartDate.current?.value;
    const end_date = userEndDate.current?.value;

    //async call in try/catch (handles success or failure of async call)
    try {
      const data = await functions.getRequest(`/date-specific-entries/${start_date}/${end_date}`);

      if (data.length === 0) {
        setNoEntriesMessage(true)
      } else {
        setNoEntriesMessage(false);
        setBouquetData(data)};

      setBouquetData(data);

      //this will clear the input fields AFTER the request is made
      userStartDate.current.value = "";
      userEndDate.current.value = "";

    } catch (error) {
      console.error("Error while fetching bouquet data:", error);
    }
  }

  //function to navigate user to homepage 
  const routeHome = () => {
    navigateTo("/");
  }

  return (
    <div>
      
      <p> request a bouquet </p>

      <form onSubmit={handleSubmit}>

        <label>
          start date:
          <input required type="date" ref={userStartDate} />
        </label>

        <label>
          end date:
          <input required type='date' ref={userEndDate} />
        </label>

        <button type='submit'>submit</button>

      </form>

      <button onClick={routeHome}>cancel</button>

    {/* render details of bouquet, if it is true that bouquetData is longer than 0*/}
    {bouquetData.length > 0 && (

      <div>
       
        {bouquetData.map((item) => (

          <div key={item.entry_id}>

            {item.entry_type}
            {functions.formatTime(item.entry_date)}
            {item.entry_content}

            <span className='icon-wrapper' aria-label="Delete" onClick={() => handleDelete(item.entry_id)}>
            <DeleteOutlineIcon className='icontrash'/>
            </span>

            {/* routes user to edit component
                and takes the entry id and current state of entry with it */}
            <Link to={`/edit/${item.entry_id}`} state={item} aria-label="Edit">
              <EditTwoToneIcon className='icon-edit' /> 
            </Link>

          </div>

       ))}
      </div>
    )}

    {/* if entriesMessage is true */}
    {noEntriesMessage && <p> no r/b/th for these dates </p>}

    </div>
  )
}

//FUTURE PLANS: 
//add styling

//NICE-TO-HAVES
//confirmation/alert for delete
//if I have time
//when I click update for an entry in the "requestbouqet" page list, I am routed 
  //to a different page, can I be take back to my query after the update of the entry? 
