import React, { useEffect, useMemo, useState } from 'react';
import { HashRouter, Link, NavLink, Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import {
  ArrowRight,
  Briefcase,
  Building2,
  Code2,
  Database,
  Download,
  FileText,
  Mail,
  Moon,
  ShieldCheck,
  Sun,
} from 'lucide-react';
import './App.css';

const profile = {
  name: 'Avishkar Zende',
  role: 'Full-Stack Developer | Java, Spring Boot, React, MySQL',
  headline: 'I engineer production-grade web platforms that transform business workflows into measurable outcomes.',
  bio: 'Full-Stack Developer specializing in Java and Spring Boot backend architecture, React UI systems, and relational data modeling in MySQL. I build secure, API-first applications with clean architecture, normalized databases, and performance-focused frontend experiences.',
  github: 'https://github.com/Avishkar05',
  skills: ['Java', 'Spring Boot', 'React', 'MySQL', 'REST APIs', 'JWT Auth', 'Database Normalization', 'Performance Optimization'],
};

const projects = [
  {
    id: 'lawify',
    title: 'Lawify',
    category: 'Web Platform',
    tagline: 'Legal operations platform for consultation, case workflows, and secure document handling.',
    summary: 'Built an end-to-end legal services platform that streamlines advocate discovery, case tracking, and client interactions.',
    impact: [
      'Reduced manual legal intake overhead by digitizing scheduling and document flows.',
      'Designed role-aware, JWT-protected APIs for advocates, clients, and admins.',
      'Improved response times by structuring backend services around clean REST contracts.',
    ],
    stack: ['React', 'Spring Boot', 'MySQL', 'JWT'],
    architecture: 'Modular Spring Boot services expose REST endpoints consumed by a React SPA. Authentication and authorization are enforced through JWT-based middleware and role mapping.',
    endpoints: ['POST /api/auth/login', 'GET /api/cases', 'POST /api/appointments', 'GET /api/documents/:id'],
    databaseLayout: ['users (client_id, advocate_id, role, auth metadata)', 'cases (case_id, client_id, status, priority)', 'appointments (appointment_id, advocate_id, scheduled_at)', 'documents (document_id, case_id, storage_ref, access_scope)'],
    highlights: ['RESTful API design with stable request/response schemas', 'JWT authentication and route-level authorization', 'MySQL normalized schema to reduce redundancy and enforce relational integrity'],
  },
  {
    id: 'banking-system-simulation',
    title: 'Banking System Simulation',
    category: 'Backend Systems',
    tagline: 'Transaction-safe banking engine with ledger consistency and auditability.',
    summary: 'Developed a core banking simulation covering account lifecycle, transfers, and transaction audit trails.',
    impact: [
      'Implemented transaction-safe operations to preserve account consistency under concurrent requests.',
      'Added audit-oriented logging patterns to improve traceability for financial operations.',
      'Modeled account and ledger data structures to support maintainable extension paths.',
    ],
    stack: ['Java', 'Spring Boot', 'MySQL'],
    architecture: 'Layered backend architecture with controller-service-repository separation. Business rules are centralized in service classes and persisted in a normalized relational model.',
    endpoints: ['POST /api/accounts', 'POST /api/transactions/transfer', 'GET /api/accounts/:id/statement', 'GET /api/transactions'],
    databaseLayout: ['accounts (account_id, customer_id, account_type, balance)', 'transactions (txn_id, source_account, target_account, amount, created_at)', 'ledger_entries (entry_id, txn_id, debit_credit, amount)'],
    highlights: ['Transactional integrity with service-layer validations', 'Data model tuned for statement generation and audit trails', 'Clean separation of concerns for maintainability and testing'],
  },
  {
    id: 'student-management-system',
    title: 'Student Management System',
    category: 'Data Platform',
    tagline: 'Academic record management with course enrollment and grade analytics.',
    summary: 'Created a student administration solution for enrollment, course tracking, and performance reporting.',
    impact: [
      'Enabled centralized student record operations through a responsive React interface.',
      'Improved data quality with normalized entities for students, courses, and enrollments.',
      'Accelerated reporting workflows by exposing structured APIs for academic dashboards.',
    ],
    stack: ['React', 'Java', 'Spring Boot', 'MySQL'],
    architecture: 'Frontend-driven workflow application with API-backed CRUD and reporting endpoints. Domain entities are normalized to avoid duplicate student-course relationships.',
    endpoints: ['POST /api/students', 'POST /api/enrollments', 'GET /api/students/:id/results', 'GET /api/courses'],
    databaseLayout: ['students (student_id, full_name, email, department)', 'courses (course_id, title, credit_hours)', 'enrollments (enrollment_id, student_id, course_id, semester)', 'grades (grade_id, enrollment_id, marks, gpa)'],
    highlights: ['Normalized many-to-many relationship handling for enrollments', 'REST API patterns with predictable status and payload handling', 'Frontend performance improvements through component-level state partitioning'],
  },
];

const projectFilters = ['All', 'React', 'Spring Boot', 'Java', 'MySQL', 'JWT'];

const sectionIds = {
  home: 'home',
  skills: 'skills',
  contact: 'contact',
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section && typeof section.scrollIntoView === 'function') {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

function ProjectCard({ project }) {
  return (
    <motion.article variants={fadeUp} whileHover={{ y: -6 }} className="glass-card rounded-2xl border border-slate-200/60 p-6 shadow-lg shadow-cyan-500/10 dark:border-slate-700/70">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300">{project.category}</p>
          <h3 className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-100">{project.title}</h3>
        </div>
        <Briefcase className="h-5 w-5 text-cyan-500" />
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-300">{project.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span key={tech} className="rounded-full border border-cyan-300/70 bg-cyan-100/70 px-3 py-1 text-xs font-medium text-cyan-900 dark:border-cyan-600/50 dark:bg-cyan-500/10 dark:text-cyan-100">
            {tech}
          </span>
        ))}
      </div>
      <Link
        to={`/projects/${project.id}`}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 transition hover:text-cyan-500 dark:text-cyan-300 dark:hover:text-cyan-200"
      >
        View architecture details <ArrowRight className="h-4 w-4" />
      </Link>
    </motion.article>
  );
}

