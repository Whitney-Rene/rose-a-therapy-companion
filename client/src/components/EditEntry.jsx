import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import functions from '../../utils/functions';
import '../css/EditEntry.css';
import { Typography, Button } from '@mui/material';

export default function EditEntry (){

    //variables:
    const navigateTo = useNavigate();
    const location = useLocation();
    const state = location.state;

    const [updatedEntry, setUpdatedEntry] = useState({entry_type: state.entry_type, entry_date: state.entry_date, entry_content: state.entry_content});
    const [confirmationMessage, setConfirmationMessage] = useState("");

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
        try {
            const response = await fetch(`http://localhost:9999/edit-entries/${state.entry_id}`, {
            
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedEntry),

        });

        const data = await response.json();
        setUpdatedEntry({entry_type: "", entry_date: "", entry_content: ""})
        if(!response.ok) {
            throw new Error (`Failed to update ${state.entry_type} with id: ${state.entry_id}`);
        } else {
            setConfirmationMessage(` your ${state.entry_type} updated successfully!`)
        }


    } catch (error) {
        console.error('Error updating entry:', error);
        setConfirmationMessage(` there was an issue updating your ${state.entry_type} successfully`);
    }

    };

    //function to route user to previous page, when the cancel button is clicked
    //TODO: CHANGE NAME- previous page
    const prevPage = () => {
        navigateTo(-1);
    }

    return (

        <div>

            {/* form to grab the value of input boxes with update buttons and cancel button */}
            <Typography variant="h2" className='edit-entry-title'>
                original {state.entry_type}: 
            </Typography>

            {state && (

            <div>

                <p className='org-date'>{functions.formatTime(state.entry_date)}</p>
                <p className='org-content'>{state.entry_content}</p>
                
                <div className='edit-entry-box'>
                    <form>

                        <label className='edit-entry-label'>
                            edit entry type?
                            <input className='edit-entry-input'required name="entry_type" type="text" value={updatedEntry.entry_type} onChange={handleInputChange}></input>
                        </label>
                        
                        <label className='edit-entry-label'>
                            edit date?
                            <input className='edit-entry-input' required name="entry_date" type="date" value={updatedEntry.entry_date} onChange={handleInputChange}></input>
                        </label>

                        <label className='edit-entry-label'>
                            edit entry content?
                            <textarea className='edit-entry-input-content' required name="entry_content" type="text" value={updatedEntry.entry_content} onChange={handleInputChange}></textarea>
                        </label>

                    </form>

                    <Button className='edit-entry-button' onClick={handleUpdate}>Update Entry</Button>
                    <Button className='edit-entry-button' onClick={prevPage}>Cancel</Button>
                </div>

            </div>

            )}

            <p className='confirm-msg'>{confirmationMessage && confirmationMessage}</p>

        </div>
    );
};

//FUTURE PLANS:
//add styling
