import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './views/MainPage';
import LoginPage from './views/LoginPage';
import SignUpPage from './views/SignUpPage';
import ProfilePage from './views/ProfilePage';
import TaskPage from './views/TaskPage';
import TaskListPage from './views/TaskListPage';
import HabitPage from './views/HabitPage';
import HabitListPage from './views/HabitListPage';
import ProgressPage from './views/ProgressPage';
import HomePage from './views/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/task/:taskId" element={<TaskPage />} />
        <Route path="/task-list" element={<TaskListPage/>} />
        <Route path="/habit/:habitId" element={<HabitPage/>} />
        <Route path="/habit-list" element={<HabitListPage/>} />
        <Route path="/progress" element={<ProgressPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
