# BookIt — Experiences & Slot Booking Platform

**BookIt** is a full-stack travel experience booking application where users can browse curated adventures, view available dates & time slots, apply promo codes, and complete bookings online.

---

## 📑 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Demo Guide (Quick Tests)](#demo-guide-quick-tests)
- [Installation & Setup](#installation--setup)
- [Environment Examples](#environment-examples)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Author](#author)

---

## Overview
BookIt provides an end-to-end booking flow:  
**Home → Details → Checkout → Result**

The frontend (React + TypeScript + Tailwind) consumes backend APIs (Node + Express + MongoDB) to display dynamic experiences, slots, and booking status.

---

## Features

- Browse curated travel experiences
- Experience details with date & slot selection
- Real-time slot availability and sold-out states
- Full checkout flow with user details
- Promo code support (`WELCOME10`)
- Prevent double-booking slots
- Clean responsive UI matching design
- Error & loading feedback

---

## Tech Stack

**Frontend**
- React + TypeScript
- Vite
- TailwindCSS
- Axios

**Backend**
- Node.js
- Express.js
- MongoDB (Mongoose)

---

## Demo Guide (Quick Tests)

| Feature | Test Instruction |
|--------|------------------|
| Slot Booking | Kayaking → Nov 1 → 1 PM → shows 4 slots left |
| Sold Out Slot | Coffee Trail → Nov 3 → 4 PM → Sold Out |
| Promo Code | Apply `WELCOME10` on checkout |

---

## Installation & Setup

### Clone repo
```bash
git clone <REPO_URL>
cd <PROJECT_FOLDER>
```

### Backend setup
```bash
cd Backend
npm install
```

### Create .env inside backend/
```bash
PORT=4000
MONGO_URI
```

### Frontend setup
```bash
cd ../Frontend
npm install
```

### Create .env inside Frontend/
```bash
VITE_BACKEND_URL=http://localhost:4000
```

## Running The Application

### Run backend
```bash
npm run dev
```

### Backend runs at
```bash
http://localhost:4000
```

### Run frontend
```bash
npm run dev
```

### Frontend runs at
```bash
http://localhost:5173
```

## API Endpoints

### Experiences
```bash
GET /experiences
GET /experiences/:id
GET /experiences/:id/availability
```

### Bookings
```bash
POST /bookings
```

### Promo Code
```bash
POST /promo/validate
```

## 👩‍💻 Author

**Jaskiran Kaur**  
Full-Stack Developer (MERN)