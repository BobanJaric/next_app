import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch data
export const fetchAircraft = createAsyncThunk('aircraft/fetchData', async () => {
  const response = await axios.get('/api/aircraft');
  return response.data;
});

const aircraftSlice = createSlice({
  name: 'aircraft',
  initialState: {
    aircraft: [],
    aircraftIsLoading: false,
    aircraftError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAircraft.pending, (state) => {
        state.crewIsLoading= true;
      })
      .addCase(fetchAircraft.fulfilled, (state, action) => {
        state.crewIsLoading= false;
        state.aircraft = action.payload;
      })
      .addCase(fetchAircraft.rejected, (state, action) => {
        state.crewIsLoading= false;
        state.crewError = action.error.message;
      });
  },
});

export default aircraftSlice.reducer;