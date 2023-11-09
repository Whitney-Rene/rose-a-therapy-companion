//useHistory is replaced by useNavigate "react-router-dom" v.6
import { useNavigate } from 'react-router-dom';
import { Toolbar, Typography, AppBar } from '@mui/material';


export default function CreateRoseBudThorn() {
  
  //variable to store useNavigate react-router-dom
  const navigateTo = useNavigate();

  //when user clicks r/b/th button, navigate user to route that will display
    //the EditEntry component and will take the entry type as a param 
  const handleClick = (entry_type) => {
  navigateTo(`/create/form/${entry_type}`);
  }

  return (

    <div className="create" >

      {/* buttons that have routing functionality */}
      <Typography 
      // variant="subtitle"
      // noWrap
      align="center"
      color="#FFB085"
      style={{ fontFamily: 'monospace' }}
      >
        create a new rose, bud or thorn
      </Typography>
      <button onClick={() => handleClick('rose')}>rose</button>
      <button onClick={() => handleClick('bud')}>bud</button>
      <button onClick={() => handleClick('thorn')}>thorn</button>

    </div>

  );
};

//FUTURE PLANS:
//add styling

//TODO: add button, consider removing fragments in other components
