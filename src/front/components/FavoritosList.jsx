import React from 'react';
import { useNavigate } from 'react-router-dom';
import useGlobalReducer from "../hooks/useGlobalReducer";


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

import cr90 from '../assets/Naves/01-CR90.jpg';
import starDestroyer from '../assets/Naves/02-Star Destroyer.jpg';
import sentinelClass from '../assets/Naves/03-Sentinel Class.jpg';
import deathStar from '../assets/Naves/04-Death Star.jpg';
import yWing from '../assets/Naves/05-Y-Wing.jpg';
import milleniumFalcon from '../assets/Naves/06-millenium Falcon.jpg';
import tie from '../assets/Naves/07-TIE.jpg';
import executor from '../assets/Naves/08-Executor.jpg';
import xWing from '../assets/Naves/09-X-Wing.jpg';
import rebelTransport from '../assets/Naves/10-Rebel Transport.jpg';

import tatooine from '../assets/Planetas/01-Tatooine.jpg'
import alderaan from '../assets/Planetas/02-Alderaan.jpg'
import yavin from '../assets/Planetas/03-Yavin IV.jpg'
import hoth from '../assets/Planetas/04-Hoth.jpg'
import dagobah from '../assets/Planetas/05-Dagobah.jpg'
import bespin from '../assets/Planetas/06-Bespin.jpg'
import endor from '../assets/Planetas/07-Endor.jpg'
import naboo from '../assets/Planetas/08-Naboo.jpg'
import coruscant from '../assets/Planetas/09-Coruscant.jpg'
import kamino from '../assets/Planetas/10-Kamino.jpg'

const imageMap = {
  personaje: {
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
  },

  nave: {
    "2": cr90,
    "3": starDestroyer,
    "5": sentinelClass,
    "9": deathStar,
    "11": yWing,
    "12": milleniumFalcon,
    "13": tie,
    "15": executor,
    "10": xWing,
    "17": rebelTransport
  },

  planeta: {
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
  }
};


function FavoritosList() {
  const { store } = useGlobalReducer();
  const { favoritos } = store;
  const navigate = useNavigate();

  return (
    <div className="favoritos-container">
      <h2>Favorites ({favoritos.length})</h2>

      <div className="favoritos-grid">
        {favoritos.map(item => {
          const uidString = String(item.uid);
          const imageSrc = imageMap[item.type]?.[uidString];
          
          return (
            <div
              key={`${item.type}_${uidString}`}
              className="favorito-card"
              onClick={() => navigate(`/${item.type}/${uidString}`)}
            >
              <img
                src={imageSrc} 
                alt={item.name}
                className="favorito-imagen" 
              />
              <h3>{item.name}</h3>
            </div>
          );
        })}
      </div>

      {favoritos.length === 0 && (
        <p className="empty-message">No Favorites Selected</p>
      )}
    </div>
  );
}

export default FavoritosList;