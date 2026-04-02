# YesMail 📩📬

![Node.js](https://img.shields.io/badge/Node.js-Backend-339933) ![Express](https://img.shields.io/badge/Express-Server-000000) ![React](https://img.shields.io/badge/React-Frontend-61DAFB) ![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248) ![Material UI](https://img.shields.io/badge/MUI-UI_Components-007FFF) ![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animations-0055FF)

**YesMail** is a feel-good **Gmail simulation** built for job seekers tired of rejection emails. This project reimagines the modern inbox as a high-conviction "offer machine." By combining a **React frontend** with a **Node/Express backend**, YesMail creates a playful sanctuary where every notification is a win.

The application seeds your inbox with **hyper-personalized offer templates** based on your dream role. It uses an **auto-incrementing mail flow** to deliver new “you’re the one” messages every 8 seconds, providing a small kindness and a reminder of your value in an often brutal job market. 

Live Application: 

<img width="1449" height="700" alt="Screenshot 2026-04-01 at 10 45 20 PM" src="https://github.com/user-attachments/assets/5dd02d2b-ef88-445a-8fd2-0a20d29c3e19" />

---

### Table of Contents
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Core Components](#-core-components)
- [Experience & UI](#-experience--ui)
- [Logic & Flow](#-logic--flow)
- [Next Steps](#next-steps)
- [Contributing](#contributing)
- [Contact](#contact-)

---

### Features:

- **Personalized Offer Library**: Handcrafted templates that adapt to your name and desired role with high-conviction, human-centric tones.
- **Auto-Incrementing Flow**: A background seeding system delivers a fresh "win" every 8 seconds so there is always good news waiting.
- **Interactive Status Tracking**: Accept or Reject offers to update your status-aware UI with non-clickable chips and colored backgrounds.
- **Celebratory Animations**: Integrated confetti cannons for acceptances and graceful floating letter fades for rejections.
- **Real-time Counters**: Header-mounted scoreboards track your total accepted and rejected offers to visualize your momentum.
- **Toast Notifications**: Instant feedback via snackbars/toasts every time a new offer hits the inbox.
- **Persistent Seed Logic**: Starts every new session with an immediate email "starter pack" to ensure the inbox never feels empty.

---

### Technology Stack:

#### Frontend (Interactive UI + Experience)
- **React** (Context API for global state management)
- **Material-UI (MUI)** (Professional dashboard components and layout)
- **Framer Motion / Canvas Confetti** (Immersive animations and celebrations)
- **React Router** (Declarative routing for login and inbox views)
- **Axios** (API client for backend communication)

#### Backend (Logic + Seeding)
- **Node.js & Express** (Server-side architecture and RESTful routes)
- **MongoDB + Mongoose** (NoSQL persistence for user profiles)
- **Seed Logic** (Deterministic template cycling and ID tracking)

#### Data Layer & DevOps
- **Local Storage** (Tracking used template IDs to prevent duplicates)
- **Render** (Cloud deployment for both Client and Server)
- **Dotenv** (Environment-based configuration for secrets)

---

### Getting Started:

#### Prerequisites
- Node.js (v16+)
- MongoDB (Local or Atlas)
- Git

#### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/YesMail.git
   cd YesMail
   ```

2. **Set up the Backend**:
   ```bash
   # Install root dependencies
   npm install
   # Create a .env file with your MONGO_URI
   touch .env
   # Start the server
   npm run dev
   ```

3. **Set up the Frontend**:
   ```bash
   cd client
   npm install
   npm start
   ```

Run the frontend at [http://localhost:3000](http://localhost:3000).

---

### Project Structure
```
yes-mail/
├── client/                     # React frontend
│   ├── public/                 # Static assets
│   └── src/
│       ├── assets/             # Branding and images
│       ├── components/         # MUI Layout components
│       ├── context/            # DataProvider.jsx (Global State)
│       ├── data/               # 50+ Offer Templates
│       ├── services/           # api.js (Axios configuration)
│       └── pages/              # Login, Inbox, View Details
│
├── config/                     # Database configuration
├── controllers/                # Request handling logic
├── models/                     # MongoDB User schemas
├── routes/                     # Express API endpoints
├── .env                        # Environment variables
└── package.json                # Project dependencies
```

### 📊 Core Components
| Component | What It Covers |
| --- | --- |
| Inbox List | Real-time stream of personalized offers with status indicators |
| Offer Viewer | Detailed view of the "High-Conviction" letter with action buttons |
| Momentum Tracker | Header counters for Accepted/Rejected tallies |
| Celebration Layer | Overlay for confetti and "Floating Letter" reply animations |
| SideBar Navigation | Categories for Inbox, Sent, Drafts, and Trash simulation |
| Compose Modal | A functional UI for "writing" your own wins |

---

### 🧭 Experience & UI
- **Gmail Simulation**: Familiar layout to lower the learning curve and increase immersion.
- **High-Conviction Copy**: Messaging designed to combat "rejection fatigue" with specific praise.
- **Visual Feedback**: Success/Warning color coding for accepted or rejected offers.
- **Dynamic Seeding**: Logic that ensures you never see the same template twice in a single session.

---

### 🧪 Logic & Flow
- **The Initial Seed**: Upon login, the DataProvider triggers an initial batch of 13 emails fetched from the template library.
- **The 8-Second Loop**: A setInterval hook in the frontend context polls the backend/template service to push a new object into the mail state.
- **Template Personalization**: Templates use string interpolation to inject {Name} and {Role} dynamically based on the logged-in user profile.
- **Animation Trigger**: The "Accept" action triggers a canvas-confetti burst while "Reject" triggers a Framer Motion animation simulating a letter being mailed away.

---

### Next Steps
- [ ] Persistence: Ensure Accepted/Rejected counts survive page reloads via DB updates.
- [ ] Real Mail Integration: Wire up the "Compose" feature to an actual SMTP service (Nodemailer).
- [ ] A11y: Improve screen reader support for the immersive celebration animations.
- [ ] Custom Templates: Allow users to upload their own dream offer letters to the pool.

---

### Contributing
Contributions are welcome to help spread the positivity!
1. Fork the repository.
2. Create your feature branch (`git checkout -b feat/new-template`).
3. Commit your changes (`git commit -m 'Add new high-energy template'`).
4. Push to the branch (`git push origin feat/new-template`).
5. Open a Pull Request.

---

### Contact 🌐
If you have any questions or just want to share a win, reach out at mrodr.contact@gmail.com
