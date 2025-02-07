import axios, { AxiosError } from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error("Error en la API:", error.message);
    return Promise.reject(handleError);
  }
);

const handleError = (error: AxiosError) => {
  if (error.response) {
    return {
      status: error.response.status,
      message: error.response.data || "Error en la respuesta del servidor",
    };
  } else if (error.request) {
    return {
      status: 0,
      message: "No se recibió respuesta del servidor. Verifica tu conexión.",
    };
  } else {
    return {
      status: -1,
      message: "Error inesperado al procesar la solicitud.",
    };
  }
};