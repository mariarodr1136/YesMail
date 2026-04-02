# YesMail 📩

![React](https://img.shields.io/badge/React-Frontend-61DAFB) ![MUI](https://img.shields.io/badge/MUI-UI_Components-007FFF) ![React Router](https://img.shields.io/badge/React_Router-Routing-CA4245) ![Axios](https://img.shields.io/badge/Axios-HTTP-5A29E4) ![Local Mode](https://img.shields.io/badge/Local_Mode-No_Backend-6B7280) ![Render](https://img.shields.io/badge/Render-Deployment-46E3B7)

**YesMail** is a feel-good **Gmail simulation** built for job seekers tired of rejection emails. It reimagines the modern inbox as a high-conviction "offer machine" where every notification is a win.

The app seeds your inbox with **hyper-personalized offer templates** based on your name and dream role, then delivers a new “you’re the one” message every **8 seconds**.

This repo is set up as a **frontend-only demo**: no database required. Mail is stored in-memory in the browser via a local-mode API.

---

Live Application: https://yesmail-demo.onrender.com



https://github.com/user-attachments/assets/77530f0f-c4a2-4394-a369-081335e28333



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

### Features
- **Personalized Offer Library**: Handcrafted templates that adapt to your name and desired role.
- **Auto-Incrementing Flow**: A new “win” arrives every 8 seconds.
- **Inbox Tabs**: Primary, Promotions, Social, Updates (with seeded emails per tab).
- **Interactive Status Tracking**: Accept/Reject offers to update status-aware UI with colored backgrounds and chips.
- **Celebration Animations**: Confetti bursts on acceptance.
- **Real-time Counters**: Header counters for Accepted/Rejected totals.
- **Search**: Search across sender, subject, and body.

---

### Technology Stack

#### Frontend
- **React** (Context API for global state)
- **Material UI (MUI)** (layout/components/icons)
- **React Router** (routing for login/inbox/detail views)
- **Axios** (optional HTTP client; demo runs in local mode)

#### Demo Storage + Deployment
- **Local-mode API (in-browser memory store)** (no backend required)
- **Local Storage** (prevents repeating offer templates per session)
- **Render Static Site** (free hosting for the demo)

---

### Getting Started

#### Prerequisites
- Node.js (v16+)
- Git

#### Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/YesMail.git
   cd YesMail
   ```

2. **Run the frontend**:
   ```bash
   cd client
   npm install
   npm start
   ```

Open [http://localhost:3000](http://localhost:3000).

---

### Project Structure
```text
yesmail/
├── client/                     # React app
│   ├── public/                 # Static assets
│   └── src/
│       ├── assets/             # Branding and images
│       ├── components/         # UI components (Header, Email list, ViewEmail, etc.)
│       ├── context/            # DataProvider (global state)
│       ├── data/               # Offer templates library
│       ├── services/           # API layer (local-mode store + optional HTTP)
│       └── pages/              # Login, Main
│
├── render.yaml                 # Render blueprint (static site)
└── README.md
```

### 📊 Core Components
| Component | What It Covers |
| --- | --- |
| Inbox List | Real-time stream of offers with read/unread styling, preview snippets, and status indicators |
| Offer Viewer | Full letter view with accept/reject actions (offers only) |
| Momentum Tracker | Header counters for accepted/rejected totals |
| Celebration Layer | Confetti overlay for acceptances |
| SideBar Navigation | Gmail-style navigation and labels |

---

### 🧭 Experience & UI
- **Gmail Simulation**: Familiar layout to make it instantly usable.
- **High-Conviction Copy**: Messaging designed to combat “rejection fatigue.”
- **Clear Visual Feedback**: Accepted/rejected states stay visible in the inbox and labels.

---

### 🧪 Logic & Flow
- **Initial Seed**: On first login, the app seeds a starter set of emails (including Promotions/Social seeds).
- **8-Second Loop**: A timer adds a new offer into the inbox every 8 seconds.
- **Template Personalization**: Templates inject your name and desired role dynamically.
- **Local Demo Mode**: When `REACT_APP_LOCAL_MODE=true`, all mail actions are handled in-browser.

---

### Next Steps
- [ ] Persist accepted/rejected counters across refresh (Local Storage).
- [ ] Add more seeded tabs (Updates) and more “fun” system-style emails.
- [ ] Add an “Export wins” button (download accepted offers as a PDF or shareable image).
- [ ] Accessibility pass (keyboard navigation + ARIA for mailbox actions).

---

### Contributing
Contributions are welcome to help spread the positivity!
1. Fork the repository.
2. Create your feature branch (`git checkout -b feat/new-template`).
3. Commit your changes (`git commit -m 'Add new template'`).
4. Push to the branch (`git push origin feat/new-template`).
5. Open a Pull Request.

---

### Contact 🌐
If you have any questions or just want to share a win, reach out at mrodr.contact@gmail.com

