import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getItems,
  getItemById,
  createItem,
  updateItem,
} from "../../apiService";

export const getAllItemsAsync = createAsyncThunk("items/getItems", async () => {
  const response = await getItems();
  return response.data;
});

export const getItemsByIdAsync = createAsyncThunk(
  "items/getItemByItem",
  async (id) => {
    const response = await getItemById(id);
    return response.data;
  }
);
export const createItemAsync = createAsyncThunk(
  "items/createNewItem",
  async (item) => {
    const response = await createItem(item);
    return response.data;
  }
);
export const updateItemAsync = createAsyncThunk(
  "items/updateNewItem",
  async (data) => {
    const { id, item } = data;
    const response = await updateItem(id, item);
    return response.data;
  }
);

export const itemsSlice = createSlice({
  name: "items",
  initialState: {
    items: [],
    seletectedItem: {},
    error: null,
    status: null,
  },
  reducers: {
    // getItems: (state) => {},
  },
  extraReducers: {
    [getAllItemsAsync.pending]: (state) => {
      state.error = null;
      state.status = "Getting Items..";
    },
    [getAllItemsAsync.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "Items Fetched";
    },
    [getAllItemsAsync.rejected]: (state, action) => {
      const { message } = action.error;
      state.error = message;
      state.status = "Error fetching Items";
    },
    [getItemsByIdAsync.pending]: (state, action) => {
      state.seletectedItem = {};
      state.status = null;
    },
    [getItemsByIdAsync.fulfilled]: (state, action) => {
      state.seletectedItem = action.payload;
      state.status = "Items Updated";
    },
    [createItemAsync.pending]: (state) => {
      state.error = null;
      state.status = "Adding Item..";
    },
    [createItemAsync.fulfilled]: (state, action) => {
      state.status = "Item Added";
    },
    [createItemAsync.rejected]: (state, action) => {
      const { message } = action.error;
      state.error = message;
      state.status = "Error Adding Item";
    },
    [updateItemAsync.pending]: (state) => {
      state.error = null;
      state.status = "Updating Item..";
    },
    [updateItemAsync.fulfilled]: (state, action) => {
      state.status = "Item Updated";
    },
    [updateItemAsync.rejected]: (state, action) => {
      const { message } = action.error;
      state.error = message;
      state.status = "Error Updating Item";
    },
  },
});

// export const { } = itemsSlice.actions;

export const selectItems = (state) => state.items.items;
export const selectItemById = (state) => state.items.seletectedItem;
export const selectStatus = (state) => state.items.status;
export const selectError = (state) => state.items.error;
export default itemsSlice.reducer;
