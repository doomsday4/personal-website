# Personal Portfolio Website

A modern, responsive personal portfolio website built with Vite, Vanilla JavaScript and Tailwind CSS.

## 🚀 Features

- **Responsive Design**: Optimized for all device sizes
- **Dark/Light Theme**: Toggle between themes with persistent storage
- **Smooth Animations**: AOS (Animate On Scroll) library integration
- **Interactive Background**: Vanta.js globe animation
- **Modern Icons**: Feather icons throughout the interface
- **Accessibility**: Focus rings and keyboard navigation support
- **Fast Loading**: Optimized with Vite for quick development and builds

## 📁 Project Structure

```
personal-website/
├── public/
│   └── static/
│       └── favicon.ico
├── src/
│   ├── components/          # HTML component files (for reference)
│   │   ├── navbar.html
│   │   └── hero.html
│   ├── js/                  # JavaScript modules
│   │   ├── animations.js    # AOS and Vanta.js initialization
│   │   ├── icons.js         # Feather icons setup
│   │   ├── navigation.js    # Navigation and scroll handling
│   │   └── theme.js         # Dark/light theme toggle
│   ├── styles/
│   │   └── main.css         # Custom styles and imports
│   └── main.js              # Main application entry point
├── index.html               # Main HTML file
├── package.json
├── vite.config.js
└── README.md
```

## 🛠️ Technologies Used

- **Vite**: Fast build tool and development server
- **Vanilla JavaScript**: No framework dependencies
- **Tailwind CSS**: Utility-first CSS framework (via CDN)
- **AOS**: Animate On Scroll library
- **Vanta.js**: 3D background animations
- **Feather Icons**: Beautiful open-source icons

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd personal-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 📱 Sections

- **Hero**: Introduction with animated background
- **Highlights**: Key achievements and experiences
- **About**: Personal information and education timeline
- **Research**: Technical projects and research experience
- **Experience**: Work experience and internships
- **Leadership**: Leadership roles and cultural activities
- **Skills**: Technical skills with progress bars
- **Contact**: Contact information and form

## 🎨 Customization

### Updating Content

1. **Personal Information**: Edit the content directly in `index.html`
2. **Styling**: Modify `src/styles/main.css` for custom styles
3. **Functionality**: Update JavaScript modules in `src/js/`

### Adding New Sections

1. Add the HTML section to `index.html`
2. Update navigation links in the navbar
3. Add any specific JavaScript functionality to appropriate modules

### Theme Customization

The website supports both light and dark themes. Theme colors can be customized in:
- `src/styles/main.css` for custom CSS variables
- Tailwind classes in HTML for component-specific styling

## 🔧 Configuration

### Vite Configuration

The `vite.config.js` file contains the build configuration. Key settings:
- Port: 3000 (development server)
- Auto-open browser on start
- Build output directory: `dist`

### External Dependencies

The following are loaded via CDN:
- Tailwind CSS
- Feather Icons
- Vanta.js

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Contact

For any questions or suggestions, please reach out via the contact form on the website or through the provided contact information.