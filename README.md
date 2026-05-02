# HealthConnect 🏥

A full-featured **healthcare consultation and appointment booking platform** built with **React.js**.

Live Demo: *(deploy to Vercel — instructions below)*

---

## 🚀 Features

- **Doctor Discovery** — Browse 6 verified specialists with filters by specialization and consultation mode (Online / In-Clinic)
- **Smart Appointment Booking** — 3-step booking flow: choose doctor → pick date & time slot → confirm
- **Patient Dashboard** — View, manage, and cancel appointments with real-time status updates
- **React Context API** — Global state management for appointments and user data
- **React Router v6** — Multi-page SPA navigation with programmatic routing
- **Responsive Design** — Mobile-first CSS Modules layout that works on all screen sizes
- **Component Architecture** — Reusable components (DoctorCard, Navbar) with CSS Modules scoping

---

## 🛠️ Tech Stack

| Technology       | Usage                          |
|-----------------|-------------------------------|
| React 18        | UI library & component model  |
| React Router v6 | Client-side routing           |
| Context API     | Global state management       |
| CSS Modules     | Scoped component styling      |
| JavaScript ES6+ | Modern JS features            |

---

## 📁 Project Structure

```
healthconnect/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Responsive navigation with scroll effect
│   │   ├── Navbar.module.css
│   │   ├── DoctorCard.jsx      # Reusable doctor listing card
│   │   └── DoctorCard.module.css
│   ├── context/
│   │   └── AppContext.jsx      # Global state: appointments, user
│   ├── pages/
│   │   ├── Home.jsx            # Landing page with search & specialties
│   │   ├── Home.module.css
│   │   ├── Doctors.jsx         # Doctor listing with filters
│   │   ├── Doctors.module.css
│   │   ├── Book.jsx            # 3-step appointment booking flow
│   │   ├── Book.module.css
│   │   ├── Dashboard.jsx       # Patient appointment dashboard
│   │   └── Dashboard.module.css
│   ├── App.js                  # Root component with routing
│   ├── index.js                # React entry point
│   └── index.css               # Global CSS variables & reset
└── package.json
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/healthconnect.git
cd healthconnect

# Install dependencies
npm install

# Start development server
npm start
```

App runs at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

---

## 🌐 Deploy to Vercel (Free)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

---

## 📸 Pages Overview

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero section, specialty browser, how-it-works |
| Doctors | `/doctors` | Searchable & filterable doctor listing |
| Book | `/book` | 3-step appointment booking flow |
| Dashboard | `/dashboard` | Patient's appointment management |

---

## 🧠 Key Concepts Demonstrated

- **Component Composition** — Reusable `DoctorCard` used across Doctors and Book pages
- **Props & State** — Controlled components, derived state, prop drilling vs context
- **useContext Hook** — `AppContext` provides appointments data globally without prop drilling
- **useNavigate & useLocation** — Programmatic navigation and passing state between routes
- **Conditional Rendering** — Step-based booking wizard with 3 distinct views
- **Array Methods** — `.filter()`, `.map()` used extensively for doctor search/filtering

---

## 👤 Author

**Gajjala Lakshmi Santhosh Reddy**  
[LinkedIn](https://www.linkedin.com/in/santhoshreddy25) • [GitHub](https://github.com/santhoshreddy28)

---

## 📄 License

MIT
