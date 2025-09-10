import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BACKEND,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
