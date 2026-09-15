# ROCK2

ROCK2 is a clean, responsive commerce storefront for the ROCK technology-accessories brand.

## Brand direction

- Primary: Deep Navy `#0B1F3A`
- Secondary: White `#FFFFFF`
- Supporting neutrals only
- Premium, minimal, practical visual language

## UX priorities

- Mobile-first shopping experience
- Shop by need
- Search across product name, category, description and use case
- Category, price and availability filters
- Product sorting
- Stable product-media containers
- Product details modal
- Persistent cart with quantity controls
- Keyboard focus states and reduced-motion support

## Structure

The current v1 is intentionally small and dependency-free:

- `index.html` — storefront structure
- `styles.css` — single source of truth for the design system and responsive layout
- `app.js` — product data, discovery, filters, product details and cart behavior
- `.github/workflows/pages.yml` — GitHub Pages deployment

Product data is kept in `app.js` for the prototype. It can be moved to JSON/API data later without redesigning the UI.
