// frontend/src/pages/ProjectDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../api';
import { 
  ArrowLeftIcon, 
  GlobeAltIcon, 
  CalendarIcon, 
  TagIcon,
  ShareIcon,
  ClipboardDocumentIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [relatedProjects, setRelatedProjects] = useState([]);

  useEffect(() => {
    fetchProjectDetails();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchProjectDetails = async () => {
    try {
      setLoading(true);
      const response = await api.getProjectById(id);
      setProject(response.project);
      
      // Fetch related projects from same category
      const allProjects = await api.getProjects();
      const related = allProjects.projects
        .filter(p => p.category === response.project.category && p._id !== id)
        .slice(0, 3);
      setRelatedProjects(related);
    } catch (error) {
      console.error('Error fetching project:', error);
      setError('Failed to load project details');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getCategoryInfo = (category) => {
    const categories = {
      education: { 
        name: 'Education & Colleges', 
        icon: '🏛️',
        color: 'from-blue-500 to-cyan-500',
        bgColor: 'bg-blue-500/20'
      },
      law: { 
        name: 'Law Colleges', 
        icon: '⚖️',
        color: 'from-purple-500 to-indigo-500',
        bgColor: 'bg-purple-500/20'
      },
      school: { 
        name: 'Schools', 
        icon: '📚',
        color: 'from-green-500 to-emerald-500',
        bgColor: 'bg-green-500/20'
      },
      professional: { 
        name: 'Professional', 
        icon: '👨‍⚖️',
        color: 'from-orange-500 to-red-500',
        bgColor: 'bg-orange-500/20'
      },
      initiative: { 
        name: 'Initiatives', 
        icon: '🌟',
        color: 'from-pink-500 to-rose-500',
        bgColor: 'bg-pink-500/20'
      },
      business: { 
        name: 'Business', 
        icon: '✈️',
        color: 'from-teal-500 to-green-500',
        bgColor: 'bg-teal-500/20'
      }
    };
    return categories[category] || categories.education;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          <p className="mt-4 text-gray-400">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-4">{error || 'Project not found'}</p>
          <button
            onClick={() => navigate('/projects')}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white hover-glow transition-all"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const categoryInfo = getCategoryInfo(project.category);

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/projects')}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors group"
          >
            <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Projects</span>
          </button>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Image and Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            {/* Hero Image */}
            <div className="glass-effect rounded-xl overflow-hidden mb-6">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Title and Description */}
            <div className="glass-effect p-8 rounded-xl mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-3 mb-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${categoryInfo.color} text-white`}>
                      {categoryInfo.icon} {categoryInfo.name}
                    </span>
                    {project.featured && (
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                        ⭐ Featured
                      </span>
                    )}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
                    {project.title}
                  </h1>
                </div>
                
                {/* Share Button */}
                <button
                  onClick={handleShare}
                  className="p-2 rounded-lg glass-effect hover:bg-purple-500/20 transition-all group"
                  title="Share this project"
                >
                  {copied ? (
                    <CheckIcon className="w-5 h-5 text-green-400" />
                  ) : (
                    <ShareIcon className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                  )}
                </button>
              </div>
              
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {project.description}
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full text-sm bg-purple-500/20 text-purple-400 border border-purple-500/30"
                  >
                    <TagIcon className="w-3 h-3 inline mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover-glow transition-all hover:scale-105"
                >
                  <GlobeAltIcon className="w-5 h-5" />
                  <span>Visit Website</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Sidebar Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Quick Info Card */}
            <div className="glass-effect p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Quick Information</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-purple-500/20">
                    <CalendarIcon className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Established</p>
                    <p className="text-white font-medium">
                      {new Date(project.createdAt).getFullYear()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-purple-500/20">
                    <GlobeAltIcon className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Website</p>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 text-sm break-all"
                    >
                      {project.link.replace('https://', '').replace('http://', '')}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Highlights */}
            <div className="glass-effect p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Key Highlights</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <span className="text-purple-400 mt-1">✓</span>
                  <span className="text-gray-300">State-of-the-art infrastructure</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-purple-400 mt-1">✓</span>
                  <span className="text-gray-300">Experienced faculty members</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-purple-400 mt-1">✓</span>
                  <span className="text-gray-300">Modern teaching methodologies</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-purple-400 mt-1">✓</span>
                  <span className="text-gray-300">Industry-relevant curriculum</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-purple-400 mt-1">✓</span>
                  <span className="text-gray-300">Placement assistance</span>
                </li>
              </ul>
            </div>

            {/* Contact Card */}
            <div className="glass-effect p-6 rounded-xl bg-gradient-to-br from-purple-600/10 to-pink-600/10">
              <h3 className="text-xl font-semibold mb-3">Interested in Joining?</h3>
              <p className="text-gray-300 text-sm mb-4">
                Get more information about admissions, courses, and facilities.
              </p>
              <Link
                to="/contact"
                className="block text-center px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover-glow transition-all"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Related Projects Section */}
        {relatedProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8 gradient-text">
              Related Institutions
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map((relatedProject, index) => (
                <motion.div
                  key={relatedProject._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-effect rounded-xl overflow-hidden hover-glow cursor-pointer group"
                  onClick={() => navigate(`/project/${relatedProject._id}`)}
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={relatedProject.image}
                      alt={relatedProject.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                      {relatedProject.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2">
                      {relatedProject.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-purple-400">View Details →</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;