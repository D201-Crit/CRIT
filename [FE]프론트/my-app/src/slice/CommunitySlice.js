import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../common/api/http-common';

export const loadBadge = createAsyncThunk(
  'LOAD_BADGE',
  async (arg, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/record/badge');
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
