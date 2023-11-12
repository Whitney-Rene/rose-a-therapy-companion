//imports from react, libraries and other files
import React, { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import functions from '../../utils/functions';
import "../css/RequestBouquet.css";

export default function RequestBouquet() {

  //variable to store useNavigate react-router-dom
  const navigateTo = useNavigate();

  //useRefs and state
  const userStartDate = useRef(null);
  const userEndDate = useRef(null);
  const [bouquetData, setBouquetData] = useState([]);
  const [userDates, setUserDates] = useState([])
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
      setUserDates([functions.formatTime(start_date), functions.formatTime(end_date)])

      //this will clear the input fields AFTER the request is made
      userStartDate.current.value = "";
      userEndDate.current.value = "";

    } catch (error) {
      console.error("Error while fetching bouquet data:", error);
    }

  };

  //function to navigate user to homepage 
  const routeHome = () => {
    navigateTo("/");
  };

  return (

    <div className='bouquet-request'>

      <div className='request-box'>
      
        <Typography variant="h2" className='request-title'>
          request a bouquet
        </Typography>

        <Typography className='user-instructions'>
          (see your roses, buds and thorns between specific dates)
        </Typography>

        <form onSubmit={handleSubmit}>

          <label>
            start date:
            <input required type="date" ref={userStartDate} />
          </label>

          <label>
            end date:
            <input required type='date' ref={userEndDate} />
          </label>

          <Button type='submit'>submit</Button>

        </form>

      
        <Button onClick={routeHome}>cancel</Button>
      
      </div>

    {/* render details of bouquet, if it is true that bouquetData is longer than 0*/}
    {bouquetData.length > 0 && (

      <div className="bouquet-details">

        <p className='user-dates'>bouquet for {userDates[0]} to {userDates[1]}
        </p>
       
        <ResponsiveMasonry
                columnsCountBreakPoints={{900: 4}}
        >

          <Masonry columnsCount={3} gutter="40px"> 
        
            {bouquetData.map((item) => (

              <div key={item.entry_id}>

                <p className='bentry-type'>{item.entry_type}</p>
                <p className='bentry-date'>{functions.formatTime(item.entry_date)}</p>
                <p className='bentry-content'>{item.entry_content}</p>

                <span className='icon-wrapper' aria-label="Delete" onClick={() => handleDelete(item.entry_id)}>
                <DeleteOutlineIcon className='icon-trash'/>
                </span>

                {/* routes user to edit component
                    and takes the entry id and current state of entry with it */}
                <Link to={`/edit/${item.entry_id}`} state={item} aria-label="Edit">
                  <EditTwoToneIcon className='icon-edit' /> 
                </Link>

              </div>

            ))}

          </Masonry>

          </ResponsiveMasonry>

      </div>

    )}

    {/* if entriesMessage is true */}
    {noEntriesMessage && <p className='no-entries-msg'> no r/b/th for these dates </p>}

    </div>
  );
};

//FUTURE PLANS: 
//add styling

//NICE-TO-HAVES
//confirmation/alert for delete
//if I have time
//when I click update for an entry in the "requestbouqet" page list, I am routed 
  //to a different page, can I be take back to my query after the update of the entry? 
