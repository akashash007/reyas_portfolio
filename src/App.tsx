import { useEffect, useRef, useState } from 'react'
import './App.css'

// ─── DATA ──────────────────────────────────────────────────────────────────

const SKILLS = [
  { name: 'Manual Testing', cat: 'testing', icon: '🔍' },
  { name: 'Regression Testing', cat: 'testing', icon: '🔄' },
  { name: 'Smoke Testing', cat: 'testing', icon: '💨' },
  { name: 'Functional Testing', cat: 'testing', icon: '✅' },
  { name: 'Exploratory Testing', cat: 'testing', icon: '🧭' },
  { name: 'Selenium', cat: 'automation', icon: '⚙️' },
  { name: 'Cypress', cat: 'automation', icon: '🌲' },
  { name: 'Playwright', cat: 'automation', icon: '🎭' },
  { name: 'WebDriverIO', cat: 'automation', icon: '🚗' },
  { name: 'Postman', cat: 'api', icon: '📡' },
  { name: 'REST API Testing', cat: 'api', icon: '🔗' },
  { name: 'Jira', cat: 'tools', icon: '📋' },
  { name: 'Git', cat: 'tools', icon: '🌿' },
  { name: 'Jenkins', cat: 'tools', icon: '🏗️' },
  { name: 'GitHub Actions', cat: 'tools', icon: '⚡' },
  { name: 'SQL', cat: 'database', icon: '🗄️' },
  { name: 'MongoDB', cat: 'database', icon: '🍃' },
]

const CATS = ['all', 'testing', 'automation', 'api', 'tools', 'database']

const EXPERIENCES = [
  {
    role: 'Senior QA Engineer',
    company: 'TechCorp Solutions',
    period: '2023 – Present',
    bullets: [
      'Architected and maintained a Playwright end-to-end suite covering 95% of critical user flows',
      'Reduced regression cycle from 3 days to 4 hours via automation on GitHub Actions CI/CD',
      'Led weekly QA syncs, aligning testing priorities with sprint goals across 3 scrum teams',
      'Designed and executed API test collections in Postman covering 120+ REST endpoints',
      'Mentored 2 junior QA engineers on automation best practices and test design patterns',
    ],
    tags: ['Playwright', 'GitHub Actions', 'Postman', 'Jira', 'Agile'],
  },
  {
    role: 'QA Engineer',
    company: 'Finova Digital',
    period: '2021 – 2023',
    bullets: [
      'Built Cypress automation suite from scratch; covered 80+ test scenarios in first quarter',
      'Performed comprehensive manual testing for a fintech app with 200k+ daily active users',
      'Identified and reported 300+ bugs with detailed reproduction steps, logs, and severity ratings',
      'Collaborated with backend developers on database validation using SQL queries',
      'Integrated automated tests into Jenkins pipeline, enabling nightly regression runs',
    ],
    tags: ['Cypress', 'Jenkins', 'SQL', 'Manual Testing'],
  },
  {
    role: 'QA Analyst',
    company: 'Launchpad Startup',
    period: '2020 – 2021',
    bullets: [
      'Designed 200+ manual test cases for a SaaS product from MVP to production launch',
      'Performed functional, regression, smoke, and exploratory testing across web and mobile',
      'Managed defect lifecycle in Jira with detailed bug reports and priority triage',
    ],
    tags: ['Jira', 'Manual Testing', 'Test Cases'],
  },
]

const PROJECTS = [
  {
    type: 'E-Commerce Platform',
    title: 'Full-Stack Testing Suite',
    desc: 'End-to-end test automation for a high-traffic e-commerce platform handling 50k+ daily transactions. Covered checkout flows, inventory management, and payment gateway integrations.',
    checks: ['Functional Testing', 'API Testing', 'Regression Automation', 'Performance Baseline'],
    tools: ['Selenium', 'Postman', 'Jira', 'Jenkins'],
    result: 'Reduced production defects by 68% in 3 months after framework launch.',
  },
  {
    type: 'Fintech Mobile App',
    title: 'API & Security Test Framework',
    desc: 'Comprehensive API and security testing for a digital banking application. Validated 120+ REST endpoints, authorization flows, and data encryption requirements.',
    checks: ['REST API Testing', 'Security Validation', 'Auth Flow Testing', 'Schema Validation'],
    tools: ['Postman', 'Playwright', 'GitHub Actions'],
    result: 'Zero critical security defects reached production across 4 release cycles.',
  },
  {
    type: 'SaaS Dashboard',
    title: 'Cypress Automation Framework',
    desc: 'Built a scalable Cypress test framework for a complex analytics dashboard with real-time data visualisations, role-based access control, and multi-tenant architecture.',
    checks: ['Cross-Browser Testing', 'RBAC Validation', 'Data Integrity Checks', 'CI/CD Integration'],
    tools: ['Cypress', 'GitHub Actions', 'SQL'],
    result: '90% test coverage achieved. Release confidence improved, cycle shortened by 40%.',
  },
]

const PROCESS = [
  { num: '01', label: 'Requirement Analysis', detail: 'Understand feature goals and edge cases early' },
  { num: '02', label: 'Test Planning', detail: 'Define scope, strategy, and resource allocation' },
  { num: '03', label: 'Test Case Design', detail: 'Write clear, reusable test scenarios' },
  { num: '04', label: 'Test Execution', detail: 'Manual + automated testing in parallel' },
  { num: '05', label: 'Bug Reporting', detail: 'Detailed defect reports with severity & steps' },
  { num: '06', label: 'Release Validation', detail: 'Sign-off after regression + smoke pass' },
]

const CERTS = [
  { icon: '🏅', badge: 'ISTQB', name: 'Certified Tester Foundation Level', org: 'ISTQB International', year: '2021' },
  { icon: '⚙️', badge: 'Automation', name: 'Selenium WebDriver with Java', org: 'Test Automation University', year: '2022' },
  { icon: '🔄', badge: 'Agile', name: 'Professional Scrum Master I', org: 'Scrum.org', year: '2022' },
  { icon: '🎭', badge: 'Playwright', name: 'Playwright Automation Testing', org: 'LambdaTest Certification', year: '2024' },
]

// ─── HOOKS ─────────────────────────────────────────────────────────────────

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) } }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

// ─── COMPONENTS ────────────────────────────────────────────────────────────

function Nav() {
  const navRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const handler = () => {
      if (navRef.current)
        navRef.current.style.borderBottomColor = window.scrollY > 50 ? 'rgba(255,255,255,0.14)' : 'var(--border)'
    }
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])
  return (
    <nav className="nav" ref={navRef}>
      <a href="#hero" className="nav-logo">AM</a>
      <ul className="nav-links">
        {['about', 'skills', 'experience', 'projects', 'certifications', 'contact'].map(s => (
          <li key={s}><a href={`#${s}`}>{s.charAt(0).toUpperCase() + s.slice(1)}</a></li>
        ))}
      </ul>
      <a href="#contact" className="nav-cta">Hire Me</a>
    </nav>
  )
}

function Hero() {
  const tags = [
    { icon: '⚙', label: 'Selenium' },
    { icon: '🌲', label: 'Cypress' },
    { icon: '🎭', label: 'Playwright' },
    { icon: '📡', label: 'API Testing' },
    { icon: '🤖', label: 'Automation' },
    { icon: '🔁', label: 'CI/CD' },
  ]
  return (
    <section className="hero" id="hero">
      <div className="hero-bg" />
      <div className="hero-grid" />
      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Available for opportunities
          </div>
          <h1 className="hero-name">
            Alex<br /><span>Morgan</span>
          </h1>
          <p className="hero-tagline">Ensuring Quality. Building Reliable Software.</p>
          <p className="hero-desc">
            Senior QA Engineer with 4+ years of experience in manual &amp; automation testing.
            I build robust test frameworks, eliminate bugs before they reach production,
            and champion a quality-first engineering culture.
          </p>
          <div className="hero-btns">
            <a href="#projects" className="btn-primary">View Projects ↓</a>
            <a href="#contact" className="btn-outline">Contact Me →</a>
          </div>
        </div>
      </div>
      <div className="float-tags">
        {tags.map(t => (
          <div key={t.label} className="ftag">{t.icon} {t.label}</div>
        ))}
      </div>
    </section>
  )
}

function About() {
  const stats = [
    { num: '4+', label: 'Years Experience' },
    { num: '200+', label: 'Test Cases Designed' },
    { num: '500+', label: 'Bugs Identified' },
    { num: '99%', label: 'Quality Focus' },
  ]
  const badges = ['Manual Testing', 'Automation', 'API Testing', 'Agile/Scrum', 'Bug Tracking']
  const traits = [
    { icon: '🔍', title: 'Quality Mindset', desc: 'Every feature is an opportunity to prevent failure and delight users.' },
    { icon: '🤖', title: 'Automation First', desc: 'Scalable test suites that run on every commit via CI/CD pipelines.' },
    { icon: '🔄', title: 'Agile / Scrum', desc: 'Fully integrated into sprint cycles — from grooming to retrospectives.' },
  ]
  return (
    <section className="section section--alt" id="about">
      <div className="container">
        <div className="section-label">About Me</div>
        <h2 className="section-title">Quality is not an <span>accident</span></h2>
        <div className="about-grid reveal">
          <div className="profile-card">
            <div className="avatar">AM</div>
            <h3>Alex Morgan</h3>
            <p className="profile-role">Senior QA Engineer</p>
            <p className="profile-loc">📍 San Francisco, CA</p>
            <div className="skill-badges">
              {badges.map(b => <span key={b} className="badge">{b}</span>)}
            </div>
            <div className="stats-grid">
              {stats.map(s => (
                <div key={s.num} className="stat-card">
                  <div className="stat-num">{s.num}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="about-text">
            <p>I'm a QA Engineer who believes quality is the backbone of every great product. With 4+ years in the field, I specialize in designing and executing comprehensive test strategies that catch issues before they ever reach end users.</p>
            <p>My approach blends rigorous manual testing with intelligent automation frameworks built on Selenium, Cypress, and Playwright — letting teams ship faster while maintaining confidence in every release.</p>
            <p>I thrive in Agile environments, collaborating closely with developers, product managers, and designers to embed quality into every stage of the development cycle — not just at the end.</p>
            <div className="about-traits">
              {traits.map(t => (
                <div key={t.title} className="trait">
                  <span className="trait-icon">{t.icon}</span>
                  <div>
                    <div className="trait-title">{t.title}</div>
                    <div className="trait-desc">{t.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Skills() {
  const [active, setActive] = useState('all')
  const filtered = active === 'all' ? SKILLS : SKILLS.filter(s => s.cat === active)
  return (
    <section className="section" id="skills">
      <div className="container">
        <div className="section-label">Technical Skills</div>
        <h2 className="section-title">A complete <span>testing toolkit</span></h2>
        <p className="section-sub">From exploratory testing to complex automation frameworks — tools I use daily.</p>
        <div className="skills-cats reveal">
          {CATS.map(c => (
            <button
              key={c}
              className={`cat-btn${active === c ? ' active' : ''}`}
              onClick={() => setActive(c)}
            >
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>
        <div className="skills-grid reveal">
          {filtered.map(s => (
            <div key={s.name} className="skill-card">
              <div className="skill-card-icon">{s.icon}</div>
              <div className="skill-card-name">{s.name}</div>
              <div className="skill-card-cat">{s.cat.charAt(0).toUpperCase() + s.cat.slice(1)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section className="section section--alt" id="experience">
      <div className="container">
        <div className="section-label">Experience</div>
        <h2 className="section-title">Building quality at <span>scale</span></h2>
        <div className="timeline reveal">
          {EXPERIENCES.map((exp, i) => (
            <div key={i} className="timeline-item">
              <div className="timeline-dot" />
              <div className="exp-card">
                <div className="exp-header">
                  <div>
                    <div className="exp-role">{exp.role}</div>
                    <div className="exp-company">{exp.company}</div>
                  </div>
                  <span className="exp-period">{exp.period}</span>
                </div>
                <ul className="exp-list">
                  {exp.bullets.map((b, j) => (
                    <li key={j}><span className="exp-bullet" />{b}</li>
                  ))}
                </ul>
                <div className="exp-tags">
                  {exp.tags.map(t => <span key={t} className="exp-tag">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="section-label">Projects</div>
        <h2 className="section-title">Quality delivered, <span>results proven</span></h2>
        <div className="projects-grid reveal">
          {PROJECTS.map((p, i) => (
            <div key={i} className="proj-card">
              <div className="proj-type">{p.type}</div>
              <div className="proj-title">{p.title}</div>
              <div className="proj-desc">{p.desc}</div>
              <div className="proj-checks">
                {p.checks.map(c => (
                  <div key={c} className="proj-check">
                    <span className="proj-check-mark">✓</span>{c}
                  </div>
                ))}
              </div>
              <div className="proj-tools">
                {p.tools.map(t => <span key={t} className="proj-tool">{t}</span>)}
              </div>
              <div className="proj-result"><strong>Outcome:</strong> {p.result}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section className="section section--alt" id="process">
      <div className="container">
        <div className="section-label">Testing Process</div>
        <h2 className="section-title">How I ensure <span>nothing slips</span></h2>
        <p className="section-sub">A structured, repeatable workflow that catches issues at every stage of the development cycle.</p>
        <div className="process-flow reveal">
          {PROCESS.map(p => (
            <div key={p.num} className="process-step">
              <div className="process-num">{p.num}</div>
              <div className="process-label">{p.label}</div>
              <div className="process-detail">{p.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Certifications() {
  return (
    <section className="section" id="certifications">
      <div className="container">
        <div className="section-label">Certifications</div>
        <h2 className="section-title">Credentials that <span>back the work</span></h2>
        <div className="certs-grid reveal">
          {CERTS.map((c, i) => (
            <div key={i} className="cert-card">
              <div className="cert-icon">{c.icon}</div>
              <span className="cert-badge-tag">{c.badge}</span>
              <div className="cert-name">{c.name}</div>
              <div className="cert-org">{c.org}</div>
              <div className="cert-year">{c.year}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const links = [
    { icon: '✉', label: 'alex.morgan@email.com', href: 'mailto:alex.morgan@email.com' },
    { icon: 'in', label: 'LinkedIn', href: 'https://linkedin.com' },
    { icon: '⌥', label: 'GitHub', href: 'https://github.com' },
  ]
  return (
    <section className="section section--alt" id="contact">
      <div className="container">
        <div className="contact-inner reveal">
          <div className="section-label" style={{ textAlign: 'center' }}>Get In Touch</div>
          <h2 className="contact-tagline">Let's build better software together</h2>
          <p className="contact-sub">Open to full-time roles, contract work, and consulting. I'd love to bring quality engineering to your team.</p>
          <div className="contact-links">
            {links.map(l => (
              <a key={l.label} href={l.href} className="contact-link" target="_blank" rel="noreferrer">
                <span className="contact-link-icon">{l.icon}</span>{l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const socials = [
    { label: 'in', href: 'https://linkedin.com' },
    { label: '⌥', href: 'https://github.com' },
    { label: '✉', href: 'mailto:alex.morgan@email.com' },
  ]
  return (
    <footer className="footer">
      <span className="footer-copy">© 2026 Alex Morgan — QA Engineer. All rights reserved.</span>
      <div className="footer-socials">
        {socials.map(s => (
          <a key={s.label} href={s.href} className="footer-social" aria-label={s.label}>{s.label}</a>
        ))}
      </div>
    </footer>
  )
}

// ─── APP ───────────────────────────────────────────────────────────────────

function App() {
  useReveal()
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Process />
      <Certifications />
      <Contact />
      <Footer />
    </>
  )
}

export default App