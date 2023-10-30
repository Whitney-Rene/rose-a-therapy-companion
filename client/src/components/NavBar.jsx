//import component to create navigation links
import { Link } from 'react-router-dom';

export default function NavBar() {

  return (
    <>
   
    <nav className='navbar'>

      <p>NavBar Component</p>
      <p style={{color: 'sandybrown'}}>rose: a therapy companion</p>

      <div className="links">

          {/* when the user clicks "home"/"request about"
          direct the user to this path, which render an element (comp) */}
          <Link to="/" style={{color: 'sandybrown'}}>Home   </Link>
          <Link to="/request" style={{color: 'sandybrown'}}>request a bouquet</Link>

      </div>

    </nav>

    </>
  )
}
