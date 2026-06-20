import { useEffect, useRef, useState } from 'react'

const images = [
  { id: 1, title: 'Nuestro compromiso', desc: 'El día que dijimos sí por primera vez' },
  { id: 2, title: 'Viaje a la montaña', desc: 'Descubriendo el mundo juntos' },
  { id: 3, title: 'Atardecer en la playa', desc: 'El sol siempre brilla cuando estamos juntos' },
  { id: 4, title: 'Familia y amigos', desc: 'Rodeados de quienes más amamos' },
  { id: 5, title: 'Nuestra canción', desc: 'Bailando como si nadie nos viera' },
  { id: 6, title: 'El primer hogar', desc: 'Donde comenzó nuestro sueño' },
]

export default function Gallery() {
  const scrollRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  function updateButtons() {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 0)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
  }

  function scroll(dir) {
    const el = scrollRef.current
    if (!el) return
    const card = el.querySelector('.gallery-card')
    const gap = 16
    const amount = card ? card.offsetWidth + gap : 320
    el.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => updateButtons()
    el.addEventListener('scroll', onScroll)
    updateButtons()
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="galeria" className="section gallery-section">
      <h2>Galería</h2>
      <div className="divider" />
      <p>Nuestros momentos favoritos</p>

      <div className="gallery-wrapper">
        <button
          className="gallery-arrow gallery-arrow-left"
          onClick={() => scroll(-1)}
          style={{ opacity: canScrollLeft ? 1 : 0, pointerEvents: canScrollLeft ? 'auto' : 'none' }}
          aria-label="Anterior"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div className="gallery-track" ref={scrollRef}>
          {images.map((img) => (
            <div className="gallery-card" key={img.id}>
              <div className="gallery-card-inner">
                <div className="gallery-img">
                  <span>&#9825;</span>
                </div>
                <div className="gallery-overlay">
                  <h3>{img.title}</h3>
                  <p>{img.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className="gallery-arrow gallery-arrow-right"
          onClick={() => scroll(1)}
          style={{ opacity: canScrollRight ? 1 : 0, pointerEvents: canScrollRight ? 'auto' : 'none' }}
          aria-label="Siguiente"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      <div className="gallery-dots">
        {images.map((_, i) => (
          <span key={i} className="gallery-dot" onClick={() => {
            const el = scrollRef.current
            if (!el) return
            const card = el.querySelector('.gallery-card')
            const gap = 16
            const amount = card ? card.offsetWidth + gap : 320
            el.scrollTo({ left: amount * i, behavior: 'smooth' })
          }} />
        ))}
      </div>
    </section>
  )
}
