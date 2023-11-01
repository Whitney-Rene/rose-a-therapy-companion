import { useState, useEffect } from 'react';

import callBackEnd from '../../utils/functions';


export default function ListLatestEntries() {

  //state
  const [entries, setEntries] = useState(null); //this could be initialized to an empty array []

  //side effect hook, triggers callBackEnd function (imported from utils folder)
  useEffect (() => {

    //I am concerned because I hardcoded this...need to figure out how to get this to work dynamically?
    //maybe there would be a way to grab the user_id upon login and send that id here?
    callBackEnd('/list-latest-entries/1')
      .then(data => {
        setEntries(data)
        console.log('entries data:', entries)}
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

      </div>
    </>
  );
};
