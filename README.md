# Rayhan - Developer Portfolio

A complete, production-ready developer portfolio website showcasing full-stack development work with a unique fusion of retro aesthetics, manga-inspired design, and Islamic geometric patterns.

## Features

- **Retro Aesthetic**: 90s web vibes with CRT effects, pixel borders, and neon glows
- **Manga Influence**: Clean line art, panel-style borders, and halftone textures
- **Islamic Geometric Patterns**: Subtle geometric patterns integrated into the design
- **3D Hero Animation**: Interactive Three.js geometric shape in the hero section
- **Fully Responsive**: Works beautifully on all screen sizes
- **Dark Theme**: Default dark theme with optional light mode toggle
- **Performance Optimized**: Fast loading and smooth animations
- **Accessible**: WCAG-compliant and semantic HTML

## Pages

- **Home**: Hero section with 3D animation and identity statement
- **About**: Biography, highlights, and technical skills
- **Services**: Full-stack development, API development, system architecture, DevOps
- **Projects**: Grid showcase of portfolio projects with hover effects
- **Blog**: Article listings with terminal-style headings
- **Contact**: Contact form with social links

## Tech Stack

- **HTML5**: Semantic markup
- **Tailwind CSS**: Utility-first CSS framework
- **Three.js**: 3D graphics library for hero animation
- **Vanilla JavaScript**: No frameworks, pure JS for interactions
- **Vite**: Build tool and development server

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
portfolio/
├── css/
│   └── main.css          # Main stylesheet with Tailwind imports
├── js/
│   ├── main.js           # Main JavaScript for interactions
│   └── hero-3d.js        # Three.js 3D animation
├── assets/               # Images, patterns, textures
├── index.html            # Home page
├── about.html            # About page
├── services.html         # Services page
├── projects.html         # Projects page
├── blog.html             # Blog page
├── contact.html          # Contact page
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind configuration
├── postcss.config.js     # PostCSS configuration
├── vite.config.js        # Vite configuration
└── README.md             # This file
```

## Customization

### Colors

Edit `tailwind.config.js` to customize the color palette:

```javascript
colors: {
  'retro-teal': '#00FFD1',
  'retro-indigo': '#6366F1',
  // ... add your colors
}
```

### 3D Animation

Modify `js/hero-3d.js` to change the Three.js scene, geometry, or animations.

### Content

Update the HTML files to customize:
- Personal information
- Project details
- Blog posts
- Contact information
- Social media links

## Design Philosophy

This portfolio combines three distinct aesthetic influences:

1. **Retro Web**: Nostalgic 90s web design with CRT scanlines, pixel borders, and neon glows
2. **Manga Aesthetics**: Clean line art, panel-style framing, and halftone textures
3. **Islamic Geometric Patterns**: Subtle geometric patterns that respect cultural identity

The result is a unique, professional portfolio that stands out while maintaining accessibility and performance.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available for personal and commercial use.

## Contact

For questions or inquiries, please reach out through the contact page or email.

---

Built with ❤️ by Rayhan

