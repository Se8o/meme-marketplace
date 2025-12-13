import { Link, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useCart } from '../context/CartContext';

export function Navbar() {
  const [user, setUser] = useLocalStorage('user', null);
  const { getItemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  if (!user || !user.loggedIn) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-brand">
          Meme Marketplace
        </Link>
        
        <div className="navbar-links">
          <Link to="/dashboard" className="navbar-link">
            Dashboard
          </Link>
          <Link to="/memes" className="navbar-link">
            Memes
          </Link>
          <Link to="/cart" className="navbar-link cart-link">
            Košík ({getItemCount()})
          </Link>
          <span className="navbar-user">
            {user.username}
          </span>
          <button onClick={handleLogout} className="navbar-logout">
            Odhlásit
          </button>
        </div>
      </div>
    </nav>
  );
}
