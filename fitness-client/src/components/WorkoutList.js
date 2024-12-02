import React, { useEffect, useState } from "react";
import api from "../api";

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    api
      .get("/workouts/")
      .then((response) => {
        setWorkouts(response.data);
      })
      .catch((error) => {
        console.error("Ошибка загрузки тренировок:", error);
      });
  }, []);

  return (
    <div className="container mt-4">
  <h1 className="text-center">Мои тренировки</h1>
  <div className="row">
    {workouts.map((workout) => (
      <div key={workout.id} className="col-md-4 mb-4">
        <div className="card h-100">
          <div className="card-body">
            <h5 className="card-title">Тренировка</h5>
            <p className="card-text">
              <strong>Дата:</strong> {workout.date}
            </p>
            <p className="card-text">
              <strong>Количество подходов:</strong> {workout.sets_count || 0}
            </p>
          </div>
          <div className="card-footer text-center">
            <button className="btn btn-primary">Подробнее</button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default WorkoutList;
