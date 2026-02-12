import axios from "axios";

const hostname = window.location.hostname;
const BASE_URL = import.meta.env.DEV ? `http://${hostname}:4001` : "/";

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
