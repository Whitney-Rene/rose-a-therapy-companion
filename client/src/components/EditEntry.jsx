import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

import functions from '../../utils/functions';

export default function EditEntry (){

    const navigateTo = useNavigate();

    const location = useLocation();
    const state = location.state;
    console.log(state);
    // const {entry_id} = useParams();
    // console.log('Entry ID from URL:', entry_id);
    // const [entry, setEntry] = useState([]);
    const [updatedEntry, setUpdatedEntry] = useState({entry_type: state.entry_type, entry_date: state.entry_date, entry_content: state.entry_content});

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUpdatedEntry( {
            ...updatedEntry,
            [name]: value,
        });
    };
    console.log(updatedEntry);

    const routeHome = () => {
        navigateTo("/");
    }
    // async function fetchEntry() {
    //     try {
    //       // Construct the URL for fetching the entry data
    //       const apiUrl = `http://localhost:9999/get-entry/${entry_id}`;
  
    //       const response = await fetch(apiUrl);
  
    //       if (!response.ok) {
    //         throw new Error('Network response was not ok');
    //       }
  
    //       const data = await response.json();
    //       console.log(data);
    //       setEntry(data);
    //     } catch (error) {
    //       console.error('An error occurred while fetching entry:', error);
    //     }
    //   }

    // useEffect(() => {
    //     fetchEntry();
    //   }, []);
    // //   [entry_id]

    return (
        <>
        <p>Edit Entry Component</p>
        {state && (
          <div>
            <p>{state.entry_date}</p>
            <p>{state.entry_type}</p>
            <p>{state.entry_content}</p>
            <form>
                <input name="entry_date" type="date" value={updatedEntry.entry_date} onChange={handleInputChange}></input>
                <input name="entry_type" type="text" value={updatedEntry.entry_type} onChange={handleInputChange}></input>
                <input name="entry_content" type="text" value={updatedEntry.entry_content} onChange={handleInputChange}></input>
            </form>
            <button>Update Entry</button>
            <button onClick={routeHome}>Cancel</button>
          </div>
        )}
      </>
    )
}