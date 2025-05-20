import { configureStore } from '@reduxjs/toolkit';
import exampleReducer from './slices/exampleSlice';
import crewReducer from './slices/crewSlice';
import aircraftReducer from './slices/aircraftSlice';

export const store = configureStore({
  reducer: {
    example: exampleReducer,
    crew: crewReducer,
    aircraft: aircraftReducer,
  },
});