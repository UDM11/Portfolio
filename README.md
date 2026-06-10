# Umesh Darlami - Dynamic Portfolio & CMS

A premium, interactive, and fully dynamic developer portfolio built with a React TypeScript frontend, a modular Python FastAPI backend, and Supabase integration. 

This project features a fully functional **Admin Control Panel** to perform live CRUD operations on projects, skills, experience, and highlights, as well as an inbox viewer for contact form submissions.

---

## 🚀 Key Features

* **Stunning UI/UX**: Modern glassmorphism style, vibrant colors, custom animations (Framer Motion), and responsive layouts.
* **100% Dynamic Content**: Every section (Projects, Skills, Experience, Highlights, Contact Details) is fetched dynamically from the database.
* **Resilient Client-Side Fallbacks**: Automatically falls back to high-quality static assets and constants if the local FastAPI server or Supabase goes offline, ensuring zero site downtime.
* **Premium Admin Control Panel (`/admin`)**:
  * **Tabbed CRUD Dashboard**: Instantly manage projects, skills, education/experience timelines, profile highlights, and contact information.
  * **Inbox Messages Viewer**: Real-time listing of contact submissions with timestamps and message details.
  * **Direct Image Uploads**: Upload project screenshots directly to Supabase storage with automatic CDN URL generation.
* **Modular Backend Architecture**: Standard, maintainable FastAPI router structures.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React, TypeScript, Tailwind CSS, Vite, TanStack Query, Framer Motion, Lucide Icons |
| **Backend** | Python, FastAPI, Uvicorn, Pydantic, python-dotenv |
| **Database & Storage** | Supabase (PostgreSQL), Supabase Object Storage |
| **Deployment** | Fly.io, Docker |

---

## 📂 Directory Structure

```
Portfolio/
├── backend/
│   ├── config.py             # Loads & validates env configuration
│   ├── database.py           # Initializes Supabase connection
│   ├── models.py             # Declares Pydantic schemas
│   ├── routers/              # Controller routes (projects, skills, upload, etc.)
│   ├── main.py               # API entry point & router registration
│   └── requirements.txt      # Python dependencies
├── database/
│   └── supabase_schema.sql   # SQL declarations for tables and RLS policies
├── frontend/
│   ├── src/
│   │   ├── components/       # Shared UI components
│   │   ├── hooks/            # Custom fetching & messaging hooks
│   │   ├── pages/            # Page components (Home, Projects, Admin, etc.)
│   │   ├── constants/        # Static data fallbacks
│   │   └── App.tsx           # Router configurations
│   ├── package.json          # React dependencies
│   └── vite.config.ts        # Vite configuration
└── README.md
```

---

## ⚙️ Local Setup Guide

### 1. Supabase Database Setup
1. In your [Supabase Console](https://supabase.com), open the **SQL Editor**.
2. Create a new query, paste the contents of [database/supabase_schema.sql](database/supabase_schema.sql), and click **Run**.
3. Navigate to the **Storage** tab.
4. Create a public bucket named **`project-images`**.

### 2. Configure Backend Credentials
Create a `.env` file inside `backend/` with the following variables:
```env
PORT=5000
SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY
ADMIN_PASSWORD=admin123
```

### 3. Run the Backend API
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Launch the development server:
   ```bash
   python -m uvicorn main:app --reload --port 5000
   ```

### 4. Run the Frontend Client
1. Navigate to the `frontend` folder:
   ```bash
   cd ../frontend
   ```
2. Install Node packages:
   ```bash
   npm install
   ```
3. Start the Vite dev server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`. Access the Admin Panel at `http://localhost:5173/admin`!

---

## 🔒 Security Best Practices
* Direct Supabase database client querying has been refactored entirely to run through the Python FastAPI backend.
* The frontend does not execute database modifications or storage uploads directly, meaning the client-side `anon` credentials are fully optional, drastically reducing API token exposure.
