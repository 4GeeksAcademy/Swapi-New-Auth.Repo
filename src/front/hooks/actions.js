export const toggleFavorito = (item) => ({
    type: 'TOGGLE_FAVORITO',
    payload: {
      uid: item.uid,
      type: item.type,
      name: item.name || item.properties?.name,
      ...(item.properties || item)
    }
  });