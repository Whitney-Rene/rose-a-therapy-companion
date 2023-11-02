import { useHistory } from 'react-router-dom';

export default function CreateRoseBudThorn() {

 const handleClick = (entry_type) => {
  useHistory().push(`/create/form/${entry_type}`);
 }
  //onClick functions for r/b/th
  //each click must first: trigger a modal? another page? for a form
  //the Submit for that form will need to call to backend at endpoint to add to db/post request
  //user affirmation that entry had been added to db
  //return to home page?
  //update ListLatestEntries Component?

  return (
    <>
    <div className="create" >

      <p>CreateRoseBudThorn Component</p>
      <button onClick={() => handleClick('rose')}>Rose</button>
      <button onClick={() => handleClick('bud')}>Bud</button>
      <button onClick={() => handleClick('thorn')}>Thorn</button>

    </div>
    </>

  );
};


