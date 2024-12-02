import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

const WorkoutDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [workout, setWorkout] = useState(null);
  const [sets, setSets] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [exerciseId, setExerciseId] = useState("");
  const [repetitions, setRepetitions] = useState(0);
  const [weight, setWeight] = useState(0);
  const [newName, setNewName] = useState(""); // Новое имя для тренировки
  const [showRenameForm, setShowRenameForm] = useState(false); // Показывать ли форму переименования

  useEffect(() => {
    api.get(`/workouts/${id}/`)
      .then((response) => {
        setWorkout(response.data);
        setSets(response.data.sets);
      })
      .catch((error) => console.error("Ошибка загрузки тренировки:", error));
  }, [id]);

  useEffect(() => {
    api.get("/exercises/")
      .then((response) => setExercises(response.data))
      .catch((error) => console.error("Ошибка загрузки упражнений:", error));
  }, []);

  const handleRename = (e) => {
    e.preventDefault();

    api.patch(`/workouts/${id}/`, { name: newName })
      .then((response) => {
        setWorkout(response.data);
        setShowRenameForm(false); // Скрываем форму после успешного обновления
      })
      .catch((error) => console.error("Ошибка при переименовании тренировки:", error));
  };

  const getExerciseName = (exerciseId) => {
    const exercise = exercises.find((ex) => ex.id === exerciseId);
    return exercise ? exercise.name : "Упражнение не найдено";
  };

  const handleAddSet = (e) => {
    e.preventDefault();

    const newSet = {
      exercise: exerciseId,
      repetitions,
      weight,
    };

    const updatedSets = [newSet];

    api.patch(`/workouts/${id}/`, { sets: updatedSets })
      .then((response) => {
        setSets(response.data.sets);
        setExerciseId("");
        setRepetitions(0);
        setWeight(0);
      })
      .catch((error) => console.error("Ошибка при обновлении тренировки:", error));
  };

  const handleDeleteWorkout = () => {
    api.delete(`/workouts/${id}/`)
      .then(() => {
        alert("Тренировка удалена!");
        navigate("/workouts/me");
      })
      .catch((error) => console.error("Ошибка при удалении тренировки:", error));
  };

  const handleExerciseChange = (e) => {
    const selectedValue = e.target.value;

    if (selectedValue === "add-new") {
      navigate("/add-exercise"); // Перенаправляем на страницу добавления упражнения
    } else {
      setExerciseId(selectedValue); // Устанавливаем выбранное упражнение
    }
  };


  if (!workout) return <p>Загрузка...</p>;

  return (
    <div className="container mt-4">
  <div className="card">
    <div className="card-body">
      <h1 className="card-title">
        {workout.name || `Тренировка от ${workout.date}`}
        <button
          onClick={() => setShowRenameForm(!showRenameForm)}
          className="btn btn-outline-secondary ms-3"
        >
          Переименовать
        </button>
      </h1>

      {showRenameForm && (
        <form
          onSubmit={handleRename}
          className="d-flex flex-column align-items-start mt-3"
        >
          <input
            type="text"
            placeholder="Введите новое имя"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
            className="form-control mb-2"
          />
          <button type="submit" className="btn btn-primary">
            Сохранить
          </button>
        </form>
      )}

      <p className="mt-3">
        <strong>Проработанные мышцы:</strong>{" "}
  {workout.muscles_involved?.length
    ? workout.muscles_involved.join(", ")
    : "Не указано"}
      </p>

      <h2 className="mt-4">Подходы:</h2>
      <ul className="list-group mb-4">
        {sets.map((set, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>
              Упражнение: <strong>{getExerciseName(set.exercise)}</strong>, Повторы: {set.repetitions}, Вес: {set.weight} кг
            </span>
          </li>
        ))}
      </ul>

      <h2 className="mt-4">Добавить подход</h2>
      <form onSubmit={handleAddSet} className="mt-3">
        <div className="mb-3">
      <label className="form-label">Упражнение:</label>
      <select
        value={exerciseId}
        onChange={handleExerciseChange}
        required
        className="form-select"
      >
        <option value="" disabled>
          Выберите упражнение
        </option>
        {exercises.map((exercise) => (
          <option key={exercise.id} value={exercise.id}>
            {exercise.name}
          </option>
        ))}
        <option value="add-new">+ Добавить новое упражнение</option>
      </select>
    </div>
        <div className="mb-3">
          <label className="form-label">Повторы:</label>
          <input
            type="number"
            value={repetitions}
            onChange={(e) => setRepetitions(Number(e.target.value))}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Вес (кг):</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            required
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-success">
          Добавить подход
        </button>
      </form>
    </div>
    <div className="card-footer text-center">
      <button onClick={handleDeleteWorkout} className="btn btn-danger">
        Удалить тренировку
      </button>
    </div>
  </div>
</div>

  );
};

export default WorkoutDetail;
