import { useState,  } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import functions from '../../utils/functions';

export default function EditEntry (){

    //variables:
    const navigateTo = useNavigate();
    const location = useLocation();
    const state = location.state;

    const [updatedEntry, setUpdatedEntry] = useState({entry_type: state.entry_type, entry_date: state.entry_date, entry_content: state.entry_content});

    //handle the data in input fields
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUpdatedEntry( {
            ...updatedEntry,
            [name]: value,
        });
    };
  
    //handle the update entry request, async function in try/catch block 
    const handleUpdate = async () => {
        console.log(state.entry_id);
        try {
            const response = await fetch(`http://localhost:9999/edit-entries/${state.entry_id}`, {
            
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedEntry),

        });

        const data = await response.json();
        console.log(data);
        if(!response.ok) {
            throw new Error ('Failed to update contact');
        }


    } catch (error) {
        console.error('Error updating entry:', error);
    }

    };

    //function to route user to home, when the cancel button is clicked
    const routeHome = () => {
        navigateTo("/");
    }

    return (
        <>

        {/* form to grab the value of input boxes with update buttons and cancel button */}
        <p>edit {state.entry_type}</p>
        
        {state && (
          <div>
            <p>{functions.formatTime(state.entry_date)}</p>
            <p>{state.entry_content}</p>
            <form>
                <input name="entry_date" type="date" value={updatedEntry.entry_date} onChange={handleInputChange}></input>
                <input name="entry_type" type="text" value={updatedEntry.entry_type} onChange={handleInputChange}></input>
                <input name="entry_content" type="text" value={updatedEntry.entry_content} onChange={handleInputChange}></input>
            </form>
            <button onClick={handleUpdate}>Update Entry</button>
            <button onClick={routeHome}>Cancel</button>
          </div>
        )}
      </>
    )
}

//FUTURE PLANS:
//something to notify the user that the update was successful!
    //I only know it is successful if I navigate to home or search for r/b/th
