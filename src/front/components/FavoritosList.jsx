import React from 'react';
import useGlobalReducer from "../hooks/useGlobalReducer";

function FavoritosList() {
  const { store, dispatch } = useGlobalReducer();
  const { favoritos } = store;


  const groupedFavorites = favoritos.reduce((acc, fav) => {
    if (!acc[fav.type]) {
      acc[fav.type] = {
        items: [],
        label: fav.type === 'personaje' ? 'Characters' : 
               fav.type === 'planeta' ? 'Planets' : 'Starships'
      };
    }
    acc[fav.type].items.push(fav);
    return acc;
  }, {});

  return (
    <div className="favoritos-container">
      <h2>Favorites ({favoritos.length})</h2>
      
      {Object.entries(groupedFavorites).map(([type, group]) => (
        <div key={type} className="categoria">
          <h3>{group.label} ({group.items.length})</h3>
          {group.items.map(item => (
            <div key={`${type}_${item.uid}`} className="favorito-item">
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      ))}

      {favoritos.length === 0 && (
        <p className="empty-message">No Favorites Selected</p>
      )}
    </div>
  );
}

export default FavoritosList;