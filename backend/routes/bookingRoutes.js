import Router from 'express';
import { createBooking, getAllBookings, getUserBookings, updateBooking, updateBookingStatus, deleteBooking } from '../controllers/bookingController.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = Router();

// User booking routes
router.post('/bookings', authenticateToken, createBooking);
router.get('/bookings/user', authenticateToken, getUserBookings);
router.put('/bookings/:id', authenticateToken, updateBooking);
router.delete('/bookings/:id', authenticateToken, deleteBooking);

// Admin booking management routes
router.get('/admin/bookings', authenticateToken, requireAdmin, getAllBookings);
router.put('/admin/bookings/:id/status', authenticateToken, requireAdmin, updateBookingStatus);
router.delete('/admin/bookings/:id', authenticateToken, requireAdmin, deleteBooking);

export default router;
