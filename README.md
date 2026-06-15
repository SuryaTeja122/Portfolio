<div align="center">

# 🎨 Masterpiece Portfolio

**A stunning, fully responsive portfolio showcasing modern web development with AI integration**

![React](https://img.shields.io/badge/React-18.3-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.0-purple?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-cyan?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-10.16-black?style=for-the-badge&logo=framer)
![Three.js](https://img.shields.io/badge/Three.js-r128-green?style=for-the-badge&logo=three.js)

*Responsive at all sizes • 3D animations • Smooth interactions • Production-ready*

[Live Demo](https://suryateja122.github.io/surya-portfolio/) • [Features](#-features) • [Quick Start](#-quick-start) • [Tech Stack](#-tech-stack) • [Deployment](#-deployment)

</div>

---

## 📖 About

**Masterpiece Portfolio** is a modern, fully responsive portfolio website that showcases professional work with stunning animations and interactive 3D effects. Built with the latest web technologies, it features a **mobile-first design** that works flawlessly across all device sizes—from 320px on smartphones to 1920px+ on ultra-wide displays.

This portfolio demonstrates expertise in **full-stack development**, **AI integration**, and **creative technology**. Every component is meticulously crafted to ensure perfect responsiveness, smooth animations, and an exceptional user experience without any overlapping content or cut-off text at any screen size.

Perfect for developers, designers, and creative professionals who want to make a lasting impression with their online presence. The project serves as both a **showcase portfolio** and a **reference implementation** for responsive web design best practices.

---

## ✨ Features

- ✅ **Fully Responsive Design** — Perfect at every screen size (320px to 1920px+)
- ✅ **No Overlapping Content** — Carefully crafted breakpoints ensure clean layouts everywhere
- ✅ **3D Animations** — Interactive Earth in hero section with Three.js
- ✅ **Smooth Interactions** — Framer Motion animations and GSAP sequences
- ✅ **Project Showcase** — 3D carousel with Mars visualization
- ✅ **Mobile Hamburger Menu** — Full navigation below 1024px
- ✅ **Experience Grid** — Dynamic layout (1 → 2 → 3 columns)
- ✅ **Certifications Display** — Clickable achievement cards
- ✅ **Dark Mode Design** — Professional cyberpunk aesthetic
- ✅ **Production Ready** — Optimized build, accessible components, SEO-friendly
- ✅ **TypeScript Support** — Full type safety throughout
- ✅ **Zero Lint Warnings** — Clean, maintainable code

---

## 🛠️ Tech Stack

### **Frontend**
- **React 18** — Modern UI library with hooks
- **TypeScript** — Type-safe development
- **Vite** — Lightning-fast build tool
- **Tailwind CSS** — Utility-first styling framework
- **Framer Motion** — Advanced animations library

### **3D & Graphics**
- **Three.js** — WebGL 3D graphics library
- **React Three Fiber** — React renderer for Three.js
- **Three.js Drei** — Useful helpers and components

### **Animation & Effects**
- **GSAP** — Professional-grade animation library
- **ScrollTrigger** — Scroll-based animations

### **UI Components**
- **React Icons** — Comprehensive icon library
- **Custom Components** — Badge, Modal, Gallery, Terminal

### **Development Tools**
- **ESLint** — Code quality & linting
- **TypeScript Config** — Strict type checking
- **Vite Config** — Optimized build configuration

---

## 📁 Project Structure

```
masterpiece-portfolio/
├── src/
│   ├── components/
│   │   ├── Hero.tsx              # Landing hero with Earth visualization
│   │   ├── Navbar.tsx            # Navigation with hamburger menu
│   │   ├── About.tsx             # About section with journey timeline
│   │   ├── Projects.tsx          # 3D project carousel & Mars planet
│   │   ├── TechStack.tsx         # Scrolling tech stack display
│   │   ├── Experience.tsx        # Internship cards grid
│   │   ├── Achievements.tsx      # Certifications & achievements
│   │   ├── ContactModal.tsx      # Contact information modal
│   │   ├── TerminalContact.tsx   # Terminal-style contact interface
│   │   ├── VignetteGallery.tsx   # Gallery showcase
│   │   ├── Background3D.tsx      # 3D animated background
│   │   └── Badge.tsx             # Reusable badge component
│   ├── canvas/                   # Three.js canvas components
│   ├── App.tsx                   # Main application component
│   ├── App.css                   # Global styles
│   ├── index.css                 # Base styles
│   └── main.tsx                  # React entry point
├── public/                       # Static assets
├── dist/                         # Production build output
├── package.json                  # Dependencies & scripts
├── tsconfig.json                 # TypeScript configuration
├── vite.config.ts                # Vite build configuration
├── eslint.config.js              # ESLint rules
└── README.md                     # This file
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** v16 or higher
- **npm** v7 or higher (or yarn/pnpm)

### Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/SuryaTeja122/surya-portfolio.git
cd surya-portfolio

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint (code quality check)
npm run lint

# Type checking
npm run type-check
```

---

## ⚙️ Configuration

### Environment Setup

No environment variables required for local development. The portfolio works out of the box with demo data.

### Build Optimization

The Vite configuration is pre-optimized for:
- **Code Splitting** — Lazy loading of heavy components
- **Asset Minification** — Reduced bundle size
- **CSS Optimization** — Tailwind purges unused styles
- **Tree Shaking** — Removes unused code

### Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | Latest | ✅ Perfect |
| Firefox | Latest | ✅ Perfect |
| Safari | Latest | ✅ Perfect |
| Edge | Latest | ✅ Perfect |
| Mobile | All modern | ✅ Perfect |

---

## 📚 Usage

### Running Locally

```bash
npm run dev
```

The portfolio will be available at `http://localhost:5173` with hot module replacement (HMR) enabled for instant updates.

### Customization

#### Update Personal Information
Edit `/src/App.tsx` and component files to add your:
- Name and bio
- Project details
- Experience and skills
- Social media links
- Contact information

#### Modify Colors & Theme
Tailwind CSS colors are defined in:
- Primary Cyan: `#00F0FF`
- Primary Purple: `#B200FF`
- Update hex values in components as needed

#### Add Your Projects
Modify project data in `/src/components/Projects.tsx` with your own portfolio items.

---

## 📊 Responsive Breakpoints

| Device | Width | Features |
|--------|-------|----------|
| **Mobile Phone** | 320px - 639px | Single column, compact spacing |
| **Tablet Small** | 640px - 767px | Optimized touch targets |
| **Tablet** | 768px - 1023px | 2-column layouts where appropriate |
| **Desktop** | 1024px - 1279px | Full layouts, hamburger hidden |
| **Large Desktop** | 1280px+ | Maximum content, wider spacing |

### Custom Breakpoints

```css
min-[770px]:   /* Navbar hamburger toggle */
min-[1000px]:  /* Experience grid 2-columns */
min-[1020px]:  /* Hero Earth centering */
min-[1200px]:  /* Experience/Achievements 3-columns */
```

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

### Deploy to GitHub Pages

```bash
npm run build
# Push dist folder to gh-pages branch
```

### Docker Deployment

```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

---

## 🔮 Future Enhancements

- [ ] Add blog section with markdown support
- [ ] Implement dark/light mode toggle
- [ ] Add testimonials section
- [ ] Create resume PDF download
- [ ] Add contact form backend
- [ ] Implement analytics tracking
- [ ] Add multilingual support
- [ ] Create mobile app version
- [ ] Add video showcase section
- [ ] Implement email notifications

---

## 📄 License

MIT License — Feel free to use this portfolio template for your own projects!

See [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**SuryaTeja122**

- **GitHub:** [@SuryaTeja122](https://github.com/SuryaTeja122)
- **Portfolio:** [surya-portfolio](https://github.com/SuryaTeja122/surya-portfolio)
- **Live Demo:** [suryateja122.github.io/surya-portfolio](https://suryateja122.github.io/surya-portfolio/)
- **Email:** suryabhiguva@gmail.com
- **LinkedIn:** [Surya Bhiguva](https://www.linkedin.com/in/surya-bhiguva)
- **Twitter:** [@itz_Schmidt_](https://x.com/itz_Schmidt_)

---

## 🙏 Acknowledgments

- **Framer Motion** — Smooth, production-ready animations
- **Three.js** — Powerful WebGL graphics library
- **GSAP** — Professional animation toolkit
- **Tailwind CSS** — Utility-first CSS framework
- **Vite** — Next generation build tool
- **React** — A JavaScript library for building user interfaces

---

<div align="center">

## 🎯 Fully Responsive • Beautifully Animated • Production Ready

**⭐ Star this repo if you find it helpful!**

*Building the future, one responsive pixel at a time.*

**[Made with ❤️ by SuryaTeja122](https://github.com/SuryaTeja122)**

</div>
