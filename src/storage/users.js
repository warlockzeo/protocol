//import React from 'react';

function reducer(state = { users: [] }, action) {
  switch (action.type) {
    case "List":
      return { users: action.data };
    default:
      return "Carregando";
  }
}

export default reducer;
