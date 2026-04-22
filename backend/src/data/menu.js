const cafeMenu = {
  coffee: [
    {
      id: "coffee-espresso",
      name: "Espresso",
      priceCents: 300,
      imagePath: "/images/coffee/espresso.jpg",
      available: true
    },
    {
      id: "coffee-americano",
      name: "Americano",
      priceCents: 375,
      imagePath: "/images/coffee/americano.jpg",
      available: true
    },
    {
      id: "coffee-cappuccino",
      name: "Cappuccino",
      priceCents: 450,
      imagePath: "/images/coffee/cappuccino.jpg",
      available: true
    },
    {
      id: "coffee-latte",
      name: "Latte",
      priceCents: 500,
      imagePath: "/images/coffee/latte.jpg",
      available: true
    },
    {
      id: "coffee-mocha",
      name: "Mocha",
      priceCents: 550,
      imagePath: "/images/coffee/mocha.jpg",
      available: true
    },
    {
      id: "coffee-flat-white",
      name: "Flat White",
      priceCents: 475,
      imagePath: "/images/coffee/flat-white.jpg",
      available: true
    },
    {
      id: "coffee-macchiato",
      name: "Macchiato",
      priceCents: 400,
      imagePath: "/images/coffee/macchiato.jpg",
      available: true
    },
    {
      id: "coffee-caramel-latte",
      name: "Caramel Latte",
      priceCents: 575,
      imagePath: "/images/coffee/caramel-latte.jpg",
      available: true
    },
    {
      id: "coffee-vanilla-latte",
      name: "Vanilla Latte",
      priceCents: 575,
      imagePath: "/images/coffee/vanilla-latte.jpg",
      available: true
    },
    {
      id: "coffee-iced-coffee",
      name: "Iced Coffee",
      priceCents: 425,
      imagePath: "/images/coffee/iced-coffee.jpg",
      available: true
    },
     {
      id: "coffee-iced-latte",
      name: "Iced Coffee",
      priceCents: 425,
      imagePath: "/images/coffee/iced-latte.jpg",
      available: true
    },
    {
      id: "coffee-cold-brew",
      name: "Cold Brew",
      priceCents: 500,
      imagePath: "/images/coffee/cold-brew.jpg",
      available: true
    }
  ],

  desserts: [
    {
      id: "dessert-chocolate-cake",
      name: "Chocolate Cake",
      priceCents: 750,
      imagePath: "/images/desserts/chocolate-cake.jpg",
      available: true
    },
    {
      id: "dessert-cheesecake",
      name: "Cheesecake",
      priceCents: 800,
      imagePath: "/images/desserts/cheesecake.jpg",
      variants: ["Classic", "Strawberry"],
      available: true
    },
    {
      id: "dessert-brownies",
      name: "Brownies",
      priceCents: 425,
      imagePath: "/images/desserts/brownies.jpg",
      available: true
    },
    {
      id: "dessert-chocolate-chip-cookies",
      name: "Chocolate Chip Cookies",
      priceCents: 325,
      imagePath: "/images/desserts/chocolate-chip-cookies.jpg",
      available: true
    },
    {
      id: "dessert-tiramisu",
      name: "Tiramisu",
      priceCents: 850,
      imagePath: "/images/desserts/tiramisu.jpg",
      available: true
    }
  ],

  smoothies: [
    {
      id: "smoothie-strawberry-banana",
      name: "Strawberry Banana",
      priceCents: 725,
      imagePath: "/images/smoothies/strawberry-banana.jpg",
      ingredients: ["Strawberry", "Banana"],
      available: true
    },
    {
      id: "smoothie-green-detox",
      name: "Green Detox",
      priceCents: 825,
      imagePath: "/images/smoothies/green-detox.jpg",
      ingredients: ["Spinach", "Apple", "Banana"],
      available: true
    },
    {
      id: "smoothie-avocado",
      name: "Avocado Smoothie",
      priceCents: 950,
      imagePath: "/images/smoothies/avocado-smoothie.jpg",
      ingredients: ["Avocado", "Milk"],
      available: true
    }
  ]
};
module.exports = cafeMenu;
