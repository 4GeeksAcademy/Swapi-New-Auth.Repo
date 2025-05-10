import { Link } from "react-router-dom";
import "../styles/home.css";


export const Home = () => {
  return (
    <div className="databank-container">
      <div className="databank-header">
        <div className="divider"></div>
      </div>

      <div className="databank-categories">
        <h2>BROWSE</h2>
        <div className="category-grid">
          <Link to="/personajes" className="category-card">
            <span className="category-code">CHARACTERS</span>
          </Link>
          <Link to="/planetas" className="category-card">
            <span className="category-code">PLANETS</span>
          </Link>
          <Link to="/naves" className="category-card">
            <span className="category-code">VEHICLES</span>
          </Link>
          <Link to="/favorites" className="category-card">
            <span className="category-code">FAVORITES</span>
          </Link>
        </div>
      </div>

    </div>
  );
};