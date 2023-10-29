import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className='navbar'>
      <p>NavBar Component</p>
      <h1 style={{color: 'sandybrown'}}>rose: a therapy companion</h1>
        

      <div className="links">
          <Link to="/" style={{color: 'sandybrown', marginRight: '50px'}}>Home</Link>
          <Link to="/request" style={{color: 'sandybrown'}}>request a bouquet</Link>
      </div>

    </nav>
  )
}
