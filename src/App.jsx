import { useEffect, useState } from 'react'
import './App.css'
import Gallery from './Gallery'

function Countdown({ target }) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    function calc() {
      const diff = new Date(target) - Date.now()
      if (diff <= 0) return setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }
    calc()
    const id = setInterval(calc, 1000)
    return () => clearInterval(id)
  }, [target])

  return (
    <div className="countdown">
      {Object.entries(time).map(([k, v]) => (
        <div className="countdown-item" key={k}>
          <span className="countdown-number">{String(v).padStart(2, '0')}</span>
          <span className="countdown-label">{k}</span>
        </div>
      ))}
    </div>
  )
}

function App() {
  return (
    <>
      <nav className="nav">
        <a href="#historia">Historia</a>
        <a href="#evento">Evento</a>
        <a href="#galeria">Galería</a>
        <a href="#rsvp">RSVP</a>
      </nav>

      <section className="hero">
        <div className="hero-decoration">&#10087;</div>
        <h1>
          Isa <span className="ampersand">&</span> Camilo
        </h1>
        <p className="subtitle">Nos casamos</p>
        <p className="date">15 · Noviembre · 2026</p>
        <Countdown target="2026-11-15T16:00:00" />
      </section>

      <div className="divider" />

      <section id="historia" className="section">
        <h2>Nuestra Historia</h2>
        <div className="divider" />
        <p>
          Todo comenzó en un café en el centro de la ciudad. Dos desconocidos,
          una conversación que nunca terminó, y la certeza de que el destino
          tenía algo especial preparado.
        </p>
        <p>
          Desde entonces, cada día ha sido una página más en nuestra historia.
          Hoy queremos escribir el capítulo más importante, y queremos que
          ustedes sean parte de él.
        </p>
      </section>

      <div className="divider" />

      <section id="evento" className="section">
        <h2>El Gran Día</h2>
        <div className="divider" />
        <p>15 de Noviembre de 2026</p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--gold)', letterSpacing: '0.15rem' }}>
          Hacienda Los Arrayanes · 4:00 PM
        </p>
        <div className="timeline">
          <div className="timeline-item">
            <span className="timeline-time">4:00 PM</span>
            <span className="timeline-desc">Recepción de invitados</span>
          </div>
          <div className="timeline-item">
            <span className="timeline-time">5:00 PM</span>
            <span className="timeline-desc">Ceremonia civil</span>
          </div>
          <div className="timeline-item">
            <span className="timeline-time">6:30 PM</span>
            <span className="timeline-desc">Cóctel y apertura de bar</span>
          </div>
          <div className="timeline-item">
            <span className="timeline-time">8:00 PM</span>
            <span className="timeline-desc">Cena</span>
          </div>
          <div className="timeline-item">
            <span className="timeline-time">10:00 PM</span>
            <span className="timeline-desc">Fiesta y baile</span>
          </div>
        </div>
      </section>

      <div className="divider" />

      <Gallery />

      <div className="divider" />

      <section id="rsvp" className="section">
        <h2>Confirmá tu Asistencia</h2>
        <div className="divider" />
        <p>
          Por favor, confirmá tu presencia antes del 15 de octubre para que
          podamos organizar todo con el cariño que se merece.
        </p>
        <a href="mailto:isa.camilo@email.com" className="rsvp-btn">
          Confirmar Asistencia
        </a>
      </section>

      <footer>
        <p>Isa & Camilo · 15.11.2026</p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>
          Hecho con amor para nuestros invitados
        </p>
      </footer>
    </>
  )
}

export default App
