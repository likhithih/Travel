nd# TODO: Fix Firebase Auth COOP Error by Switching to signInWithRedirect

- [x] Update imports in frontend/src/pages/Login.jsx to include getRedirectResult from 'firebase/auth'
- [x] Add useEffect hook in Login component to check for redirect result on mount
- [x] Implement logic in useEffect to process user data from redirect result, send to backend, set token, and navigate
- [x] Modify Google sign-in button to call signInWithRedirect(auth, provider) directly
- [x] Remove the old handleGoogleSignIn function
- [x] Test the updated Google sign-in flow to ensure no COOP error and proper functionality
