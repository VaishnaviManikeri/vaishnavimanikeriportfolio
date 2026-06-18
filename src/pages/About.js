// src/pages/About.js
import React from 'react';
import { motion } from 'framer-motion';
import { CodeBracketIcon, AcademicCapIcon, BriefcaseIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';

const About = () => {
  const stats = [
    { value: '1', label: 'Years Experience', icon: BriefcaseIcon },
    { value: '15+', label: 'Projects Completed', icon: CodeBracketIcon },
    { value: '8+', label: 'Technologies', icon: ComputerDesktopIcon },
    { value: 'B.Tech', label: 'AI & Data Science', icon: AcademicCapIcon },
  ];

  const journey = [
    {
      year: '2022',
      title: 'Started B.Tech Journey',
      description: 'Began my Bachelor of Technology in Artificial Intelligence & Data Science at Sharad Institute of Technology College of Engineering.'
    },
    {
      year: '2025',
      title: 'Python Fullstack Internship',
      description: 'Joined SPCL Infotech Services Pvt. Ltd. as Python Fullstack Development Intern. Worked with Django, React, REST APIs, MySQL, and PostgreSQL.'
    },
    {
      year: '2025',
      title: 'Python Fullstack Developer',
      description: 'Continued as Python Fullstack Developer at SPCL Infotech, contributing to end-to-end fullstack development projects.'
    },
    {
      year: '2025 - Present',
      title: 'Web Developer at Triija Media Works',
      description: 'Currently working as Web Developer, building modern, responsive web applications using React, JavaScript, and Tailwind CSS.'
    },
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            About Me
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Get to know me better - my journey, passion, and what drives me to create exceptional digital experiences.
          </p>
        </div>

        {/* Bio Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="glass-effect p-8">
              <h2 className="text-2xl font-bold mb-4">Who Am I?</h2>
              <p className="text-gray-300 mb-4">
                I'm Vaishnavi Manikeri, a passionate Full Stack Developer with hands-on experience in building responsive 
                and scalable web applications. I specialize in React.js, Python, Django, Node.js, JavaScript, and REST APIs.
              </p>
              <p className="text-gray-300 mb-4">
                I hold a Bachelor of Technology in Artificial Intelligence & Data Science from Sharad Institute of Technology 
                College of Engineering. I love solving real-world problems through clean code and user-friendly design. 
                I've built projects involving authentication, dashboards, CRUD systems, and modern UI.
              </p>
              <p className="text-gray-300">
                Currently, I'm working as a Web Developer at Triija Media Works, where I build modern, responsive web 
                applications, develop frontend interfaces using React, JavaScript, and Tailwind, and collaborate with 
                designers and backend teams to deliver high-quality digital solutions.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, index) => (
              <div key={index} className="glass-effect p-6 text-center hover:scale-105 transition-all duration-300">
                <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Journey Timeline */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">My Journey</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-purple-500 to-pink-500" />
            {journey.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'pl-8'}`}>
                  <div className="glass-effect p-6">
                    <span className="text-purple-400 font-bold">{item.year}</span>
                    <h3 className="text-xl font-semibold mt-2">{item.title}</h3>
                    <p className="text-gray-400 mt-2">{item.description}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-purple-500 border-4 border-[#0A0A0A]" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">My Top Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {['API Testing', 'REST APIs', 'Tailwind CSS', 'React.js', 'Python', 'Django', 'Node.js', 'JavaScript', 'HTML5', 'CSS3', 'MySQL', 'PostgreSQL', 'Git', 'GitHub', 'VS Code', 'Postman'].map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="glass-effect p-4 text-center hover:scale-105 transition-all duration-300"
              >
                <span className="text-sm font-medium">{skill}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-12">Certifications</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="glass-effect p-6 text-center hover:scale-105 transition-all duration-300"
            >
              <AcademicCapIcon className="w-12 h-12 text-purple-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Data Science And Analytics</h3>
              <p className="text-gray-400 text-sm">Certification in Data Science and Analytics</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="glass-effect p-6 text-center hover:scale-105 transition-all duration-300"
            >
              <AcademicCapIcon className="w-12 h-12 text-purple-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Introduction to Industry 4.0</h3>
              <p className="text-gray-400 text-sm">Industrial Internet of Things (IIoT)</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;