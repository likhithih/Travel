# TODO: Fix Firebase Popup, Backend CORS, and 404 Errors

## 1. Backend Route Prefixing
- [ ] Update backend/index.js to mount routes at /api prefix
- [ ] Update vercel.json to handle /api/* routes with CORS headers

## 2. Frontend API Calls Update
- [ ] Update Signup.jsx to call /api/register instead of /register
- [ ] Update Login.jsx to call /api/login and /api/google-signin instead of /login and /google-signin
- [ ] Check and update any other frontend files for API calls (e.g., UserRequest.jsx, etc.)

## 3. Firebase Error Handling
- [ ] Add specific error handling for auth/popup-closed-by-user in Login.jsx
- [ ] Add specific error handling for auth/popup-closed-by-user in Signup.jsx

## 4. Firebase Authorized Domains
- [ ] Add https://travel-karnataka-jo9p.vercel.app to Firebase Console > Authentication > Sign-in method > Google > Authorized domains

## 5. Testing
- [ ] Test Firebase Google sign-in on Vercel deployment
- [ ] Test backend API calls from frontend
- [ ] Verify no 404 errors on registration
