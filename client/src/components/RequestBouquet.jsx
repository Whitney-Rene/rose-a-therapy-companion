import React, { useRef, useState } from 'react';
import functions from '../../utils/functions';

export default function RequestBouquet() {

  const userStartDate = useRef(null);
  const userEndDate = useRef(null);
  const [bouquetData, setBouquetData] = useState([]);

  

  return (
    <div>
      
      <p>RequestBouquet Component</p>
      <p>here you will see an input box for dates to request a bouquet</p>

      <form onSubmit={}>
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

      {/* create a form here, will take 1 or 2 dates - how to make it work with 1 date?
      -onClick function to retrieve and handle data,
      -data will be sent to back end to make a query on the db,
      -endpoint will send a response with rose/bud/thorns for specific dates
       */}

    </div>
  )
}
