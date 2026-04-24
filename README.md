# 🔐 Auth Backend API (Node.js + Fastify)

## 📌 Description

This is a backend authentication system built using Fastify, TypeScript, and MySQL.
It includes secure user authentication with JWT, refresh tokens, and OTP-based password reset.

---

## 🚀 Features

* User Signup & Login
* Password hashing using bcrypt
* JWT Authentication
* Refresh Token System
* Forgot Password (OTP via email)
* Reset Password
* Protected Routes (Auth Middleware)
* Role-Based Access (Admin/User)
* Input Validation (Zod)


---

## 🛠️ Tech Stack

* Node.js
* Fastify
* TypeScript
* MySQL
* JWT (jsonwebtoken)
* bcrypt
* Nodemailer
* Zod

---

## ⚙️ Setup Instructions

### 1. Clone repository

```bash
git clone <your-repo-link>
cd auth-project
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file:

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=auth_project
JWT_SECRET=secretkey
EMAIL_USER=your_email
EMAIL_PASS=your_password
```

---

### 4. Run project

```bash
npx ts-node-dev src/server.ts
```

---

## 📡 API Endpoints

### 🔐 Auth

* POST `/signup` → Create user
* POST `/login` → Login & get token
* POST `/refresh-token` → Get new access token
* POST `/forgot-password` → Send OTP
* POST `/reset-password` → Reset password

---

### 👤 User

* GET `/profile` → Get user profile (Protected)
* PUT `/profile` → Update profile (Protected)

---

## 🔑 Authentication

Use Bearer token in headers:

```
Authorization: Bearer <accessToken>
```

---

## 📌 Notes

* Passwords are securely hashed
* JWT used for authentication
* Refresh tokens stored in DB for security
* OTP expires after limited time

---

## 👨‍💻 Author

Your Name
