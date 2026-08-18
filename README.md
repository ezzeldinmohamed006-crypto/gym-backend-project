# gym-backend-project
Backend - final project - GYM
# 🏋️ Gym Booking System API - Team Work Distribution

This repository contains the backend for the Gym Booking System, built with **Node.js, TypeScript, Express, and MongoDB**. Below is the official task distribution among the 3 team members.

---

## 👥 Team Members & Task Distribution (توزيع المهام)

### 👤 Member 1: Infrastructure & Authentication (البنية التحتية والحماية)
**Responsible for setting up the core app, database connection, and user security.**
* **Files:** `src/config/db.ts`, `src/models/User.ts`, `src/middlewares/auth.ts`, `src/routes/authRoutes.ts`
* **Tasks (المهام):**
  * Project initialization, TypeScript setup, and environment variables configurations.
  * Connect the server securely to **MongoDB Atlas / Local** using Mongoose.
  * Create **User Model** (Full Name, Email, Password, Role: Member/Trainer) with input validation.
  * Implement **Registration & Login** endpoints using `bcrypt` for password hashing.
  * Build **Auth Middleware (JWT Guard)** to verify tokens and handle Role-Based Access Control (RBAC).

---

### 👤 Member 2: Trainer & Class Sessions Management (المدربين والحصص الرياضية)
**Responsible for the gym schedule logic, trainer operations, and search functionality.**
* **Files:** `src/models/ClassSession.ts`, `src/controllers/sessionController.ts`, `src/routes/sessionRoutes.ts`
* **Tasks (المهام):**
  * Create **ClassSession Model** (Title, Trainer, Time Slot, Capacity).
  * Implement Full **CRUD Operations** for Trainers to manage their own sessions only.
  * Apply **Business Rules for Sessions:**
    * Ensure class sessions can only be created for future time slots.
    * Enforce validation (Capacity must be a positive integer).
    * Prevent trainers from deleting any class session if it has active confirmed bookings.
  * Build **Search & Filtering API** to allow browsing sessions by title, trainer name, day, or availability.

---

### 👤 Member 3: Bookings Management, Documentation & Deployment (الحجوزات والتوثيق والرفع)
**Responsible for the core business booking operations, calculations, and public hosting.**
* **Files:** `src/models/Booking.ts`, `src/controllers/bookingController.ts`, `src/routes/bookingRoutes.ts`
* **Tasks (المهام):**
  * Create **Booking Model** (Session reference, Member reference, Status: booked/cancelled).
  * Implement endpoints for Members to browse available spots, book a session, or cancel a booking.
  * Apply **Strict Booking Business Rules:**
    * Prevent bookings once a session reaches its full capacity.
    * Prevent a member from booking the same session twice (No duplicate bookings).
    * Implement the soft status switch (Cancelling a booking changes status to `cancelled` and automatically frees up a spot).
  * Document all endpoints interactively using **Swagger API Documentation**.
  * Deploy the final working project live to a cloud hosting URL (**Render / Railway**).

---

## 🚀 Git Workflow for the Team (طريقة العمل على جيت)
1. **Pull the latest changes:** Always run `git pull origin main` before starting.
2. **Create your feature branch:**
   * Member 1: `git checkout -b feature/auth`
   * Member 2: `git checkout -b feature/sessions`
   * Member 3: `git checkout -b feature/bookings`
3. **Commit & Push:** Once your part is complete, push your branch and open a **Pull Request (PR)** on GitHub for review.
