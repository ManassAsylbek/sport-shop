# Personal Best Sportswear - E-commerce Store

A modern e-commerce store for sportswear built with React, featuring shopping cart, localStorage persistence, and Stripe payment integration.

## 🚀 Features

- **Full Shopping Experience**: Browse products, add to cart, checkout
- **Shopping Cart**: Persistent cart with localStorage
- **Product Categories**: Men's and Women's activewear collections
- **Stripe Payment Links**: Secure checkout without backend (see STRIPE_SETUP.md)
- **Responsive Design**: Works perfectly on all devices
- **Smooth Animations**: Framer Motion animations throughout
- **SEO Optimized**: Meta tags, Open Graph, and Twitter Card support
- **Performance**: Optimized images and fast loading

## 🛠 Technologies

- **React 18**: Modern React with hooks
- **React Router**: Client-side routing
- **Vite**: Fast build tool and dev server
- **Tailwind CSS v3**: Utility-first CSS framework
- **Framer Motion**: Production-ready animation library
- **Stripe Payment Links**: Payment processing without backend
- **Surge**: Static site hosting

## 💳 Payment Setup

To enable real payments with Stripe:

1. See detailed instructions in **STRIPE_SETUP.md**
2. Create a Payment Link in your Stripe Dashboard
3. Update `STRIPE_PAYMENT_LINK` in `src/pages/CartPage.jsx`
4. Deploy and test with Stripe test cards

Currently runs in demo mode - checkout redirects to success page without actual payment.

## 📦 Installation

\`\`\`bash
npm install
\`\`\`

## 🏃 Development

Start the development server:

\`\`\`bash
npm run dev
\`\`\`

The site will be available at \`http://localhost:5173/\`

## 🏗 Build

Build for production:

\`\`\`bash
npm run build
\`\`\`

Preview production build:

\`\`\`bash
npm run preview
\`\`\`

## 📂 Project Structure

\`\`\`
src/
├── components/
│ ├── SEO.jsx # SEO meta tags component
│ ├── Navigation.jsx # Header navigation with mobile menu
│ ├── Hero.jsx # Hero section with CTA buttons
│ ├── BrandStatement.jsx # Brand mission statement
│ ├── FeaturedProducts.jsx # Product showcase grid
│ ├── WhyPersonalBest.jsx # Features and benefits
│ ├── ShopByGender.jsx # Men's and Women's sections
│ └── Footer.jsx # Footer with links and newsletter
├── App.jsx # Main app component
├── main.jsx # App entry point
└── index.css # Tailwind CSS imports
\`\`\`

## 🎨 Customization

### Colors

Edit \`tailwind.config.js\` to customize the color scheme.

### Images

Replace the Unsplash placeholder images with your own:

- Update image URLs in each component
- Place images in \`public/\` folder for static assets

## 🌐 SEO Configuration

Edit SEO settings in \`src/components/SEO.jsx\`

## 📱 Sections Included

1. **Hero Section**: Eye-catching hero with animated call-to-action
2. **Brand Statement**: Mission and values
3. **Featured Products**: 6-product grid with hover effects
4. **Why Personal Best**: 4 key features with icons
5. **Shop by Gender**: Split Men's/Women's sections
6. **Footer**: Links, newsletter signup, social media

## 🚀 Deployment

Build the project and upload the \`dist\` folder to any static hosting service (Vercel, Netlify, etc.)

---

Built with ❤️ for Personal Best Sportswear