function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: 'Please fill in all fields before sending your message.' });
      return;
    }

    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus({ type: 'error', message: 'EmailJS is not configured. Add REACT_APP_EMAILJS_SERVICE_ID, REACT_APP_EMAILJS_TEMPLATE_ID, and REACT_APP_EMAILJS_PUBLIC_KEY to your environment.' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: 'loading', message: 'Sending your message...' });

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
        },
        { publicKey }
      );

      setStatus({ type: 'success', message: 'Message sent successfully. I will get back to you soon.' });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus({ type: 'error', message: `Failed to send message: ${error?.text || 'Unknown EmailJS error'}` });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="scroll-mt-28 py-16">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Contact</h2>
        <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
          Let&apos;s discuss full-stack opportunities, backend architecture, or collaboration on Spring Boot + React products.
        </p>
      </motion.div>

      <motion.form
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeUp}
        onSubmit={handleSubmit}
        className="glass-card mt-8 max-w-3xl rounded-2xl border border-slate-200/60 p-6 dark:border-slate-700/70"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Name
            <input
              type="text"
              value={formData.name}
              onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white/80 px-4 py-2 text-slate-900 outline-none ring-cyan-300 transition focus:ring dark:border-slate-600 dark:bg-slate-800/60 dark:text-slate-100"
              placeholder="Your name"
            />
          </label>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Email
            <input
              type="email"
              value={formData.email}
              onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white/80 px-4 py-2 text-slate-900 outline-none ring-cyan-300 transition focus:ring dark:border-slate-600 dark:bg-slate-800/60 dark:text-slate-100"
              placeholder="you@example.com"
            />
          </label>
        </div>

        <label className="mt-4 block text-sm font-medium text-slate-700 dark:text-slate-200">
          Message
          <textarea
            value={formData.message}
            onChange={(event) => setFormData((current) => ({ ...current, message: event.target.value }))}
            rows={5}
            className="mt-2 w-full rounded-lg border border-slate-300 bg-white/80 px-4 py-2 text-slate-900 outline-none ring-cyan-300 transition focus:ring dark:border-slate-600 dark:bg-slate-800/60 dark:text-slate-100"
            placeholder="Tell me about your project or opportunity..."
          />
        </label>

        <div className="mt-5 flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:bg-cyan-400"
          >
            <Mail className="h-4 w-4" />
            {isSubmitting ? 'Sending...' : 'Send message'}
          </button>
          {status.message && (
            <p
              className={`text-sm ${
                status.type === 'success'
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : status.type === 'error'
                  ? 'text-rose-600 dark:text-rose-400'
                  : 'text-cyan-600 dark:text-cyan-300'
              }`}
            >
              {status.message}
            </p>
          )}
        </div>
      </motion.form>
    </section>
  );
}

