# EcoYaan Checkout Flow

A modern, responsive, and aesthetically pleasing checkout flow for an eco-friendly e-commerce platform.


## Architectural Choices

Next.js was chosen for its file-system-based routing (App Router)

Tailwind CSS was utilized to rapidly build custom, complex designs .

A core `.glass` utility class was created in `globals.css` alongside Tailwind utilities to enforce a consistent translucent design language across all cards and sections. 

The UI was built with responsive prefixes  to ensure cards scale smoothly, typographic is maintained, and layouts  on mobile screens.

Zustand was selected over React Context or Redux due to its simplicity, minimal boilerplate, and excellent performance. 

The `useCheckoutStore` acts as a centralized brain for cart items, saved shipping addresses, selected payment methods, and applied coupons.

The store uses Zustand's persist middleware (saving to `localStorage`) to ensure that users do not lose their cart items or typed shipping details if they accidentally refresh the page during checkout.

Lucide React was chosen for iconography due to its clean, consistent, and highly customizable SVG icons that integrate flawlessly with Tailwind CSS sizing and coloring utilities.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
