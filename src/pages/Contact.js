// src/pages/Contact.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  const contactInfo = [
    { icon: EnvelopeIcon, label: 'Email', value: 'vaishnavimanikeri@gmail.com', link: 'mailto:vaishnavimanikeri@gmail.com' },
    { icon: PhoneIcon, label: 'Phone', value: '+91 8237370045', link: 'tel:+91 8237370045' },
    { icon: MapPinIcon, label: 'Location', value: 'Narhe,Pune', link: null },
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Let's Connect
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a project in mind? I'd love to hear about it. Let's work together to create something amazing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="glass-effect p-8"
          >
            <h2 className="text-2xl font-bold mb-6">Send Me a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="Project inquiry"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              {submitStatus === 'success' && (
                <div className="mt-4 p-3 rounded-lg bg-green-500/20 border border-green-500/30 text-green-400 text-center">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="glass-effect p-8">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg bg-purple-500/20">
                      <info.icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">{info.label}</p>
                      {info.link ? (
                        <a href={info.link} className="text-white hover:text-purple-400 transition-colors">
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-white">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            
             

            <div className="glass-effect p-8">
              <h2 className="text-2xl font-bold mb-4">Let's Work Together</h2>
              <p className="text-gray-300 mb-4">
                Whether you have a project in mind, want to collaborate, or just want to say hello, I'd love to hear from you.
              </p>
              <div className="flex space-x-4">
                <a href="https://github.com/VaishnaviManikeri" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-purple-500/20 transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/vaishnavi-manikeri" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-purple-500/20 transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.98 0 1.771-.773 1.771-1.729V1.729C24 .774 23.203 0 22.225 0z" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;