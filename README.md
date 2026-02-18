# 🎓 Campus Resource Management System

A web-based platform designed to simplify resource allocation for students and faculty. This system provides role-based access to book labs, lecture halls, and manage campus resources efficiently.

---

## 🚀 Getting Started

Follow these steps to run the project.

### 📋 Prerequisites

*   Python 3.10+
*   Node.js & npm
*   MySQL Server

---

### 🟢 1. Setup Backend (Django)

1.  **Navigate to Project Root**:
    ```bash
    cd "c:\Users\ASUS\PYTHON\Campus Resource Mangement System"
    ```

2.  **Install Python Dependencies**:
    ```bash
    pip install django mysqlclient djangorestframework djangorestframework-simplejwt django-filter django-cors-headers
    ```

3.  **Run Migrations** (Create Database Tables):
    ```bash
    python manage.py migrate
    ```
    *(Ensure your MySQL database `campus_resource_db` exists)*

4.  **Start Django Server**:
    ```bash
    python manage.py runserver
    ```
    The backend will run at **http://127.0.0.1:8000/**

---

### 🔵 2. Setup Frontend (React)

1.  **Navigate to Frontend Directory**:
    Open a **new terminal** and run:
    ```bash
    cd frontend
    ```

2.  **Install Node Modules**:
    ```bash
    npm install
    ```

3.  **Start React App**:
    ```bash
    npm start
    ```
    The frontend will run at **http://localhost:3000/**

---

## ✨ Key Features

### 📅 **Resource Booking**
*   **Students & Staff**: Browse available labs and lecture halls.
*   **Real-Time Availability**: Check if a resource is booked for a specific time slot.
*   **Request System**: Submit booking requests for approval.

### 👥 **Role-Based Access Control**
*   **Student Dashboard**: View available resources and manage personal bookings.
*   **Staff Dashboard**: Additional privileges to oversee departmental resources.
*   **System Admin**: Full control over users, resources, and booking approvals.

### 📱 **Responsive Design**
*   **Mobile-First Approach**: Optimized layouts for smartphones and tablets.
*   **Card View**: Bookings display as cards on mobile for better readability.
*   **Sidebar Navigation**: Collapsible sidebar with hamburger menu for mobile users.

### ⏱️ **Login Activity Monitoring**
*   **Admin Feature**: Real-time tracking of user login and logout times.
*   **Session Logs**: View login date, time, and session duration for all users.
*   **Security**: Monitor active sessions to ensure system integrity.

### ⏳ **Auto-Logout Session Timer**
*   **15-Minute Limit**: Automatic session timeout for Students and Staff after 15 minutes of inactivity.
*   **Visual Timer**: Countdown timer displayed in the header.
*   **Security**: Prevents unauthorized access on shared devices.

---

## 📚 API Documentation

For detailed API usage, refer to the **[Postman Guide](postman_guide.md)** included in the repository.

*   **Authentication**: JWT (JSON Web Token) based login.
*   **Endpoints**: Standard RESTful API structure for Users, Resources, and Bookings.

---

## 🛠️ Technology Stack

*   **Frontend**: React.js, Tailwind CSS
*   **Backend**: Django Rest Framework (DRF)
*   **Database**: MySQL
*   **Authentication**: Simple JWT

---

### 🔑 Default Credentials

*   **Superuser/Admin**:
    *   Create one using: `python manage.py createsuperuser`
    *   Access Admin Panel: http://127.0.0.1:8000/admin/
