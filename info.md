# VitalSense Project Information

This file serves as a handoff document for AI agents to understand the project structure and state of the **VitalSense Wellness Assessment Platform**.

## 🚀 Tech Stack
- **Framework:** React 19 (via Vite)
- **Styling:** Tailwind CSS v4 (Light Theme with Mesh Gradients)
- **Animations:** Framer Motion (page transitions, micro-interactions)
- **Icons:** Lucide React
- **Data Visualization:** Recharts (Dashboard metrics)
- **Routing:** React-Router-Dom
- **State Management:** React Context API (`WellnessContext`) with `LocalStorage` persistence.

## 📁 Project Structure
- `src/App.jsx`: Main entry point with routing and layout.
- `src/index.css`: Global styles, Tailwind v4 imports, mesh-gradient definitions, and glassmorphism utilities.
- `src/context/WellnessContext.jsx`: Handles user state, assessment history, and health scoring.
- `src/utils/aiLogic.js`: Rule-based engine for calculating health scores and generating wellness recommendations.

### Pages (`src/pages/`)
- `Home.jsx`: Premium landing page with CTA's and feature highlights.
- `Dashboard.jsx`: Data-intensive health overview with charts, wellness scores, and recommendations.
- `Assessment.jsx`: Multi-step animated health assessment form.
- `StaticPages.jsx`: Contains About, Services, Booking (Form), and Profile stubs.

### Components (`src/components/`)
- `ui/Navbar.jsx`: Responsive light-theme navigation with glassmorphism effects.
- `widgets/FloatingTools.jsx`: Modular bottom-right action center:
  - **Vital AI Chat:** Rule-based chatbot for wellness advice.
  - **Meditation Mode:** Circle-breathing visualizer (4-4-4).

## 🎨 Design System (Light Theme)
- **Background:** Slate-50 base with mesh gradients.
- **Glassmorphism:** `.glass-card` used for all major UI containers.
- **Color Palette:**
  - `Nature-500` (Emerald-ish) as the primary highlight.
  - `Slate-800/900` for readable typography.
  - White background for cards with soft/blue shadows.

## 🛠️ Commands
- `npm install`: Install dependencies.
- `npm run dev`: Start local development server.
- `npm run build`: Production build.

## 🔮 AI Logic Rules
Scoring logic in `aiLogic.js` uses thresholds for sleep (<7), stress (>6), and water (<6) to generate warnings and suggestions. Burnout risk is specifically flagged if `stress >= 7` AND `sleep <= 5`.
