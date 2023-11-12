import { Link } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';
import './Navbar.css'

function Navbar() {
    const { logout } = useLogout();
    const { user } = useAuthContext();

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
                    {user && (
                        <div>
                            <span>{user.email}</span>
                            <button className='logout-button' onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                    {!user && (
                        <div>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar