import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [passwordErrors, setPasswordErrors] = useState([]); // Состояние для ошибок пароля
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Проверка на совпадение паролей
    if (password !== confirmPassword) {
      setMessage("Пароли не совпадают!");
      return;
    }

    const newUser = {
      username,
      password,
    };

    // Отправляем запрос на регистрацию
    api.post("/auth/users/", newUser)
      .then(() => {
        setMessage("Регистрация прошла успешно! Перенаправление на страницу входа...");
        setTimeout(() => navigate("/login"), 2000); // Перенаправляем на страницу входа через 2 секунды
      })
      .catch((error) => {
        console.error("Ошибка при регистрации:", error.response?.data || error);
        if (error.response?.data) {
          // Если есть ошибки от сервера, обновляем их
          const errors = error.response.data.password || [];
          setPasswordErrors(errors); // Сохраняем ошибки пароля в состоянии
        }
      });
  };

  return (
    <div className="container w-25">
  <h1 className="text-center">Регистрация</h1>
  <form onSubmit={handleRegister}>
    <div className="mb-3">
      <label htmlFor="loginInput" className="form-label">Логин</label>
      <input
        className="form-control"
        type="text"
        placeholder="Введите логин"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        id="loginInput"
      />
    </div>
    <div className="mb-3">
      <label htmlFor="passwordInput" className="form-label">Пароль</label>
      <input
        className="form-control"
        type="password"
        placeholder="Введите пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        id="passwordInput"
      />
    </div>
    <div className="mb-3">
      <label htmlFor="confirmPasswordInput" className="form-label">Подтвердите пароль</label>
      <input
        className="form-control"
        type="password"
        placeholder="Введите пароль ещё раз"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        id="confirmPasswordInput"
      />
    </div>
    <button type="submit" className="btn btn-primary">Зарегистрироваться</button>
  </form>

  {message && <p>{message}</p>}

  {passwordErrors.length > 0 && (
    <div>
      <h3>Ошибки при регистрации пароля:</h3>
      <ul>
        {passwordErrors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    </div>
  )}
</div>

  );
};

export default Register;
