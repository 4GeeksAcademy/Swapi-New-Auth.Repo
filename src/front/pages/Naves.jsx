import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetNaves } from '../../services/fetch.js';
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import "../styles/naves.css";

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

function Naves() {
  const { store, dispatch } = useGlobalReducer();
  const { naves, loading, error } = store;
  const navigate = useNavigate();

  useEffect(() => {
    GetNaves(dispatch);
  }, [dispatch]);

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

  const handleClick = (nave) => {
    if (!nave.uid) {
      console.error("No UID found in starship", nave);
      return;
    }
    navigate(`/naves/${nave.uid}`);
  };

  if (loading) return <div className="loading-message">Loading Your Transport...</div>;
  if (error) return <div className="error-message">Error: {error.message}</div>;
  if (!naves || naves.length === 0) return <div className="empty-message">No Transport Available</div>;

  return (
    <div className="naves-container">
      <h1 className="naves-title">Star Wars Starships</h1>
      
      <div className="naves-grid">
        {naves.map((nave) => {
          const imageSrc = uidToImageMap[nave.uid] || "No Image Aviable";
          return (
            <div 
              key={nave.uid}
              onClick={() => handleClick(nave)}
              className="nave-card"
            >
              <img 
                src={imageSrc} 
                alt={nave.name || nave.properties?.name || 'Unknown Starship'}
                className="nave-image"
              />
              <span className="nave-name">
                {nave.name || nave.properties?.name || 'Unknown Starship'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Naves;