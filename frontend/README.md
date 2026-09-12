# AI-Powered Talent Intelligence & Career Ecosystem

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React Router](https://img.shields.io/badge/React_Router-v7-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

A modern, responsive Frontend SaaS Web Application connecting Candidates, Employers, and Administrators through AI-driven career matching and assessment tools.


## Key Features

### Candidate & Student Workspace
* Multi-role authentication (Student, Recruiter, Admin)
* AI Career Score & Resume Insights
* Interactive AI Skill Assessment Runner with live timer and code editor UI
* Opportunity search across Jobs, Internships, and Hackathons
* Application status pipeline tracking

### Recruiter & Employer Workspace
* Dynamic Opportunity Creator (auto-adapts fields for Jobs, Internships, or Hackathons)
* Candidate ATS Pipeline (search, filter, shortlist, and schedule interviews)
* Enterprise Company Profile & Branding Management
* Personal Settings (security credentials, 2FA, notifications, regional preferences)

### Administrator Control Center
* Platform analytics & system metrics
* Moderation controls for users and job postings

---

## Tech Stack

* **Frontend Engine**: React.js 18 & Vite 5
* **Styling**: Tailwind CSS v4
* **Routing**: React Router DOM v7
* **Icons**: Lucide React Icons
* **API Client**: Axios

---

## Project Structure

```text
src/
├── components/     # Cards, Common, Modals
├── context/        # AuthContext, NotificationContext
├── layouts/        # Landing & Dashboard Layouts
├── pages/          # Student, Recruiter, Admin, Opportunities, Auth
├── routes/         # AppRoutes & Guard Controls
├── services/       # API Configuration & Data Services
└── utils/          # Constants & Mock Data Definitions