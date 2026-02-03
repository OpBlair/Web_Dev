# 📝 Blog System

A **learning-focused** content management system built to demonstrate role-based access control and dynamic content handling using PHP and MySQL.

## 🚀 Project Overview

This project showcases a multi-user blog environment where permissions dynamically shift based on user roles. Currently, the system is in a **frontend-first** state, utilizing PHP sessions and JSON for mock data while the MySQL backend integration is finalized.

### **User Roles & Permissions**

* **Admin:** Full system oversight—manage users, moderate all posts, and view site-wide analytics.
* **Author:** Content creators—create, edit, and manage personal posts.
* **Reader:** The audience—view posts, engage via likes/dislikes, leave comments, and save favorites.

---

## ✨ Key Features

* **Role-Based Access Control (RBAC):** Navigation and UI elements adapt based on the logged-in user's permissions.
* **Post Management:** Full CRUD (Create, Read, Update, Delete) capabilities for Authors and Admins.
* **Engagement Tools:** Interactive Reader features including a like/dislike system and post-saving.
* **Hybrid Data Handling:** Currently runs on PHP sessions/JSON mock data with a ready-to-deploy MySQL schema.
* **Responsive UI:** Built with CSS Flexbox featuring a persistent sidebar navigation.

---

## 📂 Project Structure

```text
blogSystem/
├── backend/            # PHP logic and server-side scripts
│   └── db_logic.php    # Database connection & core functions
├── frontend/           # UI Layer (HTML, CSS, JS)
│   ├── index.php       # Main entry point
│   └── blogSystem.css  # Global styles
├── dbSchema/           # Database architecture
│   └── blogSystem.sql  # SQL export for users, posts, comments, and tags
└── README.md           # Project documentation

```

---

## 🛠️ Technical Setup

### **Requirements**

* **PHP 8.0+** (Ensure `pdo_mysql` extension is enabled)
* **MySQL 8.0+**
* **Fedora Users:** Run `sudo dnf install php-mysqlnd` to satisfy dependencies.

### **Development Environment**
* **OS: Fedora 42(Workstation Edition)**
* **Tooling: Fedora's native dnf5 package manager for php-MySQL extensions.**

### **Installation & Running**

1. **Clone the repository** to your local machine.
2. **Import the Database:** Execute the `blogSystem.sql` file in your MySQL environment (phpMyAdmin, Workbench, etc.).
3. **Start the Server:** Navigate to the project root in your terminal and run:
```bash
php -S localhost:8000

```


4. **Access the App:** Open your browser to:
`http://localhost:8000/frontend/index.php`

> **Note:** Successful database connection will trigger a `DB connected` message in both the browser UI and the DevTools console.

---

## 🗺️ Roadmap

### **Phase 1: Persistence**

* [ ] **Full Backend Migration:** Replace all PHP `$_SESSION` mock data with PDO prepared statements in `db_logic.php`.
* [ ] **Relational Queries:** Implement `JOIN` queries to display tags and author names alongside posts.

### **Phase 2: Security & Auth**

* [ ] **Password Hashing:** Utilize `password_hash()` and `password_verify()` for user security.
* [ ] **Session Protection:** Implement `session_regenerate_id()` to prevent session hijacking.
* [ ] **SQL Injection Prevention:** Ensure all user inputs are handled via prepared statements.

### **Phase 3: Frontend**
* [ ] **Search & Filter:** Add functionality to search posts by title or filter by tags.
* [ ] **Mobile Optimization:** Refine CSS media queries for a seamless mobile experience.
* [ ] **Author Dashboard:** Add a statistics panel for authors to track post engagement.
---

## 👤 Author

**Tonny Blair**
*Project Lead & Developer*


