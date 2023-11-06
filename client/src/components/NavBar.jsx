//import component to create navigation links
import { Link } from 'react-router-dom';

export default function NavBar() {

  return (
    <>
   
    <nav className='navbar'>

      <p>rose: a therapy companion</p>

      <div className="links">

          {/* when the user clicks "Home", "Request a Bouquet" or "Login" links
          direct the user to this path, which renders an element/comp */}
          <Link to="/" style={{color: 'sandybrown'}}>home   </Link>
          <Link to="/request" style={{color: 'sandybrown'}}>request a bouquet   </Link>
          <Link to="/login" style={{color: 'sandybrown'}}>login</Link>

      </div>

    </nav>

    </>
  )
}

//FUTURE PLANS:
//add styling
