import React, { useState } from "react";
import api from "../api";

const AddExercise = () => {
  const [name, setName] = useState("");
  const [muscleGroup, setMuscleGroup] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Формируем тело запроса
    const newExercise = {
      name,
      muscle_group: muscleGroup,
      description,
    };

    // Отправляем POST-запрос
    api.post("/exercises/", newExercise)
      .then((response) => {
        setMessage("Упражнение добавлено успешно!");
        // Очищаем поля после успешной отправки
        setName("");
        setMuscleGroup("");
        setDescription("");
      })
      .catch((error) => {
        console.error("Ошибка при добавлении упражнения:", error);
        setMessage("Ошибка при добавлении упражнения.");
      });
  };

  return (
    <div className="container mt-5">
  <div className="card">
    <div className="card-body">
      <h1 className="card-title text-center">Добавить упражнение</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exerciseName" className="form-label">
            Название:
          </label>
          <input
            type="text"
            id="exerciseName"
            className="form-control"
            placeholder="Введите название"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="muscleGroup" className="form-label">
            Группа мышц:
          </label>
          <input
            type="text"
            id="muscleGroup"
            className="form-control"
            placeholder="Введите группу мышц"
            value={muscleGroup}
            onChange={(e) => setMuscleGroup(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Описание:
          </label>
          <textarea
            id="description"
            className="form-control"
            placeholder="Введите описание"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-success w-100">
          Добавить
        </button>
      </form>
      {message && <p className="text-center text-success mt-3">{message}</p>}
    </div>
  </div>
</div>

  );
};

export default AddExercise;
