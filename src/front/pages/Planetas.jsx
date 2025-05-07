import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetPlanetas } from '../../services/fetch.js';
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import "../styles/planetas.css";

import tatooine from '../assets/Planetas/01-Tatooine.jpg';
import alderaan from '../assets/Planetas/02-Alderaan.jpg';
import yavin from '../assets/Planetas/03-Yavin IV.jpg';
import hoth from '../assets/Planetas/04-Hoth.jpg';
import dagobah from '../assets/Planetas/05-Dagobah.jpg';
import bespin from '../assets/Planetas/06-Bespin.jpg';
import endor from '../assets/Planetas/07-Endor.jpg';
import naboo from '../assets/Planetas/08-Naboo.jpg';
import coruscant from '../assets/Planetas/09-Coruscant.jpg';
import kamino from '../assets/Planetas/10-Kamino.jpg';

function Planetas() {
  const { store, dispatch } = useGlobalReducer();
  const { planetas, loading, error } = store;
  const navigate = useNavigate();

  useEffect(() => {
    GetPlanetas(dispatch);
  }, [dispatch]);

  const uidToImageMap = {
    "1": tatooine,
    "2": alderaan,
    "3": yavin,
    "4": hoth,
    "5": dagobah,
    "6": bespin,
    "7": endor,
    "8": naboo,
    "9": coruscant,
    "10": kamino
  };

  const handleClick = (planeta) => {
    if (!planeta.uid) {
      console.error("No UID found in planet", planeta);
      return;
    }
    navigate(`/planetas/${planeta.uid}`);
  };

  if (loading) return <div className="loading-message">Loading planets...</div>;
  if (error) return <div className="error-message">Error: {error.message}</div>;
  if (!planetas || planetas.length === 0) return <div className="empty-message">The Galaxy Has Been Destroyed!</div>;

  return (
    <div className="planetas-container">
      <h1 className="planetas-title">Star Wars Planets</h1>
      
      <div className="planetas-grid">
        {planetas.map((planeta) => {
          const imageSrc = uidToImageMap[planeta.uid] || tatooine;
          return (
            <div 
              key={planeta.uid}
              onClick={() => handleClick(planeta)}
              className="planeta-card"
            >
              <img 
                src={imageSrc} 
                alt={planeta.name || planeta.properties?.name || 'Unknown Planet'}
                className="planeta-image"
              />
              <span className="planeta-name">
                {planeta.name || planeta.properties?.name || 'Unknown Planet'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Planetas;