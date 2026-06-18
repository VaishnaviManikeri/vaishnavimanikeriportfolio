// frontend/src/pages/Projects.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../api';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.getProjects();
      setProjects(response.projects);
    } catch (error) {
      setError('Failed to load projects');
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { value: 'all', label: 'All Projects', icon: '🎯' },
    { value: 'education', label: 'Education & Colleges', icon: '🏛️' },
    { value: 'law', label: 'Law Colleges', icon: '⚖️' },
    { value: 'school', label: 'Schools', icon: '📚' },
    { value: 'professional', label: 'Professional', icon: '👨‍⚖️' },
    { value: 'initiative', label: 'Initiatives', icon: '🌟' },
    { value: 'business', label: 'Business', icon: '✈️' },
  ];

  const getCategoryColor = (category) => {
    const colors = {
      education: 'from-blue-500 to-cyan-500',
      law: 'from-purple-500 to-indigo-500',
      school: 'from-green-500 to-emerald-500',
      professional: 'from-orange-500 to-red-500',
      initiative: 'from-pink-500 to-rose-500',
      business: 'from-teal-500 to-green-500',
    };
    return colors[category] || 'from-gray-500 to-gray-600';
  };

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          <p className="mt-4 text-gray-400">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400">{error}</p>
          <button 
            onClick={fetchProjects}
            className="mt-4 px-4 py-2 rounded-lg bg-purple-600 text-white"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Our Educational Institutions
            </h1>
            <p className="text-gray-400 max-w-3xl mx-auto text-lg">
              Proudly managing and operating {projects.length} prestigious educational institutions 
              and organizations dedicated to excellence in education and community development.
            </p>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          <div className="glass-effect p-4 text-center">
            <div className="text-2xl font-bold gradient-text">{projects.length}+</div>
            <div className="text-sm text-gray-400">Institutions</div>
          </div>
          <div className="glass-effect p-4 text-center">
            <div className="text-2xl font-bold gradient-text">10k+</div>
            <div className="text-sm text-gray-400">Students</div>
          </div>
          <div className="glass-effect p-4 text-center">
            <div className="text-2xl font-bold gradient-text">500+</div>
            <div className="text-sm text-gray-400">Faculty Members</div>
          </div>
          <div className="glass-effect p-4 text-center">
            <div className="text-2xl font-bold gradient-text">15+</div>
            <div className="text-sm text-gray-400">Years of Excellence</div>
          </div>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={`px-5 py-2 rounded-full transition-all duration-300 flex items-center gap-2 ${
                filter === cat.value
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                  : 'glass-effect text-gray-300 hover:text-white hover:scale-105'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group glass-effect overflow-hidden hover-glow cursor-pointer"
              onClick={() => navigate(`/project/${project._id}`)}
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                {project.featured && (
                  <div className="absolute top-3 right-3 px-2 py-1 text-xs rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold">
                    Featured
                  </div>
                )}
                <div className={`absolute bottom-3 left-3 px-2 py-1 text-xs rounded-full bg-gradient-to-r ${getCategoryColor(project.category)} text-white`}>
                  {categories.find(c => c.value === project.category)?.label.split(' ')[0]}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4 text-sm line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-400">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-purple-400 group-hover:text-purple-300 transition-colors flex items-center gap-1">
                    View Details
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No projects found in this category.</p>
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-16 text-center">
          <div className="glass-effect p-6 inline-block mx-auto">
            <p className="text-gray-400">
              🎓 <span className="text-white">Jadhavar Group of Institutes</span> — Committed to Educational Excellence Since 2008
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;