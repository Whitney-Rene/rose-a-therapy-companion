import { useState, useEffect } from 'react';

import functions from '../../utils/functions';


export default function ListLatestEntries() {

  //state
  const [entries, setEntries] = useState(null); //this could be initialized to an empty array []

  //side effect hook, triggers getRequest function (imported from utils folder)
  useEffect (() => {

    //I am concerned because I hardcoded this...need to figure out how to get this to work dynamically?
    //maybe there would be a way to grab the user_id upon login and send that id here?
    functions.getRequest('/list-latest-entries/1')
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

      {/* FUTURE PLANS: 
          add functionality to edit and delete entries,
          delete/edit icons for each entry with functionality
      */}

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
