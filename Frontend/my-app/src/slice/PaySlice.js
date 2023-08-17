import { createSlice, createAsyncThunk, configureStore } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk("data/fetch", async () => {
  const response = await fetch("/api/data");
  const data = await response.json();
  return data;
});

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

const PayStore = configureStore({
  reducer: {
    data: dataSlice.reducer,
  },
});

export default PayStore;
