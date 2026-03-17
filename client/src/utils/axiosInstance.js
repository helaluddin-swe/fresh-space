import axios from "axios";

const BASE_DOMAIN =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : import.meta.env.VITE_API_URL;

export const BASE_URL = `${BASE_DOMAIN}/api/hotels`;

export const apiJson = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const apiForm = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
});
