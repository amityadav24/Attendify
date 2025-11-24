# Attendify – Student Attendance Management System

## Overview
Attendify is a modern, lightweight web application built with **React**, **Vite**, and **Tailwind CSS**. It provides a complete workflow for managing student attendance, including QR code scanning, student CRUD operations, CSV export, attendance reporting, and an admin profile page. The UI follows a clean light‑theme design with subtle glass‑morphism effects.

## Features
- **QR Code Generation & Scanning** – Generate QR codes for each student and scan them to mark attendance.
- **Student Management** – Add, edit, and delete students; data persisted in `localStorage`.
- **CSV Export** – Export the full student list and attendance data as a CSV file.
- **Attendance Report** – Quick summary (total, present, absent, attendance rate) with a loading spinner.
- **User Profile** – Admin profile page to edit name, email, role, and institution.
- **Authentication** – Mock login/logout flow with protected routes.
- **Routing** – `react-router-dom` for navigation, including a custom 404 page.
- **Responsive Layout** – Sidebar navigation with a mobile menu.
- **Loading Indicators** – Reusable `LoadingSpinner` component for async actions.

## Tech Stack
- **React** (hooks) – UI logic
- **Vite** – Fast development server & bundler
- **Tailwind CSS** – Utility‑first styling (light theme)
- **lucide-react** – Icon set
- **html5-qrcode** – QR scanning
- **localStorage** – Simple client‑side persistence

## Installation
```bash
# Clone the repository
git clone <repo-url>
cd Student_Attandence

# Install dependencies
npm install

# Start the development server
npm run dev
```
Open `http://localhost:5173` in your browser.

## Project Structure (key files)
- `src/App.jsx` – Root component, routing, auth state, and data handling.
- `src/components/Layout.jsx` – Sidebar and header layout.
- `src/components/Dashboard.jsx` – Overview cards, recent activity, quick actions.
- `src/components/StudentList.jsx` – Table with add/edit/delete functionality.
- `src/components/QRScanner.jsx` – QR code scanner.
- `src/components/QRGenerator.jsx` – QR code generator for a student.
- `src/components/Profile.jsx` – Admin profile page.
- `src/components/NotFound.jsx` – Custom 404 page.
- `src/components/LoadingSpinner.jsx` – Spinner component used in async UI actions.

## Usage
1. **Login** – Any email/password works (mock auth).
2. **Dashboard** – View attendance stats, generate report, export CSV, or navigate to other sections.
3. **Students** – Add new students, edit existing entries, or delete them.
4. **Scan QR** – Use the scanner to mark a student present.
5. **Profile** – Update admin details; changes persist across sessions.
6. **404 Page** – Access an undefined route to see the custom not‑found screen.

## Future Enhancements
- Replace `localStorage` with a backend database (PostgreSQL/MongoDB).
- Implement real authentication and role‑based access control.
- Add PDF report generation and email notifications.
- Deploy to a production environment.

## Made using #AntiGravity #Test
---
*This README reflects the current state of the project as of November 2025.*
