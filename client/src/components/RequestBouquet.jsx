import React, { useRef, useState } from 'react';
import functions from '../../utils/functions';

export default function RequestBouquet() {

  const userStartDate = useRef(null);
  const userEndDate = useRef(null);
  const [bouquetData, setBouquetData] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const start_date = userStartDate.current?.value;
    const end_date = userEndDate.current?.value;

    try {
      const data = await functions.getRequest(`/date-specific-entries/${userStartDate}/${userEndDate}`)
      setBouquetData(data);
    } catch (error) {
      console.error("Error while fetching bouquet data:", error);
    }
  }

  return (
    <div>
      
      <p>RequestBouquet Component</p>
      <p>here you will see an input box for dates to request a bouquet</p>

      <form onSubmit={handleSubmit}>
        <label>
          Start Date:
          <input type="date" ref={userStartDate} />
        </label>
        <label>
          End Date:
          <input type='date' ref={userEndDate} />
        </label>
        <button type='submit'>Submit</button>
      </form>

    

    </div>
  )
}
