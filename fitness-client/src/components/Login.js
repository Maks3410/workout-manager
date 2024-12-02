import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Сохраняем маршрут, куда пользователь пытался попасть
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate(from); // Перенаправляем на изначально запрошенную страницу
    } catch (error) {
      console.error("Ошибка входа:", error);
      alert("Не удалось войти. Проверьте имя пользователя и пароль.");
    }
  };

  return (
    <div className="container w-25">
      <h1 className="text-center">Вход</h1>
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
        <label for="loginInput" class="form-label">Логин</label>
        <input
          class="form-control"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          id="loginInput"
        />
        </div>
        <div class="mb-3">
        <label for="passwordInput" class="form-label">Пароль</label>
        <input
          class="form-control"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          id="passwordInput"
        />
        </div>
        <button type="submit" class="btn btn-primary">Войти</button>
      </form>
    </div>
  );
};

export default Login;
