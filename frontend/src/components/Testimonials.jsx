import { useState, useEffect, useRef, useCallback } from 'react'

const CARD_WIDTH_NARROW = 220 // used below 520px
const CARD_GAP = 20
const BREAKPOINT = 520

const getCardStep = () =>
  typeof window !== 'undefined' && window.innerWidth <= BREAKPOINT
    ? CARD_WIDTH_NARROW + CARD_GAP
    : 300 + CARD_GAP

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah M.',
    initials: 'SM',
    rating: 5,
    text: 'Best coffee in town! The Caramel Latte is absolutely divine and the desserts are always fresh. Bloom & Brew is my go-to morning spot.',
    date: 'June 2026',
  },
  {
    id: 2,
    name: 'James O.',
    initials: 'JO',
    rating: 5,
    text: 'The Cold Brew here is something else — smooth, bold, and perfectly chilled. I also tried the Tiramisu and it paired incredibly well.',
    date: 'May 2026',
  },
  {
    id: 3,
    name: 'Amira K.',
    initials: 'AK',
    rating: 5,
    text: 'Ordered the Green Detox Smoothie and the Brownies — what a combo! Super easy to order and everything arrived fresh. Will definitely be back.',
    date: 'June 2026',
  },
  {
    id: 4,
    name: 'Lena R.',
    initials: 'LR',
    rating: 5,
    text: 'The Vanilla Latte is perfection — creamy, not too sweet, just right. And the Cheesecake? Absolutely unreal. This place never disappoints.',
    date: 'April 2026',
  },
  {
    id: 5,
    name: 'Marcus T.',
    initials: 'MT',
    rating: 5,
    text: 'I come here every morning before work. The Flat White is consistently excellent and the staff always has my order ready fast. 10/10.',
    date: 'June 2026',
  },
  {
    id: 6,
    name: 'Priya S.',
    initials: 'PS',
    rating: 5,
    text: "Tried the Mango Passion Smoothie and the Cinnamon Rolls on a whim — honestly one of the best decisions I've made this month.",
    date: 'May 2026',
  },
  {
    id: 7,
    name: 'Daniel W.',
    initials: 'DW',
    rating: 5,
    text: 'The Peanut Butter Banana Smoothie is incredible — thick, filling, and tastes like dessert. Perfect post-workout treat.',
    date: 'March 2026',
  },
  {
    id: 8,
    name: 'Fatima A.',
    initials: 'FA',
    rating: 5,
    text: "Bloom & Brew has the best Macchiato I've ever had outside of Italy. The Chocolate Cake is dense and rich — worth every cent.",
    date: 'April 2026',
  },
  {
    id: 9,
    name: 'Noah L.',
    initials: 'NL',
    rating: 5,
    text: 'Placed an order for the whole team — everyone loved it. Cappuccinos were spot on and the Cupcakes disappeared in minutes.',
    date: 'May 2026',
  },
  {
    id: 10,
    name: 'Yuki H.',
    initials: 'YH',
    rating: 5,
    text: "The Affogato is a must-try — espresso poured over something magical. Simple, elegant, and absolutely satisfying. I'm a regular now.",
    date: 'June 2026',
  },
]

const N = TESTIMONIALS.length

const Stars = ({ count }) => (
  <div className="testimonial__stars" aria-label={`${count} out of 5 stars`}>
    {Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < count ? 'star star--filled' : 'star'}>★</span>
    ))}
  </div>
)

const Card = ({ t }) => (
  <article className="testimonial">
    <Stars count={t.rating} />
    <p className="testimonial__text">"{t.text}"</p>
    <div className="testimonial__author">
      <div className="testimonial__avatar" aria-hidden="true">{t.initials}</div>
      <div>
        <div className="testimonial__name">{t.name}</div>
        <div className="testimonial__date">{t.date}</div>
      </div>
    </div>
  </article>
)

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [noTransition, setNoTransition] = useState(false)
  const [cardStep, setCardStep] = useState(getCardStep)
  const timerRef = useRef(null)
  const currentRef = useRef(0)

  // Keep a ref mirror of current so the setInterval closure can read the latest value
  const safeSetCurrent = useCallback((next) => {
    currentRef.current = next
    setCurrent(next)
  }, [])

  // Re-enable CSS transition two frames after a wrap-jump (so the instant position change paints first)
  useEffect(() => {
    if (!noTransition) return
    const id1 = requestAnimationFrame(() => {
      const id2 = requestAnimationFrame(() => setNoTransition(false))
      return () => cancelAnimationFrame(id2)
    })
    return () => cancelAnimationFrame(id1)
  }, [noTransition])

  // Update card step on resize so translate offsets stay correct on narrow screens
  useEffect(() => {
    const update = () => setCardStep(getCardStep())
    window.addEventListener('resize', update, { passive: true })
    return () => window.removeEventListener('resize', update)
  }, [])

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current)
    if (prefersReducedMotion()) return
    timerRef.current = setInterval(() => {
      const c = currentRef.current
      const next = (c + 1) % N
      if (c === N - 1) setNoTransition(true) // suppress wrap animation
      safeSetCurrent(next)
    }, 3500)
  }, [safeSetCurrent])

  useEffect(() => {
    startTimer()
    return () => clearInterval(timerRef.current)
  }, [startTimer])

  const go = (dir) => {
    const c = currentRef.current
    const next = (c + dir + N) % N
    if ((dir === 1 && c === N - 1) || (dir === -1 && c === 0)) {
      setNoTransition(true) // suppress wrap animation
    }
    safeSetCurrent(next)
    startTimer()
  }

  return (
    <section className="testimonials" aria-labelledby="testimonials-title">
      <h2 className="testimonials__title" id="testimonials-title">What Our Customers Say</h2>

      <div className="testimonials__carousel">
        <button
          className="testimonials__arrow testimonials__arrow--prev"
          onClick={() => go(-1)}
          aria-label="Previous testimonial"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>

        <div className="testimonials__viewport">
          <div
            className="testimonials__track"
            style={{
              transform: `translateX(-${current * cardStep}px)`,
              transition: noTransition ? 'none' : undefined,
            }}
          >
            {TESTIMONIALS.map((t) => <Card key={t.id} t={t} />)}
          </div>
        </div>

        <button
          className="testimonials__arrow testimonials__arrow--next"
          onClick={() => go(1)}
          aria-label="Next testimonial"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>

      <div className="testimonials__dots" role="tablist" aria-label="Testimonial navigation">
        {TESTIMONIALS.map((t, i) => (
          <button
            key={t.id}
            className={`testimonials__dot${i === current ? ' testimonials__dot--active' : ''}`}
            onClick={() => { safeSetCurrent(i); startTimer() }}
            aria-label={`Go to testimonial ${i + 1}`}
            aria-selected={i === current}
            role="tab"
          />
        ))}
      </div>
    </section>
  )
}
