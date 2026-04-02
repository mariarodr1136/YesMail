# YesMail
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933) ![Express](https://img.shields.io/badge/Express-Server-000000) ![React](https://img.shields.io/badge/React-Frontend-61DAFB) ![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248)

YesMail is a feel-good Gmail simulation built for folks who are tired of rejection emails. The project reimagines the inbox as an offer machine: after you log in with your dream job and personal details, the app seeds your inbox with hyper-personalized, high-conviction offer templates and keeps adding new ones so you always have good news to read.

## Story
The job market has been brutal—everyone is applying to dozens of roles, sitting in rejection limbo, and refreshing their inboxes hoping for a positive answer. YesMail flips that narrative: instead of punishment, it drops you in a playful simulation that mimics receiving real offers. You log in or create an account (email, password, desired role), the client seeds 13 introductory offer emails, and every 8 seconds the backend/seed system delivers another high-energy “you’re the one” message. It’s a small kindness and a reminder that you deserve wins, even if the offers are fictional.

## Key features
- **Personalized offer library** – 50 handcrafted letter templates adapt to the role, candidate name, and context, keeping the tone high-conviction, human, and specific.
- **Auto-incrementing mail flow** – After login, the inbox receives a fresh email every 8 seconds (you can still refresh manually) so there’s always a new win to open.
- **Toast notifications** – Each new email triggers a toast, and accepting or rejecting a letter produces celebratory/confetti or graceful messaging.
- **Status-aware UI** – Accept/reject actions mark emails with a colored background and a non-clickable status chip without removing them from the inbox.
- **Story-driven animations** – Confetti celebrates every acceptance (kept consistent even with rapid clicks) while rejects get a floating letter animation that fades out like a reply.
- **Counting scores** – Header counters keep track of how many offers you’ve accepted and rejected, so you can feel the momentum.

## Technical stack
- Node/Express server with `database/db.js` powering a MongoDB connection (credentials live in `.env`).
- React client scaffolded with Create React App under `client/`, featuring Material‑UI components, React Router, and a local API mock (`client/services/api.js`).
- State managed via React context (`client/src/context/DataProvider.jsx`), and `getNextOffer` cycles through the template pool while tracking used IDs in localStorage.
- Assets/data (branding, letter templates) live under `client/src/assets` and `client/src/data`, while services/controllers keep the mock backend deterministic.

## Running locally
1. Install dependencies:
   ```bash
   npm install
   cd client
   npm install
   ```
2. Create `.env` (both root and `client/` if needed) with your Mongo connection string.
3. Start the backend server:
   ```bash
   npm run dev
   ```
4. In another shell, start the React client:
   ```bash
   cd client
   npm start
   ```

The client automatically seeds the inbox (13 emails) once you log in, then keeps delivering new offers in the background. You can accept/reject, watch the confetti or letter animation, and enjoy the positivity.

## Next steps
- Add persistent user state so accepted/rejected counts survive reloads.
- Wire up real email sending in `SideBarContent` when compose actually matters.
- Add accessibility improvements for the immersive celebration animations.

YesMail is a small act of joy for an exhausting moment; keep iterating so it stays fun.
