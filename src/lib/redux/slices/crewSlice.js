import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch data
export const fetchCrew = createAsyncThunk('crew/fetchData', async () => {
  const response = await axios.get('/api/crew');
  return response.data;
});

const crewSlice = createSlice({
  name: 'crew',
  initialState: {
    crew: [],
    crewIsLoading: false,
    crewError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCrew.pending, (state) => {
        state.crewIsLoading= true;
      })
      .addCase(fetchCrew.fulfilled, (state, action) => {
        state.crewIsLoading= false;
        state.crew = action.payload;
      })
      .addCase(fetchCrew.rejected, (state, action) => {
        state.crewIsLoading= false;
        state.crewError = action.error.message;
      });
  },
});

export default crewSlice.reducer;