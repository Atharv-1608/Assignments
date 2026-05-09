import { useState } from 'react'
import './App.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="landing">
      <header className="header">
        <a href="/" className="logo">Drive</a>
        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
          <a href="#features">Features</a>
          <a href="#how">How it works</a>
          <a href="#book">Book</a>
        </nav>
        <button
          type="button"
          className="menu-btn"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <main>
        <section className="hero">
          <div className="hero-bg" aria-hidden />
          <div className="hero-content">
            <p className="hero-label">Car rental, simplified</p>
            <h1 className="hero-title">
              Book your ride.
              <br />
              <span className="hero-title-accent">Any car. Any day.</span>
            </h1>
            <p className="hero-desc">
              Reserve in seconds, drive in minutes. No hidden fees, no hassle — just the open road.
            </p>
            <div className="hero-actions">
              <a href="#book" className="btn btn-primary">Book now</a>
              <a href="#how" className="btn btn-ghost">How it works</a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="car-silhouette" aria-hidden />
          </div>
        </section>

        <section id="features" className="features">
          <h2 className="section-title">Why Drive</h2>
          <ul className="feature-grid">
            <li className="feature-card">
              <span className="feature-icon">⚡</span>
              <h3>Instant booking</h3>
              <p>Choose your car and dates. Confirmation in seconds.</p>
            </li>
            <li className="feature-card">
              <span className="feature-icon">📋</span>
              <h3>Clear pricing</h3>
              <p>See your total upfront. No surprises at pickup.</p>
            </li>
            <li className="feature-card">
              <span className="feature-icon">🔒</span>
              <h3>Secure & simple</h3>
              <p>Your bookings and data stay safe with us.</p>
            </li>
          </ul>
        </section>

        <section id="how" className="how">
          <h2 className="section-title">How it works</h2>
          <ol className="steps">
            <li>
              <span className="step-num">1</span>
              <h3>Sign up</h3>
              <p>Create an account in under a minute.</p>
            </li>
            <li>
              <span className="step-num">2</span>
              <h3>Pick your car</h3>
              <p>Browse available cars and select your dates.</p>
            </li>
            <li>
              <span className="step-num">3</span>
              <h3>Hit the road</h3>
              <p>Confirm, pay, and drive. That’s it.</p>
            </li>
          </ol>
        </section>

        <section id="book" className="cta">
          <div className="cta-inner">
            <h2 className="cta-title">Ready to go?</h2>
            <p className="cta-desc">Book your first rental and get on the road today.</p>
            <a href="/book" className="btn btn-primary btn-lg">Get started</a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Drive. Built for the road.</p>
      </footer>
    </div>
  )
}

export default App
