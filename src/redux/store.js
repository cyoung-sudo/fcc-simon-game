import { configureStore } from '@reduxjs/toolkit';
// Reducer
import reducer from './reducers/index';

export default configureStore({
  reducer
});