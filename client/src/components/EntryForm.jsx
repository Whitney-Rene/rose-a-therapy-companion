import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import callBackEnd from '../../utils/functions';

export default function EntryForm() {



    const { entry_type } = useParams();

    const userEntryType = useRef(entry_type);
    const userEntryDate = useRef(null);
    const userEntryContent = useRef(null);

    const handleSubmit = (event) => {
        //this prevents the default behavior of an event, so the default action of a form is to submit the data and reload the page
        event.preventDefault();

        const entryData = {
            entry_type: userEntryType.current?.value,
            entry_date: userEntryDate.current?.value,
            entry_content: userEntryContent.current?.value,
        }

    }
    return (
        <>

        </>
    )
}