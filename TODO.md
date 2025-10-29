# TODO: Fix Email Notifications for Booking Status

## Steps to Complete:
- [x] Verify .env file has correct EMAIL_USER and EMAIL_PASS (use Gmail app password if 2FA enabled)
- [x] Add sendBookingCancelledEmail function in backend/utils/mailer.js
- [x] Update updateBookingStatus in backend/controllers/bookingController.js to send emails for all status changes (pending, confirmed, cancelled)
- [ ] Test email sending by creating a booking and updating status
- [ ] Check server logs for any email-related errors

## Notes:
- Ensure Gmail account allows less secure apps or use app password for 2FA
- Emails are sent asynchronously to avoid blocking booking operations
