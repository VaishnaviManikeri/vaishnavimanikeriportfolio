// frontend/src/pages/admin/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  PlusCircleIcon, 
  ListBulletIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';
import { api } from '../../api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ total: 0, categories: {} });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.getProjects();
      const projects = response.projects;
      const categories = {};
      projects.forEach(project => {
        categories[project.category] = (categories[project.category] || 0) + 1;
      });
      setStats({
        total: projects.length,
        categories
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 glass-effect">
        <div className="p-6">
          <h2 className="text-xl font-bold gradient-text mb-8">Admin Panel</h2>
          
          <nav className="space-y-2">
            <Link
              to="/admin/dashboard"
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                isActive('/admin/dashboard') && !location.pathname.includes('/projects')
                  ? 'bg-purple-500/20 text-purple-400'
                  : 'hover:bg-purple-500/20'
              }`}
            >
              <HomeIcon className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            
            <div className="pt-4">
              <p className="text-xs text-gray-400 px-4 mb-2">PROJECTS</p>
              <Link
                to="/admin/dashboard/projects"
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  isActive('/admin/dashboard/projects')
                    ? 'bg-purple-500/20 text-purple-400'
                    : 'hover:bg-purple-500/20'
                }`}
              >
                <ListBulletIcon className="w-5 h-5" />
                <span>All Projects</span>
              </Link>
              <Link
                to="/admin/dashboard/projects/new"
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  isActive('/admin/dashboard/projects/new')
                    ? 'bg-purple-500/20 text-purple-400'
                    : 'hover:bg-purple-500/20'
                }`}
              >
                <PlusCircleIcon className="w-5 h-5" />
                <span>Add Project</span>
              </Link>
            </div>
          </nav>
          
          <button
            onClick={handleLogout}
            className="absolute bottom-8 left-6 right-6 flex items-center justify-center space-x-3 px-4 py-3 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-all text-red-400"
          >
            <ArrowLeftOnRectangleIcon className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text">Welcome to Admin Dashboard</h1>
          <p className="text-gray-400 mt-2">Manage your projects efficiently</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="glass-effect p-6 rounded-xl">
            <div className="text-3xl font-bold gradient-text">{stats.total}</div>
            <div className="text-gray-400 mt-2">Total Projects</div>
          </div>
          
          <div className="glass-effect p-6 rounded-xl">
            <div className="text-3xl font-bold gradient-text">
              {Object.keys(stats.categories).length}
            </div>
            <div className="text-gray-400 mt-2">Categories Used</div>
          </div>
          
          <div className="glass-effect p-6 rounded-xl">
            <div className="text-3xl font-bold gradient-text">
              {Object.values(stats.categories).sort((a,b) => b - a)[0] || 0}
            </div>
            <div className="text-gray-400 mt-2">Most Popular Category</div>
          </div>
        </div>
        
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;