import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GetPersonajeByUid } from '../../services/fetch.js';
import useGlobalReducer from '../../front/hooks/useGlobalReducer.jsx';
import { toggleFavorito } from '../../front/hooks/actions.js';
import '../styles/detallePersonajes.css';

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

function DetallePersonajes() {
  const { uid } = useParams();
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();
  const { personajeDetalle, loadingDetalle, errorDetalle, favoritos } = store;
  const [imageSrc, setImageSrc] = useState();

  useEffect(() => {
    if (uid && uid !== "undefined") {
      GetPersonajeByUid(dispatch, uid);

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

      setImageSrc(uidToImageMap[uid] || luke);
    }
  }, [uid, dispatch]);

  if (loadingDetalle) return <div className="loading">Loading character details...</div>;
  if (errorDetalle) return <div className="error">Error: {errorDetalle.message}</div>;
  if (!personajeDetalle) return <div>No character data available</div>;

  const characterData = personajeDetalle.result?.properties || {};
  
  const esFavorito = favoritos.some(fav => 
    String(fav.uid) === String(personajeDetalle.result?.uid) && 
    fav.type === 'personaje' &&
    fav.name === characterData.name
  )

  const handleToggleFavorito = () => {
    const uid = personajeDetalle.result?.uid
    const safePersonajeData = personajeDetalle.result?.properties || {}
    
    dispatch(toggleFavorito({
      uid,
      type: 'personaje',
      name: characterData.name,
      ...safePersonajeData
    }));
  };

  return (
    <div className="character-detail">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back to list
      </button>

      <div className="character-image-container">
        <img 
          src={imageSrc} 
          alt={characterData.name} 
          className="character-image"
        />
      </div>

      <h1>{characterData.name || 'Unknown Character'}</h1>

      <button 
        onClick={handleToggleFavorito}
        className={`favorite-btn ${esFavorito ? 'active' : ''}`}
        aria-label={esFavorito ? 'Quitar de favoritos' : 'Añadir a favoritos'}
      >
        {esFavorito ? '❤️' : '♡'}
      </button>

      <div className="character-properties">
        <p><strong>Height:</strong> {characterData.height} cm</p>
        <p><strong>Mass:</strong> {characterData.mass} kg</p>
        <p><strong>Hair Color:</strong> {characterData.hair_color}</p>
        <p><strong>Skin Color:</strong> {characterData.skin_color}</p>
        <p><strong>Eye Color:</strong> {characterData.eye_color}</p>
        <p><strong>Birth Year:</strong> {characterData.birth_year}</p>
        <p><strong>Gender:</strong> {characterData.gender}</p>
      </div>
    </div>
  );
}

export default DetallePersonajes;