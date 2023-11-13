//imports from react, libraries and other files
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';

import functions from '../../utils/functions';
import '../css/EntryForm.css';

export default function EntryForm() {

    //initialize variables
    const { entry_type } = useParams();
    const navigateTo = useNavigate();
    const [quote, setQuote] = useState("");
    const [confirmationMessage, setConfirmationMessage] = useState("");

    //async function to submits a r/b/th in db, in try/catch block (to handle success/failure of async call)
    const handleSubmit = async (event) => {

        //this prevents the default behavior of an event, so the default action of a form is to submit the data and reload the page
        event.preventDefault();

        const entryData = {
            entry_type,
            entry_date: event.target.elements.date.value, //userEntryDate.current?.value,
            entry_content: event.target.elements.content.value //userEntryContent.current?.value,
        }
        
        //try/catch blocks are used to handle asynchronous functionss that involve api calls
        try {
            await functions.postRequest("/add-entries/1", entryData);

            //resets input fields to blank
            event.target.reset();

            setConfirmationMessage("Entry successfully submitted")

            const data = await functions.getRequest("/quotes");
            setQuote(data);

        } catch (error) {
            console.error("Error submitting form data:", error);
            setConfirmationMessage("There was an issue submitting your entry");
            setQuote("");
        }

    };

    //route user to homepage for cancel button
    const routeHome = () => {
        navigateTo("/");
    }

    return (

        <>

            <div className='entry-form-box'>

                <Typography variant="h2" className='entry-form-title'>
                    create a {entry_type} entry
                </Typography>

                {/* basic form for entry with sumbit and cancel button */}
                <form onSubmit={handleSubmit}>

                    <label>
                        date:   
                        <input className="entry-form-date" name="date" required type='date'></input>
                    </label>

                    <label>
                        {entry_type}:         
                        <textarea className="entry-form-textarea" name="content" placeholder='type text here'required />
                    </label>

                    <Button className='entry-form-submit-btn' type='submit'>Submit</Button>
        
                </form>

                <Button className='entry-form-cancel-btn' onClick={routeHome}>Cancel</Button>
                
            </div>

            <div>

                <p className='confirmation-msg'>{confirmationMessage}</p>

                {/* {quote} will have a truthy value with the successful api call, and falsy with unsuccessful api call} */}
                {quote && <p className='quote'> a beautiful reminder:  '{quote.affirmation}'</p>}
                <AutoAwesomeOutlinedIcon className='star'/>

            </div>

        </>
    );
};

//FUTURE PLANS:
//add styling

//NICE-TO-HAVES:
//info bar at top with inspirational quote

//LEARNED:
    //line 76: conditional rendering statement
    //line 21: specifically for variables and is the same name as key, only need to type key name
