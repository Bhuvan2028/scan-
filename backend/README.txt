# 🐘 PHP Assessment Backend

This backend provides APIs for handling:
- Assessment questions
- Answer submission
- Score calculation
- Results history

It is designed to run on Apache or NGINX with PHP 8+ and MySQL.

---

## 📁 Folder Structure

php-backend/
├── api/ # API endpoints (PHP files)
├── config/ # Database configuration
├── utils/ # Scoring utilities
└── README.md

yaml
Copy code

---

## ⚙️ Requirements

- PHP 8.0 or higher
- MySQL / MariaDB
- Apache or NGINX web server

---

## 🚀 Setup Instructions

### 1️⃣ Place in Web Root

Copy the folder into your web root directory.

Example (XAMPP):

C:\xampp\htdocs\php-backend

scss
Copy code

Example (Linux):

/var/www/html/php-backend

yaml
Copy code

---

### 2️⃣ Configure Database

Edit the file:

php-backend/config/db.php

powershell
Copy code

Set your MySQL credentials:

```php
$host = "localhost";
$dbname = "cyber_assessment";
$username = "root";
$password = "";