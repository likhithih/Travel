import Router from 'express';
import { registerUser, loginUser, adminLogin, googleSignIn, getProfile } from '../controllers/userController.js';
import { getAllUsers, updateUserStatus, deleteUser, updateUser } from '../controllers/adminController.js';
import {
    getAllDestinations,
    getDestinationById,
    createDestination,
    updateDestination,
    deleteDestination,
    upload
} from '../controllers/destinationController.js';
import {
    createUserRequest,
    getAllUserRequests,
    getUserRequests,
    approveUserRequest,
    rejectUserRequest,
    editUserRequest,
    upload as userRequestUpload
} from '../controllers/userRequestController.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { sendPaymentSuccessEmail } from '../utils/mailer.js';

const router = Router();

// User registration route
router.post('/register', registerUser);
// User login route
router.post('/login', loginUser);
// Admin login route
router.post('/admin-login', adminLogin);
// Google sign-in route
router.post('/google-signin', googleSignIn);
// Profile route
router.get('/profile', authenticateToken, getProfile);

// Admin routes
router.get('/admin/users', authenticateToken, requireAdmin, getAllUsers);
router.put('/admin/users/:userId/status', authenticateToken, requireAdmin, updateUserStatus);
router.put('/admin/users/:userId', authenticateToken, requireAdmin, updateUser);
router.delete('/admin/users/:userId', authenticateToken, requireAdmin, deleteUser);

// Destination routes
router.get('/destinations', getAllDestinations); // Public route for frontend to get all destinations
router.get('/admin/destinations', authenticateToken, requireAdmin, getAllDestinations);
router.get('/destinations/:id', getDestinationById); // Public route for frontend
router.post('/admin/destinations', authenticateToken, requireAdmin, upload.single('image'), createDestination);
router.put('/admin/destinations/:id', authenticateToken, requireAdmin, upload.single('image'), updateDestination);
router.delete('/admin/destinations/:id', authenticateToken, requireAdmin, deleteDestination);

// Create order
router.post('/create-order', authenticateToken, async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const { amount, currency = 'INR', receipt } = req.body;

    const options = {
      amount: amount, // amount in paisa
      currency,
      receipt,
    };

    const order = await razorpay.orders.create(options);
    res.json({ order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Failed to create order' });
  }
});

// Verify payment
router.post('/verify-payment', authenticateToken, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingData } = req.body;

    // Verify signature
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature === expectedSign) {
      // Payment verified, now create the booking
      const Booking = (await import('../models/Booking.js')).default;
      const Destination = (await import('../models/Destination.js')).default;
      const User = (await import('../models/User.js')).default;

      // Check if destination exists
      const destination = await Destination.findById(bookingData.destinationId);
      if (!destination) {
        return res.status(404).json({ message: 'Destination not found' });
      }

      // Get user details for email
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Create booking
      const newBooking = new Booking({
        user: req.user.id, // from auth middleware
        destination: bookingData.destinationId,
        packageName: bookingData.packageName,
        travelDate: new Date(bookingData.travelDate),
        travelers: bookingData.travelers,
        totalAmount: bookingData.totalAmount,
        specialRequests: bookingData.specialRequests,
        status: 'Pending', // Set to Pending for admin review
        paymentStatus: 'Paid',
        paymentId: razorpay_payment_id,
      });

      await newBooking.save();

      // Send payment success email
      try {
        await sendPaymentSuccessEmail(user.email, {
          packageName: bookingData.packageName,
          destination: destination.name,
          travelDate: new Date(bookingData.travelDate).toISOString().split('T')[0],
          travelers: bookingData.travelers,
          totalAmount: bookingData.totalAmount
        });
      } catch (emailError) {
        console.error('Failed to send payment success email:', emailError);
        // Don't fail the booking creation if email fails
      }

      res.json({ success: true, message: 'Payment verified, booking created, and confirmation email sent' });
    } else {
      res.status(400).json({ success: false, message: 'Payment verification failed' });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ message: 'Failed to verify payment' });
  }
});

// User request routes
router.post('/user-request', authenticateToken, userRequestUpload.single('image'), createUserRequest); // Authenticated route for users to submit requests
router.get('/user/requests', authenticateToken, getUserRequests); // Get user's own requests
router.get('/admin/requests', authenticateToken, requireAdmin, getAllUserRequests);
router.post('/admin/requests/:requestId/approve', authenticateToken, requireAdmin, approveUserRequest);
router.post('/admin/requests/:requestId/reject', authenticateToken, requireAdmin, rejectUserRequest);
router.put('/admin/requests/:requestId/edit', authenticateToken, requireAdmin, editUserRequest);

export default router;
