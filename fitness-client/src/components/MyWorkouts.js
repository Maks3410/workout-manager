import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api";

const MyWorkouts = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    // Загружаем список тренировок
    api.get("/workouts/")
      .then((response) => setWorkouts(response.data))
      .catch((error) => console.error("Ошибка загрузки тренировок:", error));
  }, []);

  return (
    <div className="container mt-4">
  <h1 className="text-center mb-4">Мои тренировки</h1>
  <div className="d-flex flex-column align-items-center gap-4">
    {workouts.map((workout) => (
      <div key={workout.id} className="card w-75">
        <div className="card-body">
          <h2 className="card-title">
            {workout.name || `Тренировка от ${workout.date}`}
          </h2>
          <p className="card-text">
            <strong>Проработанные мышцы:</strong>{" "}
  {workout.muscles_involved?.length
    ? workout.muscles_involved.join(", ")
    : "Не указано"}
          </p>
        </div>
        <div className="card-footer text-center">
          <Link to={`/workouts/${workout.id}`} className="btn btn-primary">
            Подробнее...
          </Link>
        </div>
      </div>
    ))}
  </div>
  <div className="text-center mt-4">
    <Link to="/workouts/new" className="btn btn-success">
      Добавить тренировку
    </Link>
  </div>
</div>


  );
};

export default MyWorkouts;
