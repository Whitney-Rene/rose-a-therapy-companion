//import Link component to create navigation links
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';

import '../css/NavBar.css';

export default function NavBar() {

  return (
   
    <div className='navbar'>

      <SpaOutlinedIcon className="rose-icon" />

      <Typography className="app-name"> 
      rose: a therapy companion 
      </Typography>

      <div className="links">
    
        {/* when the user clicks "Home", "Request a Bouquet" or "Login" links
        direct the user to this path, which renders an element/comp */}
        <Link className="nav-link" to="/">home</Link>
        <Link className="nav-link" to="/request">request a bouquet</Link>
        <Link className="nav-link" to="/login">logout</Link>

      </div>


    </div>

  );
};

//FUTURE PLANS:
//add styling
