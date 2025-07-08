// src/services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`, // Update if hosted differently
});

export default api;
