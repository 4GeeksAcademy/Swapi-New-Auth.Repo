import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GetPlanetaByUid } from '../../services/fetch.js';
import useGlobalReducer from '../../front/hooks/useGlobalReducer.jsx';
import { toggleFavorito } from '../hooks/actions.js';

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

function DetallePlanetas() {
    const { uid } = useParams();
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();
    const { planetaDetalle, loadingDetalle, errorDetalle, favoritos } = store;
    const [imageSrc, setImageSrc] = useState();

    useEffect(() => {
        if (uid && uid !== "undefined") {
            GetPlanetaByUid(dispatch, uid);

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

            setImageSrc(uidToImageMap[uid] || tatooine);
        }
    }, [uid, dispatch]);

    if (loadingDetalle) return <div>Loading planet details...</div>;
    if (errorDetalle) return <div>Error: {errorDetalle.message}</div>;
    if (!planetaDetalle) return <div>No planet data available</div>;

    const planetData = planetaDetalle.result?.properties || {};
    const esFavorito = favoritos.some(fav => 
        fav.uid === planetaDetalle.uid && 
        fav.type === 'planeta' &&
        fav.name === planetData.name
    );

    const handleToggleFavorito = () => {
        dispatch(toggleFavorito({
            uid: planetaDetalle.uid,
            type: 'planeta',
            name: planetData.name,
            ...planetData
        }));
    };

    return (
        <div className="planet-detail">
            <button onClick={() => navigate(-1)} className="back-button">
                ← Back to list
            </button>

            <div className="planet-image-container">
                <img 
                    src={imageSrc} 
                    alt={planetData.name} 
                    className="planet-image"
                />
            </div>

            <h1>{planetData.name || 'Unknown Planet'}</h1>

            <button
                onClick={handleToggleFavorito}
                className={`favorite-button ${esFavorito ? 'active' : ''}`}
            >
                {esFavorito ? '❤️' : '♡'}
            </button>

            <div className="planet-properties">
                <p><strong>Climate:</strong> {planetData.climate}</p>
                <p><strong>Diameter:</strong> {planetData.diameter} km</p>
                <p><strong>Gravity:</strong> {planetData.gravity}</p>
                <p><strong>Orbital Period:</strong> {planetData.orbital_period} days</p>
                <p><strong>Population:</strong> {planetData.population}</p>
                <p><strong>Rotation Period:</strong> {planetData.rotation_period} hours</p>
                <p><strong>Surface Water:</strong> {planetData.surface_water}%</p>
                <p><strong>Terrain:</strong> {planetData.terrain}</p>
            </div>

            <style jsx>{`
                .planet-detail {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                }
                .planet-image-container {
                    display: flex;
                    justify-content: center;
                    margin: 20px 0;
                }
                .planet-image {
                    width: 500px;
                    height: 300px;
                    object-fit: cover;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                }
                .back-button {
                    background: #333;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 4px;
                    cursor: pointer;
                    margin-bottom: 20px;
                }
                .favorite-button {
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    margin-left: 10px;
                }
                .planet-properties {
                    background: #f5f5f5;
                    padding: 20px;
                    border-radius: 8px;
                    margin-top: 20px;
                }
            `}</style>
        </div>
    );
}

export default DetallePlanetas;