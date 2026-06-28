const pool = require('./pool');

const SEED_MENU = [
  { id: 'coffee-espresso',       name: 'Espresso',              category: 'coffee',    priceCents: 300,  imagePath: '/images/coffee/espresso.jpg',        available: true },
  { id: 'coffee-americano',      name: 'Americano',             category: 'coffee',    priceCents: 375,  imagePath: '/images/coffee/americano.jpg',       available: true },
  { id: 'coffee-cappuccino',     name: 'Cappuccino',            category: 'coffee',    priceCents: 450,  imagePath: '/images/coffee/cappuccino.jpg',      available: true },
  { id: 'coffee-latte',          name: 'Latte',                 category: 'coffee',    priceCents: 500,  imagePath: '/images/coffee/latte.jpg',           available: true },
  { id: 'coffee-mocha',          name: 'Mocha',                 category: 'coffee',    priceCents: 550,  imagePath: '/images/coffee/mocha.jpg',           available: true },
  { id: 'coffee-flat-white',     name: 'Flat White',            category: 'coffee',    priceCents: 475,  imagePath: '/images/coffee/flat-white.jpg',      available: true },
  { id: 'coffee-macchiato',      name: 'Macchiato',             category: 'coffee',    priceCents: 400,  imagePath: '/images/coffee/macchiato.jpg',       available: true },
  { id: 'coffee-caramel-latte',  name: 'Caramel Latte',         category: 'coffee',    priceCents: 575,  imagePath: '/images/coffee/caramel-latte.jpg',   available: true },
  { id: 'coffee-vanilla-latte',  name: 'Vanilla Latte',         category: 'coffee',    priceCents: 575,  imagePath: '/images/coffee/vanilla-latte.jpg',   available: true },
  { id: 'coffee-iced-coffee',    name: 'Iced Coffee',           category: 'coffee',    priceCents: 425,  imagePath: '/images/coffee/iced-coffee.jpg',     available: true },
  { id: 'coffee-iced-latte',     name: 'Iced Latte',            category: 'coffee',    priceCents: 425,  imagePath: '/images/coffee/iced-latte.jpg',      available: true },
  { id: 'coffee-cold-brew',      name: 'Cold Brew',             category: 'coffee',    priceCents: 500,  imagePath: '/images/coffee/cold-brew.jpg',       available: true },

  { id: 'dessert-chocolate-cake',         name: 'Chocolate Cake',         category: 'desserts', priceCents: 750,  imagePath: '/images/desserts/chocolate-cake.jpg',         available: true },
  { id: 'dessert-cheesecake',             name: 'Cheesecake',             category: 'desserts', priceCents: 800,  imagePath: '/images/desserts/cheesecake.jpg',             available: true, variants: ['Classic', 'Strawberry'] },
  { id: 'dessert-brownies',               name: 'Brownies',               category: 'desserts', priceCents: 425,  imagePath: '/images/desserts/brownies.jpg',               available: true },
  { id: 'dessert-chocolate-chip-cookies', name: 'Chocolate Chip Cookies', category: 'desserts', priceCents: 325,  imagePath: '/images/desserts/chocolate-chip-cookies.jpg', available: true },
  { id: 'dessert-tiramisu',               name: 'Tiramisu',               category: 'desserts', priceCents: 850,  imagePath: '/images/desserts/tiramisu.jpg',               available: true },

  { id: 'smoothie-strawberry-banana', name: 'Strawberry Banana',  category: 'smoothies', priceCents: 725,  imagePath: '/images/smoothies/strawberry-banana.jpg',  available: true, ingredients: ['Strawberry', 'Banana'] },
  { id: 'smoothie-green-detox',       name: 'Green Detox',        category: 'smoothies', priceCents: 825,  imagePath: '/images/smoothies/green-detox.jpg',        available: true, ingredients: ['Spinach', 'Apple', 'Banana'] },
  { id: 'smoothie-avocado',           name: 'Avocado Smoothie',   category: 'smoothies', priceCents: 950,  imagePath: '/images/smoothies/avocado-smoothie.jpg',   available: true, ingredients: ['Avocado', 'Milk'] },
];

async function migrate() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS menu_items (
      id          TEXT PRIMARY KEY,
      name        TEXT NOT NULL,
      category    TEXT NOT NULL,
      price_cents INTEGER NOT NULL,
      image_path  TEXT,
      available   BOOLEAN NOT NULL DEFAULT TRUE,
      variants    JSONB,
      ingredients JSONB
    );

    CREATE TABLE IF NOT EXISTS orders (
      id          TEXT PRIMARY KEY,
      items       JSONB NOT NULL,
      total_cents INTEGER NOT NULL,
      status      TEXT NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending', 'preparing', 'ready', 'completed', 'cancelled')),
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  const { rows } = await pool.query('SELECT COUNT(*) FROM menu_items');
  if (parseInt(rows[0].count, 10) === 0) {
    for (const item of SEED_MENU) {
      await pool.query(
        `INSERT INTO menu_items (id, name, category, price_cents, image_path, available, variants, ingredients)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          item.id,
          item.name,
          item.category,
          item.priceCents,
          item.imagePath,
          item.available,
          item.variants    ? JSON.stringify(item.variants)    : null,
          item.ingredients ? JSON.stringify(item.ingredients) : null,
        ]
      );
    }
    console.log(`Seeded ${SEED_MENU.length} menu items.`);
  }
}

module.exports = migrate;
