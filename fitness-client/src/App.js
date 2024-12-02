import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ExerciseList from "./components/ExerciseList";
import AddExercise from "./components/AddExercise";
import Login from "./components/Login";
import MyWorkouts from "./components/MyWorkouts";
import ExerciseDetail from "./components/ExerciseDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import NewWorkout from "./components/NewWorkout";
import WorkoutDetail from "./components/WorkoutDetail";
import { AuthContext } from "./context/AuthContext";
import Register from "./components/Register";
import "./Header.css";

const App = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <Router>
  <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
    <div className="container-fluid">
      {/* Секция слева */}
      <div className="d-flex gap-4">
        <Link to="/" className="navbar-brand custom-link">
          Главная
        </Link>
        <Link to="/add-exercise" className="nav-link custom-link">
          Добавить упражнение
        </Link>
        <Link to="/workouts/me" className="nav-link custom-link">
          Мои тренировки
        </Link>
      </div>

      {/* Секция справа */}
      <div className="d-flex ms-auto gap-2">
        {user ? (
          <button onClick={logout} className="btn btn-danger custom-button">
            Выйти
          </button>
        ) : (
          <>
            <Link to="/login" className="btn btn-primary custom-button">
              Войти
            </Link>
            <Link to="/register" className="btn btn-secondary custom-button">
              Регистрация
            </Link>
          </>
        )}
      </div>
    </div>
  </nav>

  <Routes>
    <Route path="/" element={<ExerciseList />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    {/* Защищённые маршруты */}
    <Route path="/add-exercise" element={<ProtectedRoute><AddExercise /></ProtectedRoute>} />
    <Route path="/workouts/me" element={<ProtectedRoute><MyWorkouts /></ProtectedRoute>} />
    <Route path="/exercises/:id" element={<ProtectedRoute><ExerciseDetail /></ProtectedRoute>} />
    <Route path="/workouts/new" element={<ProtectedRoute><NewWorkout /></ProtectedRoute>} />
    <Route path="/workouts/:id" element={<ProtectedRoute><WorkoutDetail /></ProtectedRoute>} />
  </Routes>
</Router>
  );
};

export default App;
