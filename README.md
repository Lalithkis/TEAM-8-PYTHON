
# 🎓 Campus Resource Management System

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

### 🔑 Default Credentials

*   **Superuser/Admin**:
    *   Create one using: `python manage.py createsuperuser`
    *   Access Admin Panel: http://127.0.0.1:8000/admin/
