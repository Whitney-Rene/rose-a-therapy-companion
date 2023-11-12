import { useNavigate } from 'react-router-dom';
import { Typography, Button, ButtonGroup } from '@mui/material';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';

import '../css/CreateRoseBudThorn.css'



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

        {/* <SpaOutlinedIcon className="rose-icon-crbth" /> */}

      <Typography variant="h4" className='header-crbth'>
        create a new rose, bud or thorn
      </Typography>

      {/* buttons that have routing functionality */}
      <div className="button-group" >

        {/* <ButtonGroup variant="outlined"> */}
          <Button className="button" onClick={() => handleClick('rose')}>rose</Button>
          <SpaOutlinedIcon className="rose-icon-crbth" />
          <Button className="button" onClick={() => handleClick('bud')}>bud</Button>
          <SpaOutlinedIcon className="rose-icon-crbth" />
          <Button className="button" onClick={() => handleClick('thorn')}>thorn</Button>
        {/* </ButtonGroup> */}

      </div>
      
    </div>

  );
};

//FUTURE PLANS:
//add styling

//TODO: add button, consider removing fragments in other components
