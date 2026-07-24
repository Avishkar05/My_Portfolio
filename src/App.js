import React from 'react';
import './App.css';

function App() {
  const profile = {
    name: "Avishkar Zende",
    role: "Full-Stack Developer",
    bio: "Passionate full-stack developer experienced in building web applications with Java, Spring Boot, React, and MySQL.",
    skills: ["Java", "Spring Boot", "React", "MySQL", "JavaScript", "HTML5 & CSS3", "REST APIs", "Git & GitHub"],
    projects: [
      {
        title: "Lawify",
        tagline: "Legal Services Platform",
        description: "A comprehensive platform connecting clients with legal professionals, managing schedules, and automating legal workflows.",
        tech: ["React", "Spring Boot", "MySQL"]
      },
      {
        title: "Banking System Simulation",
        tagline: "Core Banking Engine",
        description: "Secure simulation of fundamental banking operations including multi-account balance ledgers and transaction history.",
        tech: ["Java", "Spring Boot", "MySQL"]
      },
      {
        title: "Student Management System",
        tagline: "Academic Records Portal",
        description: "Administrative portal to manage enrollments, student records, courses, and real-time academic reporting.",
        tech: ["React", "Java", "MySQL"]
      }
    ]
  };

  return (
    <div className="portfolio-container">
      {/* Hero Header */}
      <header className="hero">
        <span className="hero-tag">Welcome to my portfolio</span>
        <h1 className="hero-title">{profile.name}</h1>
        <h2 className="hero-subtitle">{profile.role}</h2>
        <p className="hero-bio">{profile.bio}</p>
      </header>

      {/* Tech Stack */}
      <section className="section">
        <h3 className="section-title">Technical Skills</h3>
        <div className="badge-container">
          {profile.skills.map((skill, index) => (
            <span key={index} className="badge">{skill}</span>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section">
        <h3 className="section-title">Featured Work</h3>
        <div className="project-grid">
          {profile.projects.map((project, index) => (
            <div key={index} className="card">
              <h4 className="card-title">{project.title}</h4>
              <p className="card-desc">{project.description}</p>
              <div className="badge-container">
                {project.tech.map((t, i) => (
                  <span key={i} className="mini-badge">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} {profile.name}. Built with React & hosted on GitHub Pages.</p>
      </footer>
    </div>
  );
}

export default App;