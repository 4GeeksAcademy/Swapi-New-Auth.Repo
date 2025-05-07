const base_Url = "https://www.swapi.tech/api/";

export const GetPersonajes = async (dispatch) => {
  try {
    dispatch({ type: "GET_PERSONAJES_LOADING" });
    const response = await fetch(`${base_Url}people`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    if (!data?.results) throw new Error("Unexpected data format");
    dispatch({ type: "GET_PERSONAJES_SUCCESS", payload: data.results });
  } catch (error) {
    dispatch({ type: "GET_PERSONAJES_ERROR", payload: error.message });
  }
};

export const GetPersonajeByUid = async (dispatch, uid) => {
  dispatch({ type: 'LOADING_DETALLE_PERSONAJE' });
  try {
    const response = await fetch(`${base_Url}/people/${uid}`);  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }  
    const data = await response.json();
    if (!data.result) {
      throw new Error('Unexpected data format');
    }  
    dispatch({ type: 'SET_PERSONAJE_DETALLE', payload: data });
  } catch (error) {
    console.error('Error fetching character:', error);
    dispatch({ 
      type: 'ERROR_DETALLE_PERSONAJE', 
      payload: { 
        message: error.message || 'Failed to load character details' 
      } 
    });
  }
};
//---------------------------------------------------------

export const GetPlanetas = async (dispatch) => {
  try {
    dispatch({ type: "GET_PLANETAS_LOADING" });
    const response = await fetch(`${base_Url}planets`);
    if (!response.ok) throw new Error(`HTTP error! status ${response.status}`);
    const data = await response.json();
    if (!data.results) throw new Error("Unexpected data format");
    dispatch({ type: "GET_PLANETAS_SUCCESS", payload: data.results });
  } catch (error) {
    dispatch({ type: "GET_PLANETAS_ERROR", payload: error.message });
  }
};

export const GetPlanetaByUid = async (dispatch, uid) => {
  dispatch({ type: 'LOADING_DETALLE_PLANETA' });
  try {
    const response = await fetch(`${base_Url}/planets/${uid}`);  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }  
    const data = await response.json();
    if (!data.result) {
      throw new Error('Unexpected data format');
    }  
    dispatch({ type: 'SET_PLANETA_DETALLE', payload: data });
  } catch (error) {
    console.error('Error fetching planet:', error);
    dispatch({ 
      type: 'ERROR_DETALLE_PLANETA', 
      payload: { 
        message: error.message || 'Failed to load planet details' 
      } 
    });
  }
};
//---------------------------------------------------------
export const GetNaves = async (dispatch) => {
  try{
    dispatch({ typa: "GET_NAVES_LOADING" });
    const response = await fetch(`${base_Url}starships`);
    if (!response.ok) throw new Error (`HTTP error! status ${response.status}`);
    const data = await response.json();
    if (!data.results) throw new Error ("Unexpected data format");
    dispatch({ type: "GET_NAVES_SUCCESS", payload: data.results });
  } catch (error) {
    dispatch({ type: "GET_NAVES_ERROR", payload: error.message });
  }
};

export const GetNaveByUid = async (dispatch, uid) => {
  dispatch({ type: 'LOADING_DETALLE_NAVE' });
  try {
    const response = await fetch(`${base_Url}/starships/${uid}`);  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }  
    const data = await response.json();
    if (!data.result) {
      throw new Error('Unexpected data format');
    }  
    dispatch({ type: 'SET_NAVE_DETALLE', payload: data });
  } catch (error) {
    console.error('Error fetching starship:', error);
    dispatch({ 
      type: 'ERROR_DETALLE_NAVE', 
      payload: { 
        message: error.message || 'Failed to load starship details' 
      } 
    });
  }
};