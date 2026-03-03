import axios from "axios";

const API = "http://127.0.0.1:8000/api";

export const predictIris = async (data) => {
  const response = await axios.post(`${API}/predict`, data);
  return response.data;
};