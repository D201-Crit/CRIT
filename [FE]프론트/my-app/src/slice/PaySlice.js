// store.js
import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async () => {
    const response = await api.get('/messages/received');
    return response.data;
  }
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(fetchMessages.fulfilled, (_, action) => {
      return action.payload;
    });
  },
});

const PayStore = configureStore({
  reducer: {
    messages: messagesSlice.reducer,
  },
});

export default PayStore;
