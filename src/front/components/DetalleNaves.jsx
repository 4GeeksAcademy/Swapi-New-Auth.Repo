import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GetNaveByUid } from '../../services/fetch.js';
import useGlobalReducer from '../../front/hooks/useGlobalReducer.jsx';
import { toggleFavorito } from '../hooks/actions.js';
import '../styles/detalleNaves.css';

import cr90 from '../assets/Naves/01-CR90.jpg';
import starDestroyer from '../assets/Naves/02-Star Destroyer.jpg';
import sentinel from '../assets/Naves/03-Sentinel Class.jpg';
import deathStar from '../assets/Naves/04-Death Star.jpg';
import yWing from '../assets/Naves/05-Y-Wing.jpg';
import falcon from '../assets/Naves/06-millenium Falcon.jpg';
import tie from '../assets/Naves/07-TIE.jpg';
import executor from '../assets/Naves/08-Executor.jpg';
import xWing from '../assets/Naves/09-X-Wing.jpg';
import rebelTransport from '../assets/Naves/10-Rebel Transport.jpg';

function DetalleNaves() {
  const { uid } = useParams();
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();
  const { naveDetalle, loadingDetalleNave, errorDetalleNave, favoritos } = store;
  const [imageSrc, setImageSrc] = useState();

  useEffect(() => {
    if (uid && uid !== "undefined") {
      GetNaveByUid(dispatch, uid);
      
      const uidToImageMap = {
        "2": cr90,
        "3": starDestroyer,
        "5": sentinel,
        "9": deathStar,
        "11": yWing,
        "12": falcon,
        "13": tie,
        "15": executor,
        "10": xWing,
        "17": rebelTransport
      };

      setImageSrc(uidToImageMap[uid] || "No Image Aviable");
    }
  }, [uid, dispatch]);

  if (loadingDetalleNave) return <div>Loading starship details...</div>;
  if (errorDetalleNave) return <div>Error: {errorDetalleNave.message}</div>;
  if (!naveDetalle || !naveDetalle.result) return <div>No starship data available</div>;

  const starshipData = naveDetalle.result.properties || {};
  
  const esFavorito = favoritos.some(fav => fav.uid === naveDetalle.uid && fav.type === 'nave' && fav.name === starshipData.name);

  const handleToggleFavorito = () => {    
    dispatch(toggleFavorito({
      uid: naveDetalle.uid,
      type: 'nave',
      name: starshipData.name,
      ...starshipData
    }));
  };

  return (
    <div className="starship-detail">
      <button onClick={() => navigate(-1)} className="back-button">← Back to list</button>
      
      <div className="starship-image-container">
        <img src={imageSrc} alt={starshipData.name} className="starship-image" />
      </div>

      <h1>{starshipData.name || 'Unknown starship'}</h1>

      <button
        onClick={handleToggleFavorito}
        className={`favorite-button ${esFavorito ? 'active' : ''}`}
      >
        {esFavorito ? '❤️' : '♡'}
      </button>
      
      <div className="starship-properties">
        <p><strong>Model:</strong> {starshipData.model}</p>
        <p><strong>Manufacturer:</strong> {starshipData.manufacturer}</p>
        <p><strong>Cost in Credits:</strong> {starshipData.cost_in_credits}</p>
        <p><strong>Length:</strong> {starshipData.length} m</p>
        <p><strong>Max Atmosphering Speed:</strong> {starshipData.max_atmosphering_speed}</p>
        <p><strong>Crew:</strong> {starshipData.crew}</p>
        <p><strong>Passengers:</strong> {starshipData.passengers}</p>
        <p><strong>Cargo Capacity:</strong> {starshipData.cargo_capacity} kg</p>
        <p><strong>Consumables:</strong> {starshipData.consumables}</p>
        <p><strong>Hyperdrive Rating:</strong> {starshipData.hyperdrive_rating}</p>
        <p><strong>MGLT:</strong> {starshipData.MGLT}</p>
        <p><strong>Starship Class:</strong> {starshipData.starship_class}</p>
      </div>
    </div>
  );
}

export default DetalleNaves;