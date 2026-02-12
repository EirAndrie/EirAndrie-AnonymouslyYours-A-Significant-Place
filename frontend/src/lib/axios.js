import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development" ? import.meta.env.VITE_BASE_URL : ""; // Uses relative path in production

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
