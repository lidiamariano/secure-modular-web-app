import axios from "axios";

// Obtém a URL base da API a partir das variáveis de ambiente
const API_URL = import.meta.env.VITE_API_URL || "/api";

// Cria uma instância do Axios com a configuração inicial
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar o token de autenticação às requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar respostas e erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Remove o token e redireciona para a página de login em caso de erro 401
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Função genérica para realizar requisições à API
export async function apiRequest(path, method = "GET", body = null) {
  try {
    const response = await api.request({
      url: path,
      method,
      data: body,
    });

    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    // Trata erros de forma consistente
    return {
      status: error.response?.status || 500,
      data: error.response?.data || { message: "Erro inesperado" },
    };
  }
}
