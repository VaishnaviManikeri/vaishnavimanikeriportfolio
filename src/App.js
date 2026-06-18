// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import About from './pages/About';
import Contact from './pages/Contact';

import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProjectAdmin from './pages/admin/ProjectAdmin';
import ProjectList from './pages/admin/ProjectList';
import ProtectedRoute from './components/ProtectedRoute';
import Services from './pages/Services';
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
        <Routes>
          {/* Public Routes with Navbar */}
          <Route path="/" element={
            <>
              <Navbar />
              <Home />
            </>
          } />
          <Route path="/projects" element={
            <>
              <Navbar />
              <Projects />
            </>
          } />
          <Route path="/project/:id" element={
            <>
              <Navbar />
              <ProjectDetails />
            </>
          } />
          <Route path="/services" element={
            <>
              <Navbar />
              <Services />
            </>
          } />
          <Route path="/about" element={
            <>
              <Navbar />
              <About />
            </>
          } />
          <Route path="/contact" element={
            <>
              <Navbar />
              <Contact />
            </>
          } />
         
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }>
            {/* Index route for projects list */}
            <Route index element={<ProjectList />} />
            {/* Project Routes */}
            <Route path="projects" element={<ProjectList />} />
            <Route path="projects/new" element={<ProjectAdmin />} />
            <Route path="projects/:id" element={<ProjectAdmin />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;