# Personal Portfolio Website (React + Vite)

A modern, responsive personal portfolio website migrated to React (Vite) with Tailwind via CDN, AOS animations, Feather icons, and Vanta background.

## 🚀 Features

- Responsive design
- Dark/Light theme with persistence
- AOS scroll animations
- Vanta.js globe background
- Feather icons
- Accessible focus rings

## 📁 Project Structure

```
personal-website/
├── public/
│   └── static/
│       └── favicon.ico
├── src/
│   ├── App.jsx              # Main React app (all sections)
│   ├── index.css            # Custom styles + AOS imports
│   └── main.jsx             # React root
├── index.html               # Tailwind/Feather/Vanta CDNs
├── package.json
├── vite.config.js
└── README.md
```

## 🛠️ Technologies Used

- Vite
- React 19
- Tailwind CSS (CDN)
- AOS
- Vanta.js
- Feather Icons

## Getting Started

Prerequisites: Node.js 18+

Install and run:
```
npm install
npm run dev
```
Open `http://localhost:3000`.

Build:
```
npm run build
npm run preview
```

## Customization

- Content: edit `src/App.jsx`
- Styles: edit `src/index.css`
- Behavior: effects in `src/App.jsx` (theme, scroll, AOS, Vanta, icons)

## License

ISC
