import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import QRScanner from './components/QRScanner';
import StudentList from './components/StudentList';
import Login from './components/Login';
import Profile from './components/Profile';
import NotFound from './components/NotFound';

function App() {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('auth_token') === 'true';
  });

  // Initial Mock Data
  const initialStudents = [
    { id: 'STU001', name: 'Alex Johnson', email: 'alex.j@school.edu', class: '10-A', status: 'Present', lastSeen: '08:45 AM' },
    { id: 'STU002', name: 'Sarah Williams', email: 'sarah.w@school.edu', class: '10-A', status: 'Absent', lastSeen: null },
    { id: 'STU003', name: 'Michael Chen', email: 'm.chen@school.edu', class: '10-B', status: 'Present', lastSeen: '09:00 AM' },
    { id: 'STU004', name: 'Emily Davis', email: 'emily.d@school.edu', class: '10-B', status: 'Absent', lastSeen: null },
    { id: 'STU005', name: 'James Wilson', email: 'j.wilson@school.edu', class: '11-A', status: 'Present', lastSeen: '08:30 AM' },
  ];

  // Load from LocalStorage or use initial data
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('attendance_students');
    return saved ? JSON.parse(saved) : initialStudents;
  });

  // Save to LocalStorage whenever students change
  useEffect(() => {
    localStorage.setItem('attendance_students', JSON.stringify(students));
  }, [students]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('auth_token', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('auth_token');
  };

  const handleScan = (id) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setStudents(prev => prev.map(student => {
      if (student.id === id || student.id.toLowerCase() === id.toLowerCase()) {
        return { ...student, status: 'Present', lastSeen: timestamp };
      }
      return student;
    }));
  };

  const handleAddStudent = (newStudentData) => {
    const newStudent = {
      id: `STU${Math.floor(1000 + Math.random() * 9000)}`, // Simple ID generation
      ...newStudentData,
      status: 'Absent',
      lastSeen: null
    };
    setStudents(prev => [...prev, newStudent]);
  };

  const handleUpdateStudent = (updatedStudent) => {
    setStudents(prev => prev.map(student =>
      student.id === updatedStudent.id ? { ...student, ...updatedStudent } : student
    ));
  };

  const handleDeleteStudent = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(prev => prev.filter(student => student.id !== id));
    }
  };

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return <Layout onLogout={handleLogout}>{children}</Layout>;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />
        } />

        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard students={students} />
          </ProtectedRoute>
        } />

        <Route path="/scan" element={
          <ProtectedRoute>
            <QRScanner onScan={handleScan} />
          </ProtectedRoute>
        } />

        <Route path="/students" element={
          <ProtectedRoute>
            <StudentList
              students={students}
              onAddStudent={handleAddStudent}
              onUpdateStudent={handleUpdateStudent}
              onDeleteStudent={handleDeleteStudent}
            />
          </ProtectedRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
