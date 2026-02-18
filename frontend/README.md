# Campus Resource Management System - Frontend

A modern React-based frontend for managing campus resources with role-based access control.

## Features

- Role-based dashboards (Student & Staff)
- JWT authentication with protected routes
- Resource browsing and booking
- Staff approval/rejection workflow
- Clean UI with Tailwind CSS

## Tech Stack

- React 18
- React Router v6
- Axios
- Context API
- Tailwind CSS

## Installation

```bash
cd frontend
npm install
```

## Running the App

```bash
npm start
```

The app will run on `http://localhost:3000`

## Demo Accounts

- Student: `student@campus.edu` / `student123`
- Staff: `staff@campus.edu` / `staff123`

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Layout.js
│   │   ├── Sidebar.js
│   │   ├── Header.js
│   │   ├── ProtectedRoute.js
│   │   ├── StatusBadge.js
│   │   └── BookingModal.js
│   ├── context/
│   │   └── AuthContext.js
│   ├── pages/
│   │   ├── Login.js
│   │   ├── Dashboard.js
│   │   ├── Users.js
│   │   ├── Resources.js
│   │   └── Bookings.js
│   ├── services/
│   │   └── api.js
│   ├── App.js
│   ├── index.js
│   └── index.css
└── package.json
```

## API Configuration

Update the API base URL in `src/services/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:8000/api';
```
