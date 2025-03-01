import { Link } from 'react-router-dom'
import '../App.css'
const NavbarComponent = (props) => {

  return (
    <nav>
      <header>SHORTLINK</header>
      <div className="nav">
        <Link className="nav-item" to="/">
          Home
        </Link>

        <div>
          <Link to="/">Home</Link>
            
          {!localStorage.getItem('token')  ?
          <div>
            <Link className="nav-item" to="/login">
              Sign in
            </Link>
            <Link className="nav-item" to="/register">
              Register
            </Link>
          </div> : 
            <div>
              <Link className="nav-item" to="/dashboard">
                Dashboard
              </Link>
              <Link className="nav-item" to="/logout">
                Logout
              </Link>
            </div>
          }
        </div>
        </div>
        </nav>
  )
}

export default NavbarComponent