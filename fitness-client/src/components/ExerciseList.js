import React, { useEffect, useState } from "react";
import api from "../api"; // Подключаем настроенный axios клиент
import { Link } from "react-router-dom";


const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  // Получаем список упражнений
  useEffect(() => {
    api.get("/exercises/")
      .then((response) => {
        setExercises(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке упражнений:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Загрузка...</p>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">Список упражнений</h1>
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th>Название</th>
            <th>Группа мышц</th>
            <th>Описание</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((exercise) => (
            <tr key={exercise.id}>
              <td><Link to={`/exercises/${exercise.id}`}>{exercise.name}</Link></td>
              <td>{exercise.muscle_group}</td>
              <td>{exercise.description}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="3" className="text-center">
          <Link to='/add-exercise' className="btn btn-success">
            + Добавить упражнение
          </Link>
        </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ExerciseList;
