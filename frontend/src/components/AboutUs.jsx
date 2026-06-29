const VALUES = [
  {
    icon: '🌱',
    title: 'Fresh Ingredients',
    desc: 'Every item is made with locally sourced, seasonal ingredients — no shortcuts, ever.',
  },
  {
    icon: '☕',
    title: 'Handcrafted with Care',
    desc: 'Our baristas and bakers put real craft into every cup and every slice, every single day.',
  },
  {
    icon: '🤝',
    title: 'Community First',
    desc: "We're more than a café — we're a gathering place for the people who make this neighbourhood great.",
  },
]

const STATS = [
  { number: '5+',    label: 'Years serving' },
  { number: '1 000+', label: 'Happy customers' },
  { number: '30+',   label: 'Menu items' },
  { number: '100%',  label: 'Made with love' },
]

export default function AboutUs() {
  return (
    <section className="about" aria-labelledby="about-title">
      <div className="about__inner">

        {/* Left — story */}
        <div className="about__story">
          <p className="about__eyebrow">Our Story</p>
          <h2 className="about__title" id="about-title">
            More Than a Cup of Coffee
          </h2>
          <p className="about__body">
            Bloom &amp; Brew started in 2019 as a tiny corner café with a simple belief: great coffee
            and honest food make every day better. What began as a dream between two friends has grown
            into a beloved neighbourhood spot where regulars feel like family.
          </p>
          <p className="about__body">
            We obsess over every detail — from the origin of our espresso beans to the butter in our
            pastries. Because when you care about what goes in, it shows in what comes out.
          </p>

          <div className="about__stats">
            {STATS.map((s) => (
              <div key={s.label} className="about__stat">
                <span className="about__stat-number">{s.number}</span>
                <span className="about__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — values */}
        <div className="about__values">
          {VALUES.map((v) => (
            <div key={v.title} className="about__value">
              <span className="about__value-icon" aria-hidden="true">{v.icon}</span>
              <div>
                <h3 className="about__value-title">{v.title}</h3>
                <p className="about__value-desc">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
