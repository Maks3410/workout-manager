import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const api = axios.create({
  baseURL: "http://localhost:8000", // Базовый URL
});

// Добавляем токен в каждый запрос
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const saveTokens = (tokens) => {
    localStorage.setItem("access", tokens.access);
    localStorage.setItem("refresh", tokens.refresh);
    setAccessToken(tokens.access);
  };

  const fetchUser = async () => {
    try {
      const response = await api.get("/auth/users/me/");
      setUser(response.data);
    } catch (error) {
      console.error("Ошибка загрузки пользователя:", error);
      logout();
    }
  };

  const login = async (username, password) => {
    try {
      const response = await api.post("/auth/jwt/create/", { username, password });
      saveTokens(response.data);
      await fetchUser();
    } catch (error) {
      console.error("Ошибка при входе:", error.response.data);
      alert("Неправильное имя пользователя или пароль!");
    }
  };

  const register = async (username, password) => {
    try {
      await api.post("/auth/users/", { username, password });
      await login(username, password);
    } catch (error) {
      console.error("Ошибка при регистрации:", error.response.data);
      alert("Не удалось зарегистрировать пользователя!");
    }
  };

  const refreshToken = async () => {
    try {
      const refresh = localStorage.getItem("refresh");
      const response = await api.post("/auth/jwt/refresh/", { refresh });
      saveTokens(response.data);
    } catch (error) {
      console.error("Не удалось обновить токен:", error);
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setAccessToken(null);
    setUser(null);
  };

  useEffect(() => {
    const storedAccess = localStorage.getItem("access");
    const storedRefresh = localStorage.getItem("refresh");
    if (storedAccess && storedRefresh) {
      setAccessToken(storedAccess);
      fetchUser();
    }
  }, []);

  // Перехватчик для обработки ошибок
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          await refreshToken();
          originalRequest.headers.Authorization = `Bearer ${localStorage.getItem("access")}`;
          return api(originalRequest);
        } catch (err) {
          logout();
          return Promise.reject(err);
        }
      }

      return Promise.reject(error);
    }
  );

  return (
    <AuthContext.Provider value={{ user, login, register, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};
