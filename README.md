# Request Management System

## Overview
A full-stack application for internal teams to view and manage customer requests.

### Tech Stack
- Frontend: Next.js (TypeScript), Tailwind CSS
- Backend: Node.js (Express), MongoDB (Mongoose)

## Setup Instructions

### Prerequisites
- Node.js (v20+)
- npm
- MongoDB (local or Atlas)

### Frontend
1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the development server:
   ```sh
   npm run dev
   ```

### Backend
1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up MongoDB connection in `app.js` or a config file.
4. Run the backend server:
   ```sh
   npm start
   ```

## Environment Variables
- Create a `.env` file in the backend folder with your MongoDB URI:
  ```
  MONGODB_URI=your_mongodb_connection_string
  ```

## Assumptions
- Only internal users access the dashboard.
- No authentication required for MVP.
- Requests have status and comments.

## Folder Structure
- `/frontend`: Next.js app
- `/backend`: Express app

## API Endpoints
- `GET /requests`: List all requests
- `GET /requests/:id`: Get request details
- `POST /requests/:id/comment`: Add a comment
- `PATCH /requests/:id/status`: Update request status

## Notes
- Follow controller/service/model separation in backend.
- Handle loading, errors, and feedback in frontend.

