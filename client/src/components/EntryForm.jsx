//imports from react, libraries and other files
import { useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import functions from '../../utils/functions';

export default function EntryForm() {

    //initialize variables
    const { entry_type } = useParams();
    const navigateTo = useNavigate();
    const [quote, setQuote] = useState("");
    const [confirmationMessage, setConfirmationMessage] = useState("");

    // const userEntryType = useRef(entry_type);
    // const userEntryDate = useRef(null);
    // const userEntryContent = useRef(null);

    //async function to submits a r/b/th in db, in try/catch block (to handle success/failure of async call)
    const handleSubmit = async (event) => {
        //this prevents the default behavior of an event, so the default action of a form is to submit the data and reload the page
        event.preventDefault();

        const entryData = {
            //specifically for variables and is the same name as key, only need to type key name
            entry_type,
            entry_date: event.target.elements.date.value, //userEntryDate.current?.value,
            entry_content: event.target.elements.content.value //userEntryContent.current?.value,
        }
        
        //try/catch blocks are used to handle asynchronous functionss that involve api calls
        try {
            await functions.postRequest("/add-entries/1", entryData);

            //resets input fields to blank
            event.target.reset();

            setConfirmationMessage("Entry submitted")

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
        <h2>create a {entry_type} entry</h2>

        {/* basic form for entry with sumbit and cancel button */}
        <form onSubmit={handleSubmit}>

            <label>
                Date:
                <input name="date" required type='date'></input>
            </label>

            <label>
                {entry_type}
                <textarea name="content" placeholder='type text here'required />
            </label>

            <button type='submit'>Submit</button>
    
        </form>

        <button onClick={routeHome}>Cancel</button>

        {confirmationMessage}

        {/* {quote} will have a truthy value with the successful api call, and falsy with unsuccessful api call} */}
        {quote && quote.affirmation}
            
        </>
    )
}

//FUTURE PLANS:
//add styling

//NICE-TO-HAVES:
//info bar at top with inspirational quote

//LEARNED:
//conditional rendering statement
