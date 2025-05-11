import { Link } from "react-router-dom";
import '../styles/navbar.css';

export const Navbar = ({ setShowRegisterModal, isRegistered, updateRegisterStatus}) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    updateRegisterStatus();
  };

  return (
    <nav className="main-nav">
      <div className="nav-container">
        <Link to="/" className="nav-btn-home">
          <span>HOME</span>
        </Link>
        <div className="nav-actions">
          {isRegistered ? (
            <button className="nav-register-button" onClick={handleLogout}>
              Log Out
            </button>
          ) : (
            <button
            className="nav-register-button"
            onClick={() => setShowRegisterModal(true)}
            >
              Login / Sign Up
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};