import { useNavigate } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
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

      <Typography variant="h4" className='header-crbth'>
        create a new rose, bud or thorn
      </Typography>

      {/* buttons that have routing functionality */}
      <div className="button-group" >

          <Button className="button" onClick={() => handleClick('rose')}>rose</Button>
          <SpaOutlinedIcon className="rose-icon-crbth" />
          <Button className="button" onClick={() => handleClick('bud')}>bud</Button>
          <SpaOutlinedIcon className="rose-icon-crbth" />
          <Button className="button" onClick={() => handleClick('thorn')}>thorn</Button>

      </div>
      
    </div>

  );
};
