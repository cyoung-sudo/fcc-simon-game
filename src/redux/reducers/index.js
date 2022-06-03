// Slices
import displayReducer from './displaySlice';
import colorsReducer from './colorsSlice';
import controlsReducer from './controlsSlice';
// Redux
import { combineReducers } from 'redux';

// Combine slice reducers
export default combineReducers({
  display: displayReducer,
  colors: colorsReducer,
  controls: controlsReducer
});