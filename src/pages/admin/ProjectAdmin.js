// frontend/src/pages/admin/ProjectAdmin.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../api';

const ProjectAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = id && id !== 'new';
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    category: 'education',
    link: '',
    featured: false,
    order: 0
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const categories = [
    { value: 'education', label: 'Education & Colleges' },
    { value: 'law', label: 'Law Colleges' },
    { value: 'school', label: 'Schools' },
    { value: 'professional', label: 'Professional' },
    { value: 'initiative', label: 'Initiatives' },
    { value: 'business', label: 'Business' }
  ];

  useEffect(() => {
    if (isEditMode) {
      fetchProject();
    }
  }, [id]);

  const fetchProject = async () => {
    try {
      const response = await api.getProjectById(id);
      const project = response.project;
      setFormData({
        title: project.title,
        description: project.description,
        tags: project.tags.join(', '),
        category: project.category,
        link: project.link,
        featured: project.featured,
        order: project.order
      });
      setImagePreview(project.image);
    } catch (error) {
      setError('Failed to load project');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('tags', JSON.stringify(formData.tags.split(',').map(tag => tag.trim())));
      formDataToSend.append('category', formData.category);
      formDataToSend.append('link', formData.link);
      formDataToSend.append('featured', formData.featured);
      formDataToSend.append('order', formData.order);
      
      if (image) {
        formDataToSend.append('image', image);
      }
      
      console.log('Submitting form data:', Object.fromEntries(formDataToSend));
      
      if (isEditMode) {
        await api.updateProject(id, formDataToSend);
        setSuccess('Project updated successfully!');
      } else {
        await api.createProject(formDataToSend);
        setSuccess('Project created successfully!');
        // Reset form for new project
        if (!isEditMode) {
          setFormData({
            title: '',
            description: '',
            tags: '',
            category: 'education',
            link: '',
            featured: false,
            order: 0
          });
          setImage(null);
          setImagePreview('');
        }
      }
      
      setTimeout(() => {
        navigate('/admin/dashboard/projects');
      }, 2000);
    } catch (error) {
      console.error('Submit error:', error);
      setError(error.message || 'Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-effect p-8 rounded-xl">
      <h2 className="text-2xl font-bold mb-6">
        {isEditMode ? 'Edit Project' : 'Add New Project'}
      </h2>
      
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 rounded-lg bg-green-500/20 border border-green-500/30 text-green-400">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">
            Tags (comma-separated) *
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            required
            placeholder="React, JavaScript, Node.js"
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none"
          />
          <p className="text-xs text-gray-400 mt-1">Example: Education, College, University</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Category *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none"
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Website Link *</label>
          <input
            type="url"
            name="link"
            value={formData.link}
            onChange={handleChange}
            required
            placeholder="https://example.com"
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Display Order</label>
          <input
            type="number"
            name="order"
            value={formData.order}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none"
          />
          <p className="text-xs text-gray-400 mt-1">Lower numbers appear first (0 = highest priority)</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Project Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none cursor-pointer"
          />
          {imagePreview && (
            <div className="mt-3">
              <img src={imagePreview} alt="Preview" className="h-32 w-auto rounded-lg object-cover" />
            </div>
          )}
          <p className="text-xs text-gray-400 mt-1">
            {isEditMode ? 'Leave empty to keep current image' : 'Required for new projects'} (Max 5MB)
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
            className="w-4 h-4 rounded border-white/10 focus:ring-purple-500"
          />
          <label className="text-sm font-medium">Feature this project (appears with special badge)</label>
        </div>
        
        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : (isEditMode ? 'Update Project' : 'Create Project')}
          </button>
          
          <button
            type="button"
            onClick={() => navigate('/admin/dashboard/projects')}
            className="px-6 py-2 rounded-lg glass-effect text-white hover:bg-white/10 transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectAdmin;