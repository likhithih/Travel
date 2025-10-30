# TODO: Replace localhost:4000 with VITE_BACKEND_BASEURL in Admin Folder

## Overview
Replace all hardcoded 'http://localhost:4000' URLs in Admin/src/pages/ files with the environment variable `${import.meta.env.VITE_BACKEND_BASEURL}` to make the backend URL configurable.

## Files to Edit
- [ ] Admin/src/pages/Requests.jsx: Replace 4 occurrences
  - Line ~20: fetch('http://localhost:4000/admin/requests')
  - Line ~35: fetch(`http://localhost:4000/admin/requests/${requestId}/approve`)
  - Line ~47: fetch(`http://localhost:4000/admin/requests/${requestId}/reject`)
  - Line ~108: src={`http://localhost:4000${selectedRequest.image}`}

- [ ] Admin/src/pages/Login.jsx: Replace 1 occurrence
  - Line ~15: axios.post('http://localhost:4000/admin-login')

- [ ] Admin/src/pages/Destinations.jsx: Replace 2 occurrences
  - Line ~40: fetch('http://localhost:4000/admin/destinations')
  - Line ~58: fetch(`http://localhost:4000/admin/destinations/${destinationToDelete._id}`)

- [ ] Admin/src/pages/Dashboard.jsx: Replace 2 occurrences
  - Line ~35: fetch('http://localhost:4000/admin/stats')
  - Line ~45: fetch('http://localhost:4000/admin/bookings/recent')

- [ ] Admin/src/pages/Bookings.jsx: Replace 2 occurrences
  - Line ~35: axios.get('http://localhost:4000/admin/bookings')
  - Line ~55: axios.delete(`http://localhost:4000/admin/bookings/${bookingId}`)
  - Line ~65: axios.put(`http://localhost:4000/admin/bookings/${bookingId}/status`)

- [ ] Admin/src/pages/AddDestination.jsx: Replace 1 occurrence
  - Line ~178: url = `http://localhost:4000/admin/destinations` or with id

## Replacement Pattern
Change from: 'http://localhost:4000/path'
To: `${import.meta.env.VITE_BACKEND_BASEURL}/path`

Note: Ensure the string is converted to a template literal (backticks) where necessary.

## Follow-up Steps
- [ ] Verify all replacements are correct
- [ ] Test the application to ensure backend calls work with the env variable
- [ ] Ensure VITE_BACKEND_BASEURL is set in .env file (e.g., VITE_BACKEND_BASEURL=http://localhost:4000)
