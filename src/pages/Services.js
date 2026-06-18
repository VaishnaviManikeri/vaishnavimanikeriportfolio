// frontend/src/pages/Services.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  ShoppingCartIcon,
  GlobeAltIcon,
  CloudIcon,
  CheckCircleIcon,
  ServerIcon,
  WrenchScrewdriverIcon,
  CurrencyDollarIcon,
  ClockIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      title: "Custom Website Development",
      icon: <CodeBracketIcon className="w-10 h-10" />,
      description: "Tailor-made websites built from scratch to meet your unique business requirements.",
      timeline: "4-6 weeks",
      features: ["Responsive Design", "SEO Friendly", "Fast Loading", "CMS Integration"]
    },
    {
      id: 2,
      title: "E-Commerce Development",
      icon: <ShoppingCartIcon className="w-10 h-10" />,
      description: "Feature-rich online stores with secure payment gateways and inventory management.",
      timeline: "6-8 weeks",
      features: ["Payment Integration", "Product Management", "Order Tracking", "Customer Accounts"]
    },
    {
      id: 3,
      title: "Mobile-First Web Apps",
      icon: <DevicePhoneMobileIcon className="w-10 h-10" />,
      description: "Progressive Web Apps optimized for mobile devices with app-like experience.",
      timeline: "5-7 weeks",
      features: ["Offline Support", "Push Notifications", "Fast Loading", "Mobile Optimized"]
    },
    {
      id: 4,
      title: "CMS Development",
      icon: <GlobeAltIcon className="w-10 h-10" />,
      description: "Easy-to-use content management systems for your website.",
      timeline: "3-5 weeks",
      features: ["User Friendly", "Drag & Drop", "Media Management", "Role Management"]
    },
    {
      id: 5,
      title: "API Development",
      icon: <CloudIcon className="w-10 h-10" />,
      description: "Robust APIs and third-party integrations for seamless connectivity.",
      timeline: "3-4 weeks",
      features: ["RESTful API", "Third-party Integration", "Webhook Services", "API Documentation"]
    },
    {
      id: 6,
      title: "Website Maintenance",
      icon: <WrenchScrewdriverIcon className="w-10 h-10" />,
      description: "Ongoing maintenance, security updates, and technical support.",
      timeline: "Ongoing",
      features: ["24/7 Support", "Security Monitoring", "Regular Backups", "Performance Optimization"]
    }
  ];

  const whyChooseUs = [
    {
      title: "Expert Team",
      description: "10+ years of experience",
      icon: <UserGroupIcon className="w-5 h-5" />
    },
    {
      title: "Quality Assurance",
      description: "100% tested code",
      icon: <CheckCircleIcon className="w-5 h-5" />
    },
    {
      title: "Timely Delivery",
      description: "On-time project delivery",
      icon: <ClockIcon className="w-5 h-5" />
    },
    {
      title: "Competitive Pricing",
      description: "Best value for money",
      icon: <CurrencyDollarIcon className="w-5 h-5" />
    },
    {
      title: "Post-Launch Support",
      description: "Free 3 months support",
      icon: <ServerIcon className="w-5 h-5" />
    }
  ];

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Our Services
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            We provide professional web development solutions tailored to your business needs
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-effect rounded-xl overflow-hidden hover-glow transition-all cursor-pointer"
              onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
            >
              <div className="p-6">
                <div className="text-purple-400 mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-400 mb-4 text-sm">
                  {service.description}
                </p>
                <div className="flex justify-between items-center text-sm mb-3">
                  <span className="text-purple-400 font-semibold">{service.price}</span>
                  <span className="text-gray-500">⏱️ {service.timeline}</span>
                </div>
                
                {selectedService === service.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t border-white/10"
                  >
                    <h4 className="font-semibold mb-2 text-sm">Key Features:</h4>
                    <ul className="space-y-1 mb-3">
                      {service.features.map((feature, i) => (
                        <li key={i} className="text-xs text-gray-400 flex items-center gap-2">
                          <CheckCircleIcon className="w-3 h-3 text-green-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => navigate('/contact')}
                      className="w-full mt-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm hover-glow transition-all"
                    >
                      Get Quote
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 gradient-text">
            Why Choose Us?
          </h2>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-effect p-4 rounded-xl text-center hover-glow transition-all"
              >
                <div className="flex justify-center mb-2 text-purple-400">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-gray-400 text-xs">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 gradient-text">
            How We Work
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-effect p-6 rounded-xl text-center">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold mb-2">Planning</h3>
              <p className="text-gray-400 text-sm">Understand requirements and create project plan</p>
            </div>
            
            <div className="glass-effect p-6 rounded-xl text-center">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold mb-2">Development</h3>
              <p className="text-gray-400 text-sm">Build and test your website with regular updates</p>
            </div>
            
            <div className="glass-effect p-6 rounded-xl text-center">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold mb-2">Launch & Support</h3>
              <p className="text-gray-400 text-sm">Deploy and provide ongoing maintenance</p>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-effect rounded-xl p-8 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 gradient-text">
            Ready to Get Started?
          </h2>
          <p className="text-gray-400 mb-6">
            Let's discuss your project and create something amazing together
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover-glow transition-all"
            >
              Contact Us
            </button>
            <button
              onClick={() => navigate('/projects')}
              className="px-6 py-2 rounded-lg glass-effect text-white font-semibold hover:bg-white/10 transition-all"
            >
              View Our Work
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;