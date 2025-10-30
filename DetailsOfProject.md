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

### Booking Model (backend/models/Booking.js)
- **Fields**:
  - user: ObjectId, ref 'User', required
  - destination: ObjectId, ref 'Destination', required
  - packageName: String, required
  - travelDate: Date, required
  - travelers: Number, required, min 1
  - totalAmount: Number, required
  - specialRequests: String
  - status: String, enum ['Pending', 'Confirmed', 'Cancelled'], default 'Pending'
  - paymentStatus: String, enum ['Pending', 'Paid', 'Failed'], default 'Pending'
  - paymentId: String
  - bookingDate: Date, default Date.now
  - createdAt: Date, default Date.now
  - updatedAt: Date, default Date.now
- **Purpose**: Stores booking information including payment details and status tracking.

### Destination Model (backend/models/Destination.js)
- **Fields**:
  - name: String, required
  - landscape: String, enum ['Beach', 'Mountain', 'Heritage', 'City'], required
  - description: String, required
  - image: String, required
  - rating: Number, required, min 0, max 5
  - price: Number, required
  - duration: String, required
  - popular: Boolean, default false
  - createdAt: Date, default Date.now
  - updatedAt: Date, default Date.now
- **Purpose**: Stores destination information for travel packages.

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

### Booking Controller (backend/controllers/bookingController.js)
- **createBooking**: Creates new booking (user)
  - Validates required fields and user/destination existence
  - Creates booking with default status 'Pending'
  - Sends pending confirmation email
  - Returns formatted booking data
- **getAllBookings**: Retrieves all bookings (admin)
  - Supports pagination, filtering by status/user
  - Populates user and destination data
  - Returns formatted booking list with pagination info
- **getUserBookings**: Retrieves user's own bookings
  - Filters by authenticated user
  - Populates destination data
  - Returns formatted booking list
- **updateBooking**: Updates booking details (user)
  - Allows updating travelers and special requests
  - Only user who created booking can update
- **updateBookingStatus**: Updates booking status (admin)
  - Changes status: Pending → Confirmed/Cancelled
  - Sends confirmation email when status becomes 'Confirmed'
- **deleteBooking**: Deletes booking (admin)
  - Removes booking from database

### Destination Controller (backend/controllers/destinationController.js)
- **getAllDestinations**: Retrieves all destinations
  - Public endpoint for frontend
  - Returns formatted destination data
- **getDestinationById**: Retrieves single destination by ID
  - Includes full destination details
- **createDestination**: Creates new destination (admin)
  - Handles image upload via multer
  - Validates required fields
- **updateDestination**: Updates destination (admin)
  - Handles image upload for updates
- **deleteDestination**: Deletes destination (admin)

## Routes
### User Routes (backend/routes/routes.js)
- **POST /register**: Calls registerUser controller
- **POST /login**: Calls loginUser controller
- **POST /google-signin**: Calls googleSignIn controller
- **POST /admin-login**: Admin login endpoint

### Booking Routes (backend/routes/bookingRoutes.js)
- **POST /bookings**: Create new booking (user)
- **GET /bookings/user**: Get user's bookings (user)
- **PUT /bookings/:id**: Update booking (user)
- **DELETE /bookings/:id**: Delete booking (user)
- **GET /admin/bookings**: Get all bookings (admin)
- **PUT /admin/bookings/:id/status**: Update booking status (admin)
- **DELETE /admin/bookings/:id**: Delete booking (admin)

### Destination Routes (backend/routes/routes.js)
- **GET /destinations**: Get all destinations (public)
- **GET /destinations/:id**: Get destination by ID (public)
- **POST /admin/destinations**: Create destination (admin)
- **PUT /admin/destinations/:id**: Update destination (admin)
- **DELETE /admin/destinations/:id**: Delete destination (admin)

### Payment Routes (backend/routes/routes.js)
- **POST /create-order**: Create Razorpay order (authenticated)
- **POST /verify-payment**: Verify payment and create booking (authenticated)

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
  - Destination.jsx: Destination listing page with search and filters
  - Booking.jsx: Booking form with Razorpay payment integration
- **src/Compoents/**:
  - Navbar.jsx: Modern navbar with backdrop blur, mobile menu, logout logic, dynamic login/logout buttons
  - ProtectedRoute.jsx: Route guard component that checks for JWT token and redirects to /login if not authenticated
  - Card.jsx: Destination card component with booking navigation
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
  - **src/pages/Login.jsx**: Admin login page with form validation, axios integration, and error handling.
  - **src/pages/Dashboard.jsx**: Main dashboard page with sidebar navigation and statistics cards.
  - **src/pages/Users.jsx**: User management page for viewing and managing user accounts.
  - **src/pages/Bookings.jsx**: Bookings management page for handling travel bookings.
  - **src/pages/Destinations.jsx**: Destinations management page for managing travel destinations.
  - **src/pages/AddDestination.jsx**: Page for adding new destinations to the system.
  - **src/components/Sidebar.jsx**: Modern collapsible sidebar component with navigation menu and logout functionality.
- **Features** (assumed based on typical admin panels):
  - User management: View, edit, delete user accounts.
  - Content management: Update destinations, bookings, and site content.
  - Analytics: View site statistics and user activity.
  - Authentication: Separate admin login with elevated permissions.
- **UI Components**:
  - **Sidebar**: Modern collapsible sidebar with icons, responsive design, mobile overlay, and smooth animations.
  - **Dashboard**: Statistics cards showing users, bookings, destinations, and revenue; recent activity feed.
  - **Navigation**: Menu items for Dashboard, Users, Destinations, Hotels, Bookings, Analytics, and Settings.
- **Backend Integration**: Connected to main backend with role-based access control. Admin users have role: 'admin' and can login via /admin-login endpoint.
- **Default Admin Credentials**: Email: admin@example.com, Password: admin123 (created via script for testing).
- **Separation**: Admin login is separate from regular user login to maintain security and proper access control.
- **Theme**: Uses default light theme only; theme toggle functionality has been removed for simplicity.

## Current Status
- Backend authentication system fully implemented with email/password and Google OAuth.
- Frontend UI built with modern design: responsive navbar, animated login page, protected home page.
- Route protection implemented: /home requires authentication, redirects to /login otherwise.
- Logout functionality: Removes token, updates UI, redirects to home.
- Password confirmation validation and error handling in place.
- Database connection and server setup complete.
- Basic testing performed on frontend components; backend endpoints tested via Postman.
- UI improvements: Adjusted feature cards on the landing page (LandingPage.jsx) to be smaller by reducing icon sizes from text-6xl to text-5xl and padding from p-8 to p-6 for better visual balance and less bulky appearance.
- **Booking System**: Complete booking flow with Razorpay payment integration
  - Destination listing with search and filters
  - Booking form with validation
  - Razorpay payment gateway integration
  - Booking status management (Pending → Confirmed by admin)
  - Email notifications for booking updates
- **Admin Panel**: Full administrative dashboard
  - User management with status controls
  - Booking management with status updates
  - Destination management (CRUD operations)
  - Separate admin authentication
- **Payment Integration**: Razorpay gateway with proper verification and booking creation
- **Email System**: Automated emails for booking confirmations and status updates

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
- Add user profile management and password reset functionality.
- Enhance error handling and input validation across frontend and backend.
- Perform comprehensive testing: unit tests for components, integration tests for API, end-to-end testing for user flows.
- Add loading states, better UX feedback, and accessibility features.
- Deploy the application (frontend to Vercel/Netlify, backend to Heroku/Render).
- Implement additional features like advanced search, filters, and user reviews.
