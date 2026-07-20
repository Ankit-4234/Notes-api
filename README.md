# Notes API — Full MERN Stack Project

A full-stack notes application with user authentication, built as my first complete MERN stack project. Users can sign up, log in, and manage their own private notes — create, read, update, and delete — with everything persisted in MongoDB.

## Live Demo

- **Frontend:** https://notes-api-tan.vercel.app/
- **Backend API:** https://notes-api-qjni.onrender.com/

> Note: the backend is hosted on Render's free tier, so it may take 10–30 seconds to respond on the first request after a period of inactivity.

## Features

- User signup and login with hashed passwords (bcrypt)
- JWT-based authentication — each user only sees their own notes
- Full CRUD for notes: create, read, update, delete
- Notes sorted by most recently created
- Persistent storage with MongoDB Atlas
- Loading and empty states, basic form validation
- Fully deployed: backend on Render, frontend on Vercel

## Tech Stack

**Backend**
- Node.js
- Express.js
- MongoDB Atlas + Mongoose
- JSON Web Tokens (jsonwebtoken)
- bcryptjs for password hashing
- CORS

**Frontend**
- React (Vite)
- Fetch API for HTTP requests
- localStorage for token persistence

## Project Structure
notes-api/
├── models/
│   ├── Note.js
│   └── User.js
├── middleware/
│   └── auth.js
├── routes/
│   ├── notes.js
│   └── auth.js
├── notes-frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── App.css
│   └── ...
├── server.js
├── package.json
└── .env (not committed)
## API Endpoints

### Auth
| Method | Endpoint           | Description         |
|--------|---------------------|----------------------|
| POST   | `/api/auth/signup`  | Create a new account |
| POST   | `/api/auth/login`   | Log in, get a token  |

### Notes (require `Authorization: Bearer <token>` header)
| Method | Endpoint           | Description              |
|--------|---------------------|---------------------------|
| GET    | `/api/notes`         | Get all of the user's notes |
| GET    | `/api/notes/:id`      | Get a single note          |
| POST   | `/api/notes`          | Create a new note          |
| PUT    | `/api/notes/:id`      | Update a note               |
| DELETE | `/api/notes/:id`      | Delete a note                |

## Running Locally

1. Clone the repo:
```bash
git clone https://github.com/Ankit-4234/Notes-api.git
cd Notes-api/notes-api
```

2. Install backend dependencies:
```bash
npm install
```

3. Create a `.env` file in the `notes-api` folder:
 4. Start the backend:
```bash
node server.js
```

5. In a separate terminal, set up and start the frontend:
```bash
cd notes-frontend
npm install
npm run dev
```

6. Open the frontend at `http://localhost:5173`

## What I Learned

This project was my first time connecting a full stack end to end — a REST API talking to a real database, a React frontend consuming that API, authentication with JWTs, and deploying both halves so they work together live on the internet. It moved me from "tutorials" to a project I can actually point to and say I built and shipped.

## Author

**Ankit Wosti** — CSIT student, Nepal
- GitHub: [@Ankit-4234](https://github.com/Ankit-4234)
- Portfolio: (https://myportfolio-4234.vercel.app/)
