import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import functions from '../../utils/functions';

export default function EntryForm() {

    const { entry_type } = useParams();
    const [quote, setQuote] = useState("");

    const userEntryType = useRef(entry_type);
    const userEntryDate = useRef(null);
    const userEntryContent = useRef(null);

    const handleSubmit = async (event) => {
        //this prevents the default behavior of an event, so the default action of a form is to submit the data and reload the page
        event.preventDefault();

        const entryData = {
            entry_type: userEntryType.current,
            entry_date: userEntryDate.current?.value,
            entry_content: userEntryContent.current?.value,
        }

        try {
            await functions.postRequest("/add-entries/1", entryData);
            console.log("Form data:", entryData);
        } catch (error) {
            console.error("Error submitting form data:", error);
        }

        try {
            const data = await functions.getRequest("/quotes");
            setQuote(data);
        } catch (error) {
            console.error("Error fetching quotes:", error);
        }


        //FUTURE PLANS
        //I would like to add code for form to clear after submit
        //I would like the user to see a confirmation that r/b/th was submitted to db
        //then take user back to main page
        //update ListLatestEntries Component?
        //api will send inspiration quote to user
        //cancel button

    }


    return (
        <>
        <h2>create a {entry_type} entry</h2>
        <form onSubmit={handleSubmit}>
            <label>
                Date:
                <input type='date' ref={userEntryDate}></input>
            </label>
            <label>
                {entry_type}
                <textarea ref={userEntryContent} />
            </label>
            <button type='submit'>Submit</button>

        </form>

            {/* conditional rendering statement:
            if the quote has a truthy value = not empty/null/underfined, {quote} will render true
            && logical && operator, will conditionally render the second operand `quote` if the first operand {quote} is true
            after logical operator is what will be displayed if `quote` is truthy */}
            {quote && quote.affirmation}
        </>
    )
}