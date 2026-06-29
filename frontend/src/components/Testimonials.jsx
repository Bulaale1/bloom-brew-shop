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
    text: 'Ordered the Green Detox Smoothie and the Brownies — what a combo! Super easy to order and delivery was quick. Will definitely be back.',
    date: 'June 2026',
  },
]

const Stars = ({ count }) => (
  <div className="testimonial__stars" aria-label={`${count} out of 5 stars`}>
    {Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < count ? 'star star--filled' : 'star'}>★</span>
    ))}
  </div>
)

export default function Testimonials() {
  return (
    <section className="testimonials" aria-labelledby="testimonials-title">
      <h2 className="testimonials__title" id="testimonials-title">What Our Customers Say</h2>
      <div className="testimonials__grid">
        {TESTIMONIALS.map((t) => (
          <article key={t.id} className="testimonial">
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
        ))}
      </div>
    </section>
  )
}
