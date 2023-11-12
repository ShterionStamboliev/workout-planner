import { Link } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout'
import './Navbar.css'

function Navbar() {
    const { logout } = useLogout();

    function handleLogout() {
        logout();
    }

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Workout Coach</h1>
                </Link>
                <nav className="navbar">

                    <div>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>

                    <div>
                        <button className='logout-button' onClick={handleLogout}>Logout</button>
                    </div>

                </nav>
            </div>
        </header>
    )
}

export default Navbar