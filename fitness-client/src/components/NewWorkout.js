import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const NewWorkout = () => {
  const [date, setDate] = useState(""); // Дата тренировки
  const [name, setName] = useState(""); // Имя тренировки (необязательно)
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleCreateWorkout = (e) => {
    e.preventDefault();

    // Формируем данные для создания тренировки
    const newWorkout = {
      date,
      sets: [], // Отправляем пустой список подходов
      ...(name && { name }), // Добавляем имя, только если оно указано
    };

    api.post("/workouts/", newWorkout)
      .then((response) => {
        setMessage("Тренировка успешно добавлена!");
        navigate(`/workouts/${response.data.id}`); // Перенаправляем на страницу тренировки
      })
      .catch((error) => {
        console.error("Ошибка при добавлении тренировки:", error.response?.data || error);
        setMessage("Ошибка при добавлении тренировки.");
      });
  };

  return (
    <div className="container mt-5">
  <div className="card">
    <div className="card-body">
      <h1 className="card-title text-center">Добавить новую тренировку</h1>
      <form onSubmit={handleCreateWorkout}>
        <div className="mb-3">
          <label htmlFor="workoutName" className="form-label">
            Имя тренировки (необязательно):
          </label>
          <input
            type="text"
            id="workoutName"
            className="form-control"
            placeholder="Введите имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="workoutDate" className="form-label">
            Дата тренировки:
          </label>
          <input
            type="date"
            id="workoutDate"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-100">
          Создать тренировку
        </button>
      </form>
      {message && <p className="text-center text-success mt-3">{message}</p>}
    </div>
  </div>
</div>

  );
};

export default NewWorkout;
