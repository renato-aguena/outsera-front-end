import axios from "axios";

const API_TIMEOUT = 15000;

export const apiClient = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL || "https://challenge.outsera.tech/api",
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject({
      message:
        error.response?.data?.message || "Erro ao buscar os dados no servidor",
    }),
);
