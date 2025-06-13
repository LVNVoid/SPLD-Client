# SPLD-Client

## Description

This repository contains the client-side code for the Sistem Pendataan Laporan dan Dokumentasi (SPLD), a system designed for managing reports and documentation. It streamlines the process of collecting reports from Polsek (police sector) to Humas (public relations) Polres Magelang and facilitates the organized and efficient publication of activity narratives.

## Features and Functionality

*   **User Authentication:** Secure login for authorized personnel.
*   **Dashboard:** Provides an overview of key metrics and quick actions.
*   **Report Management:** Creation, editing, and viewing of reports.
*   **Narrative Management:**  Add, edit, publish, and view narratives related to reports.
*   **User Role Management:** Admin users can manage user roles (Admin, Humas, Polsek).
*   **Data Polsek Management:** Admin users can manage the Polsek data.
*   **Public Narrative Access:**  Publicly accessible narratives for transparency.
*   **Theme Support:** Light and dark theme options.
*   **Dynamic Routing:** Implemented using `react-router-dom` for a single-page application experience.
*   **Image Uploading:** Supports image uploads with previews for reports and narratives.
*   **Responsive Design:** Utilizes `tailwind.config.js` for styling and responsiveness across devices.

## Technology Stack

*   **React:** JavaScript library for building user interfaces.
*   **Redux Toolkit:** For state management (`src/store.js`, `src/features/userSlice.js`).
*   **React Router DOM:** For routing and navigation (`react-router-dom`).
*   **Tailwind CSS:** CSS framework for styling.
*   **Radix UI:**  For accessible UI components (components under `src/components/ui`).
*   **Axios:** For making HTTP requests (`src/lib/axios.js`).
*   **Framer Motion:** For animations (`framer-motion`).
*   **React Hook Form:** For form handling (`react-hook-form`).
*   **Zod:** For schema validation (`zod`).
*   **React Hot Toast:** For displaying toast notifications (`react-hot-toast`).

## Prerequisites

*   Node.js (v18 or higher)
*   npm or yarn

## Installation Instructions

1.  Clone the repository:

    ```bash
    git clone https://github.com/LVNVoid/SPLD-Client
    cd SPLD-Client
    ```

2.  Install dependencies:

    ```bash
    npm install  # or yarn install
    ```

## Usage Guide

1.  Start the development server:

    ```bash
    npm run dev  # or yarn dev
    ```

2.  Open your browser and navigate to `http://localhost:5173` (or the address provided by Vite).

3.  **Authentication:**

    *   Log in as an administrator (`/login`) to access the admin dashboard.
    *   Public users can view narratives without logging in (`/narrative`).

4.  **Admin Dashboard:**

    *   Navigate using the sidebar menu.
    *   Manage reports, narratives, users, and Polsek data.

5.  **Public Website:**

    *   Browse narratives on the `/narrative` page.
    *   Contact page under `/contact`.
    *   About us page under `/about-us`.

## API Documentation

The client interacts with a backend API.  The base URL is defined in `src/lib/axios.js`:

```javascript
const api = axios.create({
  baseURL: "https://spld-server.vercel.app/api", // Replace with your actual API endpoint
  // ... other configurations
});
```

The following endpoints are used:

*   `/auth/login`: User login.
*   `/auth/logout`: User logout.
*   `/reports`: CRUD operations for reports.
*   `/narratives`: CRUD operations for narratives.
*   `/narratives/public`: Fetch public narratives.
*   `/users`: CRUD operations for users.
*   `/polseks`: CRUD operations for Polsek data.
*   `/upload/report/:id`: Upload images for a report.
*   `/upload/narrative/:id`: Upload images for a narrative.
*   `/upload/narrative/image/:id`: Delete a narrative image.

Data fetching and modification are primarily handled using the `useCrud` hook (`src/hooks/useCrud.js`).

## Contributing Guidelines

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive messages.
4.  Test your changes thoroughly.
5.  Submit a pull request.

## Routing

The application utilizes React Router for navigation. Here is a summary of the major routes:

*   `/`: Public homepage (`src/pages/public/home/index.jsx`).
*   `/narrative`: Public narrative listing page (`src/pages/public/narrative/index.jsx`).
*   `/narrative/:id`: Public narrative detail page (`src/pages/public/narrative/detail.jsx`).
*   `/contact`: Public contact page (`src/pages/public/contact/index.jsx`).
*   `/about-us`: Public about us page (`src/pages/public/about/index.jsx`).
*   `/login`: Login page (`src/pages/auth/login/index.jsx`).
*   `/admin`: Admin dashboard (`src/pages/admin/dashboard/index.jsx`).
*   `/admin/narrative`: Admin narrative management page (`src/pages/admin/narrative/index.jsx`).
*   `/admin/narrative/add/:id`: Admin narrative add page (`src/pages/admin/narrative/add.jsx`).
*   `/admin/narrative/edit/:id`: Admin narrative edit page (`src/pages/admin/narrative/edit.jsx`).
*   `/admin/narrative/:id`: Admin narrative detail page (`src/pages/admin/narrative/detail.jsx`).
*   `/admin/report`: Admin report management page (`src/pages/admin/report/index.jsx`).
*   `/admin/report/:id`: Admin report detail page (`src/pages/admin/report/detail.jsx`).
*   `/admin/polsek`: Admin Polsek management page (`src/pages/admin/polsek/index.jsx`).
*   `/admin/user`: Admin user management page (`src/pages/admin/user/index.jsx`).
*   `/admin/user/:id`: Admin user detail page (`src/pages/admin/user/detail.jsx`).
*   `/admin/profile`: Admin profile page (`src/pages/admin/profile/index.jsx`).
*   `/unauthorized`: Unauthorized access page (`src/pages/error/Unauthorized.jsx`).
*   `*`: Not found page (`src/pages/error/NotFound.jsx`).

Routing is configured in `src/App.jsx` using `createBrowserRouter`.  `PrivateRoute` and `RedirectIfLoggedIn` components (`src/components/PrivateRoute.jsx` and `src/components/RedirectIfLoggedIn.jsx` respectively) handle authentication and authorization.

## License Information

No license specified. All rights reserved.

## Contact/Support Information

For any issues or support, please contact the repository owner through GitHub.