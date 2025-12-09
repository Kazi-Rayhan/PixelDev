# Quick Start Guide

## Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   Navigate to `http://localhost:3000`

## Customization Checklist

### Personal Information
- [ ] Update name in all HTML files (search for "Rayhan")
- [ ] Update email in `contact.html`
- [ ] Update social media links in footer and contact page
- [ ] Add your actual projects in `projects.html`
- [ ] Write your biography in `about.html`
- [ ] Update skills and services to match your expertise

### Design Customization
- [ ] Adjust colors in `tailwind.config.js`
- [ ] Modify 3D animation in `js/hero-3d.js`
- [ ] Update geometric patterns in `assets/patterns/`
- [ ] Customize fonts in HTML head sections

### Content Updates
- [ ] Add real project screenshots/images
- [ ] Write blog posts in `blog.html`
- [ ] Update meta descriptions for SEO
- [ ] Add favicon and site icons

### Deployment
- [ ] Build for production: `npm run build`
- [ ] Deploy `dist/` folder to your hosting service
- [ ] Set up form submission endpoint (currently uses console.log)
- [ ] Configure domain and SSL certificate

## Form Submission Setup

The contact form currently logs to console. To enable actual email sending:

1. Set up a backend service (e.g., Formspree, Netlify Forms, or custom API)
2. Update the form submission handler in `js/main.js`
3. Add your endpoint URL and handle responses

## Notes

- All pages use the same navigation component (update once, applies everywhere)
- Theme toggle persists preference in localStorage
- 3D animation is optional - can be removed if not needed
- All animations are performance-optimized with CSS transforms

