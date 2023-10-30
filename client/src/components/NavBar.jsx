//import component to create navigation links
import { Link } from 'react-router-dom';

export default function NavBar() {

  return (
    <>
   
    <nav className='navbar'>

      <p>NavBar Component</p>
      <h1 style={{color: 'sandybrown'}}>rose: a therapy companion</h1>

      <div className="links">

        <ul style={{listStyle: 'none'}}>

          {/* when the user clicks "home"/"request about"
          direct the user to this path, which render an element (comp) */}
          <li><Link to="/" style={{color: 'sandybrown'}}>Home </Link></li>
          <li><Link to="/request" style={{color: 'sandybrown'}}>request a bouquet</Link></li>

        </ul>

      </div>

    </nav>

    </>
  )
}