function HomePage() {
  const location = useLocation();

  useEffect(() => {
    const targetSection = location.state?.scrollTarget;
    if (targetSection) {
      requestAnimationFrame(() => {
        scrollToSection(targetSection);
      });
    }
  }, [location.state]);

  return (
    <main id={sectionIds.home} className="mx-auto max-w-6xl px-5 pb-16 pt-10 md:px-8">
      <section className="py-10">
        <motion.div initial="hidden" animate="show" variants={fadeUp} className="glass-card rounded-3xl border border-slate-200/70 p-8 shadow-2xl shadow-cyan-500/10 dark:border-slate-700/70 md:p-12">
          <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/70 bg-cyan-100/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-800 dark:border-cyan-500/50 dark:bg-cyan-500/10 dark:text-cyan-200">
            Open to full-time backend and full-stack roles
          </p>
          <h1 className="mt-5 text-4xl font-black leading-tight text-slate-900 dark:text-slate-100 md:text-6xl">{profile.name}</h1>
          <h2 className="mt-3 text-lg font-semibold text-cyan-700 dark:text-cyan-300 md:text-2xl">{profile.role}</h2>
          <p className="mt-5 max-w-4xl text-base leading-relaxed text-slate-700 dark:text-slate-300 md:text-lg">{profile.headline}</p>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 md:text-base">{profile.bio}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white">
              <Code2 className="h-4 w-4" />
              GitHub
            </a>
            <Link to="/projects" className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-cyan-400 hover:text-cyan-700 dark:border-slate-600 dark:bg-slate-800/60 dark:text-slate-200 dark:hover:border-cyan-500 dark:hover:text-cyan-300">
              View Projects <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </section>

      <section id="skills" className="scroll-mt-28 py-14">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Core Technical Expertise</h2>
          <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
            Focused on scalable backend services, dependable data models, and fast, user-first frontend interfaces.
          </p>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="mt-6 flex flex-wrap gap-3"
        >
          {profile.skills.map((skill) => (
            <span key={skill} className="rounded-full border border-cyan-300/70 bg-cyan-100/70 px-4 py-2 text-sm font-semibold text-cyan-900 dark:border-cyan-600/50 dark:bg-cyan-500/10 dark:text-cyan-200">
              {skill}
            </span>
          ))}
        </motion.div>
      </section>

      <section className="py-14">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="mb-7 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Top Projects</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">Architecture-first project highlights with measurable product impact.</p>
          </div>
          <Link to="/projects" className="hidden items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-cyan-400 hover:text-cyan-700 dark:border-slate-600 dark:text-slate-200 dark:hover:border-cyan-500 dark:hover:text-cyan-300 md:inline-flex">
            See all <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }} className="grid gap-6 md:grid-cols-2">
          {projects.slice(0, 2).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </section>

      <ContactSection />
    </main>
  );
}

function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = useMemo(
    () =>
      activeFilter === 'All'
        ? projects
        : projects.filter((project) => project.stack.some((item) => item.toLowerCase() === activeFilter.toLowerCase())),
    [activeFilter]
  );

  return (
    <main className="mx-auto max-w-6xl px-5 pb-16 pt-10 md:px-8">
      <motion.section initial="hidden" animate="show" variants={fadeUp} className="glass-card rounded-3xl border border-slate-200/70 p-8 dark:border-slate-700/70">
        <h1 className="text-4xl font-black text-slate-900 dark:text-slate-100">Projects</h1>
        <p className="mt-3 max-w-3xl text-slate-600 dark:text-slate-300">
          Explore architecture decisions, backend API design, and data-layer thinking across my featured builds.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {projectFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeFilter === filter
                  ? 'bg-cyan-600 text-white'
                  : 'border border-slate-300 bg-white/70 text-slate-700 hover:border-cyan-400 hover:text-cyan-700 dark:border-slate-600 dark:bg-slate-800/60 dark:text-slate-200 dark:hover:border-cyan-500 dark:hover:text-cyan-300'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </motion.section>

      <motion.section initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }} className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.section>
    </main>
  );
}

function ProjectDetailPage() {
  const { projectId } = useParams();
  const project = projects.find((item) => item.id === projectId);

  if (!project) {
    return (
      <main className="mx-auto max-w-4xl px-5 py-20 text-center md:px-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Project not found</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">The requested project detail page does not exist.</p>
        <Link to="/projects" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white">
          Back to projects <ArrowRight className="h-4 w-4" />
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-5 pb-16 pt-10 md:px-8">
      <motion.section initial="hidden" animate="show" variants={fadeUp} className="glass-card rounded-3xl border border-slate-200/70 p-8 dark:border-slate-700/70">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-300">{project.category}</p>
        <h1 className="mt-2 text-4xl font-black text-slate-900 dark:text-slate-100">{project.title}</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">{project.tagline}</p>
      </motion.section>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <motion.section initial="hidden" animate="show" variants={fadeUp} className="glass-card rounded-2xl border border-slate-200/60 p-6 dark:border-slate-700/70">
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-slate-100">
            <Building2 className="h-5 w-5 text-cyan-500" />
            System architecture
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{project.architecture}</p>
          <h3 className="mt-6 text-sm font-semibold uppercase tracking-[0.15em] text-slate-700 dark:text-slate-300">Spring Boot endpoints</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            {project.endpoints.map((endpoint) => (
              <li key={endpoint} className="rounded-lg border border-slate-200/80 bg-white/75 px-3 py-2 dark:border-slate-700 dark:bg-slate-800/50">
                {endpoint}
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section initial="hidden" animate="show" variants={fadeUp} className="glass-card rounded-2xl border border-slate-200/60 p-6 dark:border-slate-700/70">
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-slate-100">
            <Database className="h-5 w-5 text-cyan-500" />
            MySQL database layout
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            {project.databaseLayout.map((item) => (
              <li key={item} className="rounded-lg border border-slate-200/80 bg-white/75 px-3 py-2 dark:border-slate-700 dark:bg-slate-800/50">
                {item}
              </li>
            ))}
          </ul>
          <h3 className="mt-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-slate-700 dark:text-slate-300">
            <ShieldCheck className="h-4 w-4 text-cyan-500" />
            Technical depth
          </h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
            {project.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </motion.section>
      </div>

      <motion.section initial="hidden" animate="show" variants={fadeUp} className="glass-card mt-8 rounded-2xl border border-slate-200/60 p-6 dark:border-slate-700/70">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Impact highlights</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
          {project.impact.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </motion.section>
    </main>
  );
}

function ResumePage() {
  const resumePath = `${process.env.PUBLIC_URL}/resume.pdf`;

  return (
    <main className="mx-auto max-w-6xl px-5 pb-16 pt-10 md:px-8">
      <motion.section initial="hidden" animate="show" variants={fadeUp} className="glass-card rounded-3xl border border-slate-200/70 p-8 dark:border-slate-700/70">
        <h1 className="text-4xl font-black text-slate-900 dark:text-slate-100">Resume</h1>
        <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
          Focused on backend reliability, scalable API design, and high-quality frontend delivery for production teams.
        </p>
        <a href={resumePath} download className="mt-6 inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-500">
          <Download className="h-4 w-4" />
          Download resume
        </a>
      </motion.section>

      <motion.section initial="hidden" animate="show" variants={fadeUp} className="mt-8">
        <div className="glass-card overflow-hidden rounded-2xl border border-slate-200/60 dark:border-slate-700/70">
          <iframe title="Resume PDF Viewer" src={resumePath} className="h-[72vh] w-full bg-white" />
        </div>
      </motion.section>
    </main>
  );
}

function AppLayout({ theme, onToggleTheme }) {
  const location = useLocation();
  const navigate = useNavigate();

  const goToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTarget: sectionId } });
      return;
    }
    scrollToSection(sectionId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-cyan-50 to-slate-200 text-slate-900 transition-colors dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 dark:text-slate-100">
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/65 backdrop-blur-xl dark:border-slate-700/80 dark:bg-slate-900/60">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <Link to="/" className="text-lg font-black tracking-tight text-cyan-700 dark:text-cyan-300">
            AZ.dev
          </Link>
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <button onClick={() => goToSection(sectionIds.home)} className="nav-link" type="button">
              Home
            </button>
            <button onClick={() => goToSection(sectionIds.skills)} className="nav-link" type="button">
              Skills
            </button>
            <NavLink to="/projects" className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}>
              Projects
            </NavLink>
            <NavLink to="/resume" className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}>
              Resume
            </NavLink>
            <button onClick={() => goToSection(sectionIds.contact)} className="nav-link" type="button">
              Contact
            </button>
            <button
              type="button"
              onClick={onToggleTheme}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white/80 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-cyan-400 hover:text-cyan-700 dark:border-slate-600 dark:bg-slate-800/70 dark:text-slate-200 dark:hover:border-cyan-500 dark:hover:text-cyan-300"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
          </div>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <footer className="border-t border-slate-200/70 py-6 text-center text-sm text-slate-600 dark:border-slate-700/70 dark:text-slate-400">
        <p>
          © {new Date().getFullYear()} {profile.name} · Built with React + HashRouter for GitHub Pages
        </p>
        <p className="mt-2 inline-flex items-center gap-2">
          <FileText className="h-4 w-4" /> Java · Spring Boot · React · MySQL
        </p>
      </footer>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppLayout theme={theme} onToggleTheme={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))} />
    </HashRouter>
  );
}

export default App;