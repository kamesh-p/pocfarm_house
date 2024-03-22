import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch the product data
export const getProductData = createAsyncThunk(
  "product/getProductData",
  async () => {
    try {
      const response = await fetch(
        "https://add-to-card-a30ca-default-rtdb.firebaseio.com/Products.json"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch product data.");
      }
      const data = await response.json();
      const loadedProducts = Object.entries(data).map(([key, value]) => ({
        id: key,
        ...value,
      }));
      return loadedProducts;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const initialState = {
  productData: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductData.fulfilled, (state, action) => {
        state.loading = false;
        state.productData = action.payload;
      })
      .addCase(getProductData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const productReducer = productSlice.reducer;
export default productSlice.actions;
