# 🚀 Umesh Darlami - Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Framer Motion. Showcasing my projects, skills, and experience as a Full-Stack Developer.

## ✨ Features

- **Modern Design**: Clean, professional UI with dark/light theme support
- **Responsive**: Fully responsive design for all devices
- **Smooth Animations**: Beautiful animations using Framer Motion
- **Interactive Components**: Hover effects, modals, and dynamic content
- **Project Showcase**: Detailed project cards with live demos and code links
- **Contact Integration**: WhatsApp integration and contact forms
- **SEO Optimized**: Meta tags and structured data

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS, Shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Deployment**: Vercel/Netlify

## 📁 Project Structure

```
Portfolio/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Shadcn/ui components
│   │   ├── Navbar.tsx      # Navigation component
│   │   ├── Footer.tsx      # Footer component
│   │   └── WhatsAppButton.tsx
│   ├── pages/              # Page components
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── Experience.tsx
│   │   ├── Skills.tsx
│   │   └── Contact.tsx
│   ├── constants/          # Static data
│   │   ├── projects.ts
│   │   ├── skills.ts
│   │   ├── experience.ts
│   │   └── contact.ts
│   ├── assets/             # Images and static files
│   └── lib/                # Utility functions
├── public/                 # Public assets
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/UDM11/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📦 Build & Deploy

### Build for production
```bash
npm run build
# or
yarn build
```

### Preview production build
```bash
npm run preview
# or
yarn preview
```

## 🎨 Customization

### Theme Configuration
- Colors and themes are configured in `tailwind.config.js`
- CSS variables are defined in `src/index.css`

### Content Updates
- Update project data in `src/constants/projects.ts`
- Modify skills in `src/constants/skills.ts`
- Update experience in `src/constants/experience.ts`
- Change contact info in `src/constants/contact.ts`

### Adding New Projects
```typescript
// src/constants/projects.ts
{
  title: "Your Project Name",
  description: "Project description",
  image: yourProjectImage,
  tech: ["React", "Node.js", "MongoDB"],
  category: "Web",
  github: "https://github.com/username/repo",
  demo: "https://your-demo-link.com",
  features: ["Feature 1", "Feature 2"],
  status: "Completed",
}
```

## 📱 Features Overview

### Pages
- **Home**: Hero section with introduction and call-to-action
- **About**: Personal information, journey timeline, and fun facts
- **Projects**: Interactive project showcase with filtering
- **Experience**: Professional experience and achievements
- **Skills**: Technical skills organized by categories
- **Contact**: Contact form and social media links

### Components
- **Responsive Navbar**: Mobile-friendly navigation with animations
- **Project Cards**: Interactive cards with hover effects and modals
- **Theme Toggle**: Dark/light mode switcher
- **WhatsApp Integration**: Direct messaging capability
- **Animated Backgrounds**: Floating particles and gradient orbs

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

**Umesh Darlami**
- Email: darlamiumesh123@gmail.com
- LinkedIn: [Umesh Darlami Magar](https://www.linkedin.com/in/umesh-darlami-magar-a96a37284/)
- GitHub: [@UDM11](https://github.com/UDM11)
- Location: Kathmandu, Nepal

## 🙏 Acknowledgments

- [Shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Lucide](https://lucide.dev/) for the icon library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

---

⭐ **Star this repository if you found it helpful!**