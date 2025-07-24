import axios from "axios";
import type { VehicleBodyRequest } from "../types/Types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getVehicles = async () => {
  const response = await api.get("/vehicles");
  return response.data;
};

export const getColors = async () => {
  const response = await api.get("/colors");
  return response.data;
};

export const getBrands = async () => {
  const response = await api.get("/brands");
  return response.data;
};

export const getModelLines = async (id: string) => {
  const response = await api.get(`/modellines/by-brand/${id}`);
  return response.data;
};

export const getVehicleById = async (id: string) => {
  const response = await api.get(`/vehicles/${id}`);
  return response.data;
};

export const searchVehicleByText = async (text: string) => {
  const response = await api.get(`/vehicles/search/${text}`);
  return response.data;
};

export const searchVehicleByPlate = async (plate: string) => {
  const response = await api.get(`/vehicles/search-by-plate/${plate}`);
  return response.data;
};

export const sendVehicleToRepair = async (id: string) => {
  const response = await api.patch(`/vehicles/send-to-repair/${id}`);
  return response.data;
};

export const updateVehicleById = async (id: string, bodyRequest: VehicleBodyRequest) => {
  const response = await api.put(`/vehicles/${id}`, bodyRequest);
  return response.data;
};

export const registerVehicle = async (bodyRequest: VehicleBodyRequest) => {
  const response = await api.post(`/vehicles`, bodyRequest);
  return response.data;
};

export const uploadMultipleImages = async (formData: FormData) => {
  const response = await api.post("/images/upload-multiple", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  })
  return response.data;
};

export const deleteImageById = async (id: string) => {
  const response = await api.delete(`/images/${id}`);
  return response.data;
};

export const deleteVehicleById = async (id: string) => {
  const response = await api.delete(`/vehicles/${id}`);
  return response.data;
};

export default api;
