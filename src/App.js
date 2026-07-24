import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [activeFilter, setActiveFilter] = useState('All');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  // Persist Theme Selection
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const profile = {
    name: "Avishkar Zende",
    role: "Full-Stack Developer",
    bio: "Building robust, scalable applications with clean frontend UI and high-performance backend microservices.",
    skills: ["Java", "Spring Boot", "React", "MySQL", "JavaScript", "REST APIs", "Git", "CSS3"],
    projects: [
      {
        title: "Lawify",
        category: "React",
        tagline: "Legal Services Platform",
        description: "A digital legal platform automating attorney booking, document management, and client consultations.",
        tech: ["React", "Spring Boot", "MySQL"]
      },
      {
        title: "Banking System Simulation",
        category: "Java",
        tagline: "Core Banking Engine",
        description: "Engineered transactional backend with ledger auditing, multi-account operations, and security protocols.",
        tech: ["Java", "Spring Boot", "MySQL"]
      },
      {
        title: "Student Management System",
        category: "MySQL",
        tagline: "Academic Administration Portal",
        description: "CRUD portal for handling student enrollment records, course structures, and real-time GPA computations.",
        tech: ["React", "Java", "MySQL"]
      }
    ]
  };

  const filters = ['All', 'React', 'Java', 'MySQL'];

  const filteredProjects = activeFilter === 'All' 
    ? profile.projects 
    : profile.projects.filter(p => p.tech.includes(activeFilter) || p.category === activeFilter);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus('Please fill in all fields.');
      return;
    }
    setFormStatus('Thank you! Your message has been sent.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="app-wrapper">
      {/* Sticky Navigation */}
      <nav className="navbar">
        <div className="nav-brand">AZ.dev</div>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
          <button className="theme-btn" onClick={toggleTheme}>
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </nav>

      <div className="portfolio-container">
        {/* Hero / Header */}
        <section id="about" className="hero">
          <span className="hero-tag">Available for Full-Time Roles</span>
          <h1 className="hero-title">{profile.name}</h1>
          <h2 className="hero-subtitle">{profile.role}</h2>
          <p className="hero-bio">{profile.bio}</p>
        </section>

        {/* Technical Skills */}
        <section id="skills" className="section">
          <h3 className="section-title">Technical Expertise</h3>
          <div className="badge-container">
            {profile.skills.map((skill, index) => (
              <span key={index} className="badge">{skill}</span>
            ))}
          </div>
        </section>

        {/* Interactive Projects Showcase */}
        <section id="projects" className="section">
          <h3 className="section-title">Featured Projects</h3>
          
          {/* Project Category Filter */}
          <div className="filter-group">
            {filters.map((filter) => (
              <button
                key={filter}
                className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="project-grid">
            {filteredProjects.map((project, index) => (
              <div key={index} className="card">
                <div>
                  <h4 className="card-title">{project.title}</h4>
                  <p className="card-desc">{project.description}</p>
                </div>
                <div className="badge-container">
                  {project.tech.map((t, i) => (
                    <span key={i} className="mini-badge">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Contact Form */}
        <section id="contact" className="section">
          <h3 className="section-title">Get In Touch</h3>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-input"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="email"
              className="form-input"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <textarea
              className="form-textarea"
              placeholder="Your Message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
            <button type="submit" className="submit-btn">Send Message</button>
            {formStatus && <p style={{ color: 'var(--accent)', marginTop: '0.5rem' }}>{formStatus}</p>}
          </form>
        </section>

        {/* Footer */}
        <footer className="footer">
          <p>© {new Date().getFullYear()} {profile.name} • Built with React & Deployed on GitHub Pages</p>
        </footer>
      </div>
    </div>
  );
}

export default App;