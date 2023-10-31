import { useState, useEffect } from 'react';

import callBackEnd from '../../utils/functions';


export default function ListLatestEntries() {

  //state
  const [entries, setEntries] = useState(null); //this could be initialized to an empty array []

  //side effect hook, triggers callBackEnd function (imported from utils folder)
  //sets data from resolved promise to the value of "entries"
  useEffect (() => {

    //for some reason, "entries" is an empty array???
    //but the map function on line 40 is working, and printing my rose from db on screen?
    callBackEnd('/entries')
      .then(data => {
        setEntries(data)
        console.log('entries data:', entries);}
        )
      // inside catch throw new Error
      .catch(error => console.error('An error occured:', error));
    
    }, []);

  return (
    <>

      <div>
        
      <p>ListLatestEntries Component</p>

        {/* entries && */}
        {entries && entries.map((entry, index) => (
          <div key={index}>
            <p>{entry.entry_type}</p>
            <p>{entry.entry_content}</p>
          </div>
        ))}

        {/* {error && <} */}
      </div>
    </>
  );
};

// I will change styling to external vs inline.
