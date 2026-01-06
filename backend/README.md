# Backend (Express.js API)

This backend is built using Express.js and MongoDB. It provides API endpoints for managing internal requests and comments.

## Features
- Connects to MongoDB for data storage
- Provides REST API endpoints for requests
- Allows creating, listing, and commenting on requests
- Handles CORS and JSON parsing

## Main Endpoints
- `POST /requests` — Create a new request
- `GET /requests` — Get all requests
- `POST /requests/:id/comment` — Add a comment to a request

## How to Run
1. Install dependencies:
   ```
   npm install
   ```
2. Set your MongoDB URI in a `.env` file:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```
3. Start the server:
   ```
   npm start
   ```
4. The API will run on `http://localhost:4000` by default.

## Project Structure
- `app.js` — Main Express app
- `models/` — Mongoose models for Request and Comment
- `routes/` — API route handlers
- `public/` — Static files

---
