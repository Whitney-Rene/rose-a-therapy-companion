//useHistory is replaced by useNavigate "react-router-dom" v.6
import { useNavigate } from 'react-router-dom';

export default function CreateRoseBudThorn() {
  
  //variable to store useNavigate react-router-dom
  const navigateTo = useNavigate();

  //when user clicks r/b/th button, navigate user to route that will display
    //the EditEntry component and will take the entry type as a param 
  const handleClick = (entry_type) => {
  navigateTo(`/create/form/${entry_type}`);
  }

  return (
    <>
    <div className="create" >

      {/* buttons that have routing functionality */}
      <p>CreateRoseBudThorn Component</p>
      <button onClick={() => handleClick('rose')}>rose</button>
      <button onClick={() => handleClick('bud')}>bud</button>
      <button onClick={() => handleClick('thorn')}>thorn</button>

    </div>
    </>

  );
};

//FUTURE PLANS:
//add styling
