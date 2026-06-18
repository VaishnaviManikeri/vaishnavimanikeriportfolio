// frontend/src/pages/admin/ProjectList.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api';
import { 
  PencilIcon, 
  TrashIcon, 
  EyeIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await api.getProjects();
      setProjects(response.projects);
    } catch (error) {
      setError('Failed to load projects');
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteProject(id);
      setProjects(projects.filter(project => project._id !== id));
      setDeleteConfirm(null);
    } catch (error) {
      setError('Failed to delete project');
      console.error('Error deleting project:', error);
    }
  };

  const getCategoryLabel = (category) => {
    const categories = {
      education: 'Education & Colleges',
      law: 'Law Colleges',
      school: 'Schools',
      professional: 'Professional',
      initiative: 'Initiatives',
      business: 'Business'
    };
    return categories[category] || category;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          <p className="mt-4 text-gray-400">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-effect p-8 rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold gradient-text">Manage Projects</h2>
        <button
          onClick={() => navigate('/admin/dashboard/projects/new')}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white hover-glow transition-all"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Add New Project</span>
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400">
          {error}
        </div>
      )}

      {projects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No projects found.</p>
          <button
            onClick={() => navigate('/admin/dashboard/projects/new')}
            className="mt-4 px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-all"
          >
            Create your first project
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Image</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Title</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Category</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Featured</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Order</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project._id} className="border-b border-white/10 hover:bg-white/5 transition-all">
                  <td className="py-3 px-4">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium">{project.title}</p>
                      <p className="text-sm text-gray-400 line-clamp-1">{project.description}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-400">
                      {getCategoryLabel(project.category)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {project.featured ? (
                      <span className="px-2 py-1 text-xs rounded-full bg-amber-500/20 text-amber-400">
                        Featured
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-500/20 text-gray-400">
                        No
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">{project.order}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => navigate(`/admin/dashboard/projects/${project._id}`)}
                        className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-all"
                        title="Edit"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(project._id)}
                        className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all"
                        title="Delete"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => navigate(`/project/${project._id}`)}
                        className="p-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-all"
                        title="View"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <div className="glass-effect p-6 rounded-xl max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete this project? This action cannot be undone.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 rounded-lg glass-effect text-white hover:bg-white/10 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;