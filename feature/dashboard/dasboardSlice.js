import axios from "axios";
import { API_URL } from "@env";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getItems,
  getDeliveredItems,
  getCancelledItems,
} from "../../apiService";

export const getAllItemsCountAsync = createAsyncThunk(
  "items/getItems",
  async (token) => {
    const config = {
      headers: {
        ["Authorization"]: `bearer ${token}`,
      },
    };
    const response = await axios.get(`${API_URL}/item-requests`, config);
    return response.data;
  }
);

export const getDeliveredAsync = createAsyncThunk(
  "dashboard/deliveredItems",
  async (token) => {
    const config = {
      headers: {
        ["Authorization"]: `bearer ${token}`,
      },
    };
    const response = await axios.get(
      `${API_URL}/orders/count?status=delivered`,
      config
    );
    return response.data;
  }
);
export const getCancelledAsync = createAsyncThunk(
  "dashboard/cancelItems",
  async (token) => {
    const config = {
      headers: {
        ["Authorization"]: `bearer ${token}`,
      },
    };
    const response = await axios.get(
      `${API_URL}/orders/count?status=cancelled`,
      config
    );
    return response.data;
  }
);

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    totalItems: 0,
    delieveredOrders: 0,
    cancelledOrders: 0,
  },
  reducers: {
    // getItems: (state) => {},
  },
  extraReducers: {
    [getAllItemsCountAsync.fulfilled]: (state, action) => {
      const itemsCount = action.payload;
      state.totalItems = itemsCount.length;
    },

    [getDeliveredAsync.fulfilled]: (state, action) => {
      state.delieveredOrders = action.payload;
    },
    [getCancelledAsync.fulfilled]: (state, action) => {
      state.cancelledOrders = action.payload;
    },
  },
});

// export const { } = itemsSlice.actions;

export const selectItems = (state) => state.dashboard.totalItems;
export const selectDeliveredItems = (state) => state.dashboard.delieveredOrders;
export const selectCancelledItems = (state) => state.dashboard.cancelledOrders;
export default dashboardSlice.reducer;
