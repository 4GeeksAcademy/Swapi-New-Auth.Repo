import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetPersonajes } from '../../services/fetch.js';
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import "../styles/personajes.css";

import luke from '../assets/Personajes/01-Luke.jpg';
import c3po from '../assets/Personajes/02-C3-PO.jpg';
import r2d2 from '../assets/Personajes/03-R2-D2.jpg';
import darthVader from '../assets/Personajes/04-Darth Vader.jpg';
import leia from '../assets/Personajes/05-Leia.jpg';
import owen from '../assets/Personajes/06-Owen.jpg';
import beru from '../assets/Personajes/07-Beru.jpg';
import r5d4 from '../assets/Personajes/08-R5-D4.jpg';
import briggs from '../assets/Personajes/09-Briggs.jpg';
import obiWan from '../assets/Personajes/10-Obi-Wan.jpg';

function Personajes() {
  const { store, dispatch } = useGlobalReducer();
  const { personajes, loading, error } = store;
  const navigate = useNavigate();

  useEffect(() => {
    GetPersonajes(dispatch);
  }, [dispatch]);

  const uidToImageMap = {
    "1": luke,
    "2": c3po,
    "3": r2d2,
    "4": darthVader,
    "5": leia,
    "6": owen,
    "7": beru,
    "8": r5d4,
    "9": briggs,
    "10": obiWan
  };

  const handleClick = (personaje) => {
    if (!personaje.uid) {
      console.error("No UID found in character:", personaje);
      return;
    }
    navigate(`/personajes/${personaje.uid}`);
  };

  if (loading) return <div className="loading-message">Loading characters...</div>;
  if (error) return <div className="error-message">Error: {error.message}</div>;
  if (!personajes || personajes.length === 0) return <div className="empty-message">No Characters Available</div>;

  return (
    <div className="personajes-container">
      <h1 className="personajes-title">Star Wars Characters</h1>
      
      <div className="personajes-grid">
        {personajes.map((personaje) => {
          const imageSrc = uidToImageMap[personaje.uid] || "No Image Aviable";
          return (
            <div 
              key={personaje.uid}
              onClick={() => handleClick(personaje)}
              className="personaje-card"
            >
              <img 
                src={imageSrc} 
                alt={personaje.name || personaje.properties?.name || 'Unknown Character'}
                className="personaje-image"
              />
              <span className="personaje-name">
                {personaje.name || personaje.properties?.name || 'Unknown Character'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Personajes;