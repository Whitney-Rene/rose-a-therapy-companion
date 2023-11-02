import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import postRequest from '../../utils/functions';

export default function EntryForm() {

    const { entry_type } = useParams();

    const userEntryType = useRef(entry_type);
    const userEntryDate = useRef(null);
    const userEntryContent = useRef(null);

    const handleSubmit = (event) => {
        //this prevents the default behavior of an event, so the default action of a form is to submit the data and reload the page
        event.preventDefault();

        const entryData = {
            entry_type: userEntryType.current,
            entry_date: userEntryDate.current?.value,
            entry_content: userEntryContent.current?.value,
        }

        postRequest("/add-entries/1", entryData);
        console.log("Form data:", entryData);

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
        </>
    )
}