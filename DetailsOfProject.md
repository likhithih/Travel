# Travel Tourism Fullstack Website - Project Details

## Overview
This project is a comprehensive fullstack website for Travel Tourism, featuring a Node.js/Express backend with MongoDB and a React frontend with Vite. The application includes user authentication (login, signup, Google sign-in), protected routes, and a modern UI with animations and responsive design. Users can register, log in, access protected pages like the home dashboard, and log out securely.

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
  - cors: For cross-origin requests (if needed)
  - firebase-admin: For Google authentication (if implemented)

### Configuration
- **Port**: 4000 (from .env)
- **Database Connection**: mongodb://localhost:27017/Travel
- **JWT Secret**: Default 'defaultSecret' (can be set in .env)
- **CORS**: Enabled for frontend-backend communication

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
  - googleId: String (for Google sign-in users)
  - displayName: String (for Google users)
  - photoURL: String (for Google users)
  - createdAt: Date, default Date.now
- **Purpose**: Stores user information for authentication, profile management, and supports both email/password and Google OAuth login.

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
- **googleSignIn**: Handles Google OAuth sign-in
  - Validates Google user data (googleId, email, displayName, photoURL)
  - Checks for existing user or creates new one
  - Generates JWT token
  - Returns success response with token and user data

## Routes
### User Routes (backend/routes/routes.js)
- **POST /register**: Calls registerUser controller
- **POST /login**: Calls loginUser controller
- **POST /google-signin**: Calls googleSignIn controller

## Server Entry Point (backend/index.js)
- Loads environment variables
- Connects to MongoDB
- Sets up Express middleware (JSON parsing, CORS)
- Registers user routes at root '/'
- Starts server on port 4000

## Frontend Setup
- **Framework**: React (Vite setup)
- **Location**: frontend/ directory
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **Icons**: React Icons (e.g., FaBars, FaTimes, FcGoogle)
- **Animations**: Framer Motion
- **Notifications**: React Toastify
- **Authentication**: Firebase for Google sign-in
- **Dependencies**:
  - react: ^18.x
  - react-dom: ^18.x
  - react-router-dom: ^6.x
  - framer-motion: For animations
  - react-icons: For icons
  - axios: For API calls
  - react-toastify: For notifications
  - firebase: For Google authentication

### Frontend Structure
- **src/App.jsx**: Main app component with routing setup, includes ProtectedRoute for /home
- **src/main.jsx**: Entry point
- **src/firebaseConfig.js**: Firebase configuration for Google sign-in
- **src/pages/**:
  - Login.jsx: Login page with form, Google sign-in, carousel background, animations
  - Home.jsx: Protected home page with navbar, hero section, components
  - Signup.jsx: Signup page (assumed, not detailed in current implementation)
  - LandingPage.jsx: Public landing page
- **src/Compoents/**:
  - Navbar.jsx: Modern navbar with backdrop blur, mobile menu, logout logic, dynamic login/logout buttons
  - ProtectedRoute.jsx: Route guard component that checks for JWT token and redirects to /login if not authenticated
  - Other components: HeroSection, BestAgency, Card, Footer (for Home page)

### Key Frontend Features
- **Authentication Integration**: Login form submits to /login, Google sign-in uses Firebase and backend /google-signin
- **Protected Routes**: /home is wrapped in ProtectedRoute, redirects unauthenticated users
- **Navbar**: Fixed header with glassmorphism effect, responsive design, logout removes token and redirects
- **Login Page**: Animated background carousel, form validation, toast notifications, redirects to /home on success
- **Routing**: Public routes (/login, /signup, /) and protected (/home)

## Admin Panel Setup
- **Framework**: React (Vite setup)
- **Location**: Admin/ directory
- **Build Tool**: Vite
- **Purpose**: Administrative dashboard for managing the travel tourism website, including user management, content updates, and analytics.
- **Structure**:
  - **src/App.jsx**: Main admin app component with routing and layout for admin features.
- **Features** (assumed based on typical admin panels):
  - User management: View, edit, delete user accounts.
  - Content management: Update destinations, bookings, and site content.
  - Analytics: View site statistics and user activity.
  - Authentication: Separate admin login with elevated permissions.

## Current Status
- Backend authentication system fully implemented with email/password and Google OAuth.
- Frontend UI built with modern design: responsive navbar, animated login page, protected home page.
- Route protection implemented: /home requires authentication, redirects to /login otherwise.
- Logout functionality: Removes token, updates UI, redirects to home.
- Password confirmation validation and error handling in place.
- Database connection and server setup complete.
- Basic testing performed on frontend components; backend endpoints tested via Postman.
- UI improvements: Adjusted feature cards on the landing page (LandingPage.jsx) to be smaller by reducing icon sizes from text-6xl to text-5xl and padding from p-8 to p-6 for better visual balance and less bulky appearance.

## API Testing with Postman

### Registration Endpoint
**Method:** POST  
**URL:** http://localhost:4000/register  
**Headers:**  
- Content-Type: application/json  

**Body (raw JSON):**
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "phone": 1234567890,
  "password": "password123",
  "confirmPassword": "password123",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "pincode": "10001",
    "country": "USA"
  }
}
```

### Login Endpoint
**Method:** POST  
**URL:** http://localhost:4000/login  
**Headers:**  
- Content-Type: application/json  

**Body (raw JSON):**
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

### Google Sign-In Endpoint
**Method:** POST  
**URL:** http://localhost:4000/google-signin  
**Headers:**  
- Content-Type: application/json  

**Body (raw JSON):**
```json
{
  "googleId": "firebase-uid",
  "email": "user@gmail.com",
  "displayName": "User Name",
  "photoURL": "https://example.com/photo.jpg"
}
```

## Next Steps
- Implement signup page with form and backend integration.
- Add JWT middleware for protected backend routes.
- Create additional models for travel features (destinations, hotels, bookings).
- Implement CRUD operations for travel-related data.
- Add user profile management and password reset functionality.
- Enhance error handling and input validation across frontend and backend.
- Perform comprehensive testing: unit tests for components, integration tests for API, end-to-end testing for user flows.
- Add loading states, better UX feedback, and accessibility features.
- Deploy the application (frontend to Vercel/Netlify, backend to Heroku/Render).
- Implement additional features like search, filters, booking system.
