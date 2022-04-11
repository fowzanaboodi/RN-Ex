import axios from "axios";
import { API_URL } from "@env";
import { AsyncStorage } from "react-native";



export const BASE_URL = API_URL;
export const AUTH_TOKEN = "";

const config = {
  baseURL: BASE_URL,
  headers: {
    ["Authorization"]: `bearer ${AUTH_TOKEN}`,
  },
};

const serverCall = axios.create(config);

//Calling endpoints using 'axios' to avoid header overwrite .
export const signIn = (signInData) =>
  axios.post(`${BASE_URL}/auth/local`, signInData);

export const getDeliveredItems = () =>
  serverCall.get(`${BASE_URL}/orders/count?status=delivered`);
export const getCancelledItems = () =>
  serverCall.get(`${BASE_URL}/orders/count?status=cancelled`);

export const getItems = () => serverCall.get(`${BASE_URL}/item-requests`);
export const getItemById = (item_id) =>
  serverCall.get(`${BASE_URL}/item-requests/${item_id}`);
export const createItem = (newItem) =>
  serverCall.post(`${BASE_URL}/item-requests`, newItem);
export const updateItem = (id, item) =>
  serverCall.put(`${BASE_URL}/item-requests/${id}`, item);
export const uploadfile = (file) =>
  serverCall.post(`${BASE_URL}/upload/`, file, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
