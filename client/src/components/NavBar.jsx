import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className='navbar'>

        <h1>rose: a therapy companion</h1>

        <div className="links">
            <Link to="/">Home</Link>
            <br />
            <Link to="/request">request a bouquet</Link>
        </div>

    </nav>
  )
}
