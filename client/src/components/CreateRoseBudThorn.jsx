import { library } from 'react-fontawesome';

export default function CreateRoseBudThorn() {

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
      <button onClick>Rose</button>
      <button onClick>Bud</button>
      <button onClick>Thorn</button>

    </div>
    </>

  );
};
