/**
  {
    uid: asdasd231,
    name: 'Julian',
  }
 */

import { types } from "../types/types";

//si no inicializo el state con un objeto vacio, el reducer de redux me tira error por undefined
export const authReducer = (state={}, action) => {
    
    switch(action.type) {
        
        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName,
            }

        case types.logout:
            return {}

        default:
            return state;
    }
}
