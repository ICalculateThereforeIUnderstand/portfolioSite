import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

/*U ovom projektu sam koristio redux za dvije varijable - jezik (en ili hr) te hoverSw koji za true govori da uredaj ima hover capability, i onda 
 * se vrlo vjerojatno radi o laptopu, a ne o smartphoneu. redux je za ovaj projekt overkill i moj prvi izbor bi bio koristenje contexta, ali odlucio sam se 
 * za ovu varijantu radi vjezbanja jer sam upravo zavrsio sa ucenjem reduxa.*/

const POSTAVI_JEZIK = "postavi_jezik";
const POSTAVI_HOVERSW = "postavi_hoverSw";

export const postaviJezik = (jezik = "en") => {
  return {
    type: POSTAVI_JEZIK,
    payload: jezik
  }
}

export const postaviHoverSw = (hoverSw = true) => {
  return {
    type: POSTAVI_HOVERSW,
    payload: hoverSw
  }
}

const initialState = {
  jezik: "en",
  hoverSw: true
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case POSTAVI_JEZIK: return {
      ...state,
      jezik: action.payload
    }
    
    case POSTAVI_HOVERSW: return {
      ...state,
      hoverSw: action.payload
    }

    default: return state
  }
}

//export const store = createStore(reducer);
export const store = createStore(reducer, applyMiddleware(logger));
