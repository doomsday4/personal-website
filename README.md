# Personal Portfolio Website

A modern, interactive personal portfolio website showcasing engineering projects, work experience, and creative endeavors. Built with React, Vite, and featuring stunning glass morphism design with dynamic interactions.

🌐 **Live Site**: [amankhilani.vercel.app](https://amankhilani.vercel.app)

## ✨ Features

### Interactive Components
- **Dynamic Card Swapping**: Click any project/experience card to feature it prominently
- **Glass Morphism Design**: Beautiful glassmorphic cards with cursor-tracked hover effects
- **Infinite Travel Scroll**: Mouse/trackpad controllable image carousel with hover effects
- **Responsive Navigation**: Collapsible header for mobile and smaller screens
- **Smooth Animations**: AOS scroll animations throughout the site

### Sections
- **About Me**: Personal introduction with education timeline
- **Achievements**: Scholastic and extracurricular accomplishments in interactive grid
- **Research**: Technical projects with detailed descriptions and GitHub links
- **Work Experience**: Professional internships with company highlights
- **Leadership**: Cultural and organizational leadership roles
- **Skills**: Technical proficiency visualization
- **Travel & Photography**: Interactive infinite scroll of travel photos
- **Social Work**: Community impact and outreach initiatives
- **Contact**: Professional contact information with social links

### Technical Features
- Fully responsive design (mobile-first approach)
- Dark theme with custom color palette
- Accessibility features (keyboard navigation, focus rings)
- SEO optimized with Google Search Console integration
- Fast loading with optimized assets

## 🛠️ Technologies Used

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS (CDN), Custom CSS
- **Animations**: AOS (Animate On Scroll)
- **Background**: Custom Liquid Ether effect
- **Icons**: Feather Icons
- **Deployment**: Vercel
- **Assets**: Optimized images with proper bundling

## 📁 Project Structure

```
personal-website/
├── public/
│   ├── favicon.svg              # Custom AK logo favicon
│   └── static/
│       └── favicon.ico
├── src/
│   ├── assets/                  # Images and media files
│   │   ├── travel/             # Travel photography collection
│   │   ├── aman.jpg            # Profile picture
│   │   └── [project-images]    # Research/work project images
│   ├── components/
│   │   ├── GlassSurface.jsx    # Reusable glass morphism component
│   │   ├── MagicBento.jsx      # Grid layout component
│   │   ├── LiquidEther.jsx     # Custom background effect
│   │   └── InfiniteScroll.jsx  # Travel photos carousel
│   ├── App.jsx                 # Main application with all sections
│   ├── index.css              # Global styles and theme variables
│   └── main.jsx               # React root
├── index.html                 # HTML template with meta tags
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation & Development

```bash
# Clone the repository
git clone https://github.com/yourusername/personal-website.git
cd personal-website

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view in browser.

### Build for Production

```bash
# Build optimized version
npm run build

# Preview production build
npm run preview
```

## ☁️ Vercel Blob Storage

This project uses Vercel Blob storage for hosting images, keeping the repository clean while maintaining fast global CDN delivery.

### Setup
1. Get your blob token from [Vercel Dashboard](https://vercel.com/dashboard) → Storage → Blob
2. Create `.env` file: `BLOB_READ_WRITE_TOKEN=your_token_here`
3. Upload assets: `npm run upload-assets`
4. Asset URLs are auto-generated in `src/assetUrls.js`

### Benefits
- Private repository (no personal images in git)
- Global CDN performance
- Automatic image optimization

## 🎨 Customization

### Content Updates
- **Personal Info**: Edit contact details and bio in `src/App.jsx`
- **Projects**: Update research/experience arrays with your projects
- **Images**: Replace images in `src/assets/` with your own
- **Travel Photos**: Add your photos to `src/assets/travel/`

### Styling
- **Colors**: Modify CSS variables in `src/index.css`
- **Glass Effects**: Adjust glass morphism properties in component styles
- **Responsive Breakpoints**: Update Tailwind classes as needed

### Features
- **Sections**: Add/remove sections in `src/App.jsx`
- **Components**: Create new reusable components in `src/components/`
- **Animations**: Customize AOS animations with data attributes

## 🌟 Key Components

### GlassSurface
Reusable component providing the signature glass morphism effect with cursor tracking.

### Dynamic Card System
Interactive card swapping mechanism allowing users to feature different projects/experiences.

### Travel Infinite Scroll
Custom-built infinite scrolling component with mouse/trackpad controls and hover effects.

## 📱 Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Optimized responsive design

## 🚀 Deployment

Deployed on Vercel with automatic deployments from the main branch. Custom domain configured for clean URL.

## 📄 Credits

- **Design Inspiration**: React Bits for component patterns
- **Icons**: Feather Icons
- **Fonts**: System fonts for optimal performance
- **Background**: Custom Liquid Ether effect

## 📄 License

MIT - Feel free to use this as inspiration for your own portfolio!

---

**Built with ❤️ by Aman Khilani**