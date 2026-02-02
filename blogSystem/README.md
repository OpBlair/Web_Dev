# Blog System

## Overview

This is a **learning project** for a blog system built with **PHP, MySQL, HTML, CSS, and JS**.
The project demonstrates **role-based content management** with three user roles:

* **Admin** – manage users, view all posts, moderate content
* **Author** – create, edit, and manage their own posts
* **Reader** – view published posts, like/dislike, comment, and save posts

Currently, the project is **frontend-first**, with mock data in PHP sessions or JSON files. Backend integration with MySQL is planned next.

---

## Features

1. **Role-Based Access Control**

   * Navigation and available actions change depending on whether the user is an admin, author, or reader.

2. **Post Management**

   * Authors/Admin can create, edit, or delete posts
   * Readers can like, dislike, comment, and save posts

3. **Dynamic Content Simulation**

   * Posts and users are simulated via PHP session or JSON files
   * Database schema exists for future MySQL integration

4. **Frontend Design**

   * CSS Flexbox layout with sidebar navigation
   * Buttons and post display styled for clarity

---

## Project Structure

```
blog-system/
├── backend/            # Backend logic (PHP files, e.g., blogSystem.php)
├── frontend/           # Frontend files (HTML, CSS, JS)
│   ├── index.php       # Homepage displaying posts
│   ├── login.php       # Login page
│   ├── register.php    # Registration page
│   ├── style.css       # CSS styling
│   └── main.js         # JS for fetching mock data / frontend interaction
├── dbSchema/           # Database schema
│   └── blogSystem.sql  # MySQL schema for users, posts, comments, tags
└── README.md           # Project documentation
```

---

## How to Run (Frontend-Only Prototype)

1. Ensure **PHP** is installed on your machine.
2. Place the project folder in your **local server root** (e.g., XAMPP `htdocs`, MAMP `www`).
3. Start PHP server from terminal:

```bash
php -S localhost:8000
```

4. Open your browser:

```
http://localhost:8000/frontend/index.php
```

> The pages will load **mock data** from JSON files or PHP session. Backend database integration is not yet active.

---

## Database Schema

The project includes a **MySQL schema** (`dbSchema/blogSystem.sql`) with the following tables:

* `users` – stores user accounts and roles
* `posts` – stores blog posts
* `comments` – stores comments for posts
* `tags` – stores tags for posts
* `post_tags` – many-to-many relationship between posts and tags

---

## Next Steps / Roadmap

1. **Backend Integration**

   * Connect frontend to `blogSystem.php` for login, registration, CRUD operations
   * Replace session/JSON mock data with real database queries

2. **Authentication & Authorization**

   * Secure login and registration
   * Role-based permissions for admin, author, and reader

3. **Post Features**

   * Implement create/edit/delete posts fully
   * Add comments and reactions (like/dislike/save)

4. **UI/UX Improvements**

   * Responsive design for mobile
   * Improved post layout and navigation

5. **Optional Advanced Features**

   * Search functionality
   * Tag filtering
   * Post statistics for authors

---

## Author

**TONNY BLAIR**
