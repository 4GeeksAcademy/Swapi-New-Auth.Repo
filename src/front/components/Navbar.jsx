import { Link } from "react-router-dom";
import '../styles/navbar.css';

export const Navbar = () => {
  return (
    <nav className="main-nav">
      <div className="nav-container">
        <Link to="/" className="nav-btn-home">
          <span>HOME</span>
        </Link>
        <div className="nav-actions">
          <Link to="/demo">
            <button className="nav-button-auth">Login/Register</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};