# Theme Toggle Background Update Plan

## Information Gathered
- ThemeContext provides `darkMode` boolean state.
- Navbar already uses theme toggle and applies conditional header background.
- Destination page uses `darkMode` for main background (bg-gray-900 or bg-gray-50).
- Other components have fixed backgrounds not tied to theme:
  - HeroSection: fixed bg-black
  - Card: fixed bg-white
  - Footer: fixed bg-violet-900
  - Booking: fixed bg-gray-50
  - About: fixed gradients (from-gray-900 via-slate-800 to-black)
  - Login: dynamic but not theme-aware
  - LandingPage: fixed gradients

## Plan
- Update each component to import `useTheme` from ThemeContext.
- Apply conditional background classes based on `darkMode`.
- For gradients, provide separate dark and light gradient classes.
- Ensure text colors are theme-aware (e.g., text-white in dark, text-gray-900 in light).
- Update all page components and reusable components.

## Dependent Files to Edit
- frontend/src/pages/Home.jsx
- frontend/src/Compoents/HeroSection.jsx
- frontend/src/Compoents/Card.jsx
- frontend/src/Compoents/Footer.jsx
- frontend/src/pages/Booking.jsx
- frontend/src/pages/About.jsx
- frontend/src/pages/Login.jsx
- frontend/src/pages/Destination.jsx (already partially done)
- frontend/src/pages/LandingPage.jsx
- Any other components like BestAgency.jsx if they have backgrounds.

## Followup Steps
- Test theme toggle in browser to verify all backgrounds change.
- Adjust text colors and other elements if they don't contrast well in both themes.
- Ensure no hardcoded colors remain that override theme.
