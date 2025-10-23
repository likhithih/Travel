# Travel Tourism Fullstack Website - Project Details

## Overview
This project is a fullstack website for Travel Tourism, built with a Node.js/Express backend and a React frontend. The backend uses MongoDB for data storage, and the system includes user authentication features for login and signup.

## Backend Setup
- **Framework**: Express.js
- **Database**: MongoDB (connected via Mongoose)
- **Environment**: Node.js with ES modules
- **Dependencies**:
  - express: ^5.1.0
  - mongoose: ^8.19.2
  - dotenv: ^17.2.3
  - bcryptjs: For password hashing
  - jsonwebtoken: For JWT token generation
  - nodemon: ^3.1.10 (for development)

### Configuration
- **Port**: 4000 (from .env)
- **Database Connection**: mongodb://localhost:27017/Travel
- **JWT Secret**: Default 'defaultSecret' (can be set in .env)

## Models
### User Model (backend/models/User.js)
- **Fields**:
  - username: String, required, unique, trimmed
  - email: String, required, unique, lowercase, trimmed
  - phone: Number, required, trimmed
  - password: String, required, minlength 6
  - confirmPassword: String, minlength 6
  - address: Object with subfields:
    - street: String, required, trimmed
    - city: String, required, trimmed
    - state: String, required, trimmed
    - pincode: String, required, trimmed
    - country: String, required, trimmed
  - createdAt: Date, default Date.now
- **Purpose**: Stores user information for authentication and profile management.

## Controllers
### User Controller (backend/controllers/userController.js)
- **registerUser**: Handles user registration
  - Validates password and confirmPassword match
  - Checks for existing user (by email or username)
  - Hashes password using bcrypt
  - Creates new user in database
  - Generates JWT token
  - Returns success response with token and user data
- **loginUser**: Handles user login
  - Finds user by email
  - Verifies password using bcrypt
  - Generates JWT token
  - Returns success response with token and user data

## Routes
### User Routes (backend/routes/routes.js)
- **POST /register**: Calls registerUser controller
- **POST /login**: Calls loginUser controller

## Server Entry Point (backend/index.js)
- Loads environment variables
- Connects to MongoDB
- Sets up Express middleware (JSON parsing)
- Registers user routes at root '/'
- Starts server on port 4000

## Frontend
- **Framework**: React (Vite setup)
- **Location**: frontend/ directory
- **Status**: Initial setup, no components or pages created yet.

## Current Status
- Backend authentication system is implemented with user registration and login.
- Password confirmation validation added to registration.
- No frontend components or UI built yet.
- No testing performed on the backend functionality.
- Database connection and basic server setup complete.

## Next Steps
- Implement frontend login/signup forms.
- Add middleware for JWT authentication.
- Create additional models for travel-related data (e.g., destinations, bookings).
- Implement CRUD operations for travel features.
- Add error handling and validation middleware.
- Perform testing on backend endpoints.
