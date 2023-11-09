//import Link component to create navigation links
import { Link } from 'react-router-dom';
import { Toolbar, Typography, AppBar } from '@mui/material';

export default function NavBar() {

  return (
    <>
   
    <div className='navbar'>

          rose: a therapy companion

          <div className="links">
        
            {/* when the user clicks "Home", "Request a Bouquet" or "Login" links
            direct the user to this path, which renders an element/comp */}
            <Link to="/">home   </Link>
            <Link to="/request">request a bouquet   </Link>
            <Link to="/login">logout</Link>

          </div>


    </div>

    </>
  )
}

//FUTURE PLANS:
//add styling
