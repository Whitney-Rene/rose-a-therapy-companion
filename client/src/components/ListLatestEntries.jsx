import { useState, useEffect } from 'react';

import callBackEnd from '../../utils/functions';


export default function ListLatestEntries() {

  //state
  const [entries, setEntries] = useState([]);

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
      .catch(error => console.error('An error occured:', error));
    
    }, []);

  return (
    <>

      <div>
        
      <h2 style={{ marginBottom: 0, fontWeight: 'bold'}}>ListLatestEntries Component</h2>

        {entries.map((entry, index) => (
          <div key={index}>
            <h4 style={{ marginTop: 0, marginBotton: 0}}>{entry.entry_type}</h4>
            <p style={{ marginTop: 0, marginBottom: 0}}>{entry.entry_content}</p>
          </div>
        ))}

      </div>
    </>
  );
};

// I will change styling to external vs inline.
