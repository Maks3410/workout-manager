import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

const ExerciseDetail = () => {
  const { id } = useParams(); // Получаем ID упражнения из URL
  const navigate = useNavigate();

  const [exercise, setExercise] = useState(null);
  const [name, setName] = useState("");
  const [muscleGroup, setMuscleGroup] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    // Загружаем данные упражнения
    api.get(`/exercises/${id}/`)
      .then((response) => {
        setExercise(response.data);
        setName(response.data.name);
        setMuscleGroup(response.data.muscle_group);
        setDescription(response.data.description);
      })
      .catch((error) => console.error("Ошибка загрузки упражнения:", error));
  }, [id]);

  const handleSave = () => {
    // Сохраняем изменения
    api.patch(`/exercises/${id}/`, { name, muscle_group: muscleGroup, description })
      .then(() => alert("Изменения сохранены!"))
      .catch((error) => console.error("Ошибка при сохранении:", error));
  };

  const handleDelete = () => {
    // Удаляем упражнение
    api.delete(`/exercises/${id}/`)
      .then(() => {
        alert("Упражнение удалено!");
        navigate("/"); // Перенаправляем на главную страницу
      })
      .catch((error) => console.error("Ошибка при удалении:", error));
  };

  if (!exercise) return <p>Загрузка...</p>;

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title text-center mb-4">{exercise.name}</h1>
          <form>
            <div className="mb-3">
              <label htmlFor="exerciseName" className="form-label">
                Переименовать:
              </label>
              <input
                id="exerciseName"
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="muscleGroup" className="form-label">
                Рабочая мышца:
              </label>
              <input
                id="muscleGroup"
                type="text"
                className="form-control"
                value={muscleGroup}
                onChange={(e) => setMuscleGroup(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Описание:
              </label>
              <textarea
                id="description"
                className="form-control"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-success"
                onClick={handleSave}
              >
                Сохранить изменения
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDelete}
              >
                Удалить упражнение
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetail;
