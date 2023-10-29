import { useState, useEffect } from 'react';

import callBackEnd from '../../utils/functions';


export default function ListLatestEntries() {

  const [entries, setEntries] = useState([]);

  useEffect (() => {

    callBackEnd('/entries')
      .then(data => setEntries(data))
      .catch(error => console.error('An error occured:', error));
    
    }, []);

    console.log('entries data', entries);

  return (
    <>

      <div>
        
      <h2
        style={{ marginBottom: 0, fontWeight: 'bold'}}
      >
      ListLatestEntries Component
      </h2>

      <p 
        style={{ marginTop: 0, marginBottom: 0}}
      >
      there will be a list of the most recent rose/bud/thorns, up to 5
      </p>

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
