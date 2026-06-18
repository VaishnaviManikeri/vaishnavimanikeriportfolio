// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CodeBracketIcon, ServerIcon, RocketIcon, ArrowRightIcon } from '../components/Icons';

const Home = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const skills = [
    { name: 'React.js', level: 95, color: '#61DAFB' },
    { name: 'Node.js', level: 90, color: '#339933' },
    { name: 'Python', level: 85, color: '#3776AB' },
    { name: 'Django', level: 85, color: '#61DAFB' },
    { name: 'HTML/CSS', level: 80, color: '#06B6D4' },
    { name: 'TypeScript', level: 88, color: '#3178C6' },
    { name: 'MongoDB', level: 85, color: '#47A248' },
    { name: 'Tailwind CSS', level: 92, color: '#06B6D4' },
  ];

  const services = [
    { icon: CodeBracketIcon, title: 'Frontend Development', desc: 'Modern responsive interfaces with React, Next.js, and Tailwind' },
    { icon: ServerIcon, title: 'Backend Development', desc: 'Scalable APIs and microservices with Node.js and Python' },
    { icon: RocketIcon, title: 'Full-Stack Solutions', desc: 'End-to-end web applications from concept to deployment' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full blur-[100px] opacity-20 animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500 rounded-full blur-[120px] opacity-20 animate-float" style={{ animationDelay: '2s' }} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1 rounded-full glass-effect text-purple-400 text-sm font-medium mb-6">
              Full-Stack Developer
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Crafting Digital
              <span className="gradient-text block"> Masterpieces</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
              I'm Vaishnavi Manikeri, a passionate full-stack developer specializing in building exceptional digital experiences that combine beautiful design with powerful functionality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/projects" className="group relative inline-flex items-center justify-center px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold overflow-hidden transition-all hover-glow">
                <span className="relative z-10">View My Work</span>
                <ArrowRightIcon className="relative z-10 w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center px-8 py-3 rounded-full glass-effect text-white font-semibold hover:bg-white/10 transition-all">
                Let's Talk
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What I Do</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              I provide end-to-end development services to bring your ideas to life
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-effect p-8 hover:scale-105 transition-all duration-300 hover-glow"
              >
                <service.icon className="w-12 h-12 text-purple-400 mb-4" />
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-400">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Proficient in modern technologies and frameworks
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-purple-400">{skill.level}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: skill.color }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-effect p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
            <p className="text-gray-400 mb-8">
              Let's work together to build something amazing. I'm currently available for freelance work and collaborations.
            </p>
            <Link to="/contact" className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover-glow transition-all">
              Get In Touch
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;