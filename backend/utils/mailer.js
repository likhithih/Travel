import nodemailer from 'nodemailer';

// Create transporter
const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Send booking confirmation email
export const sendBookingConfirmationEmail = async (userEmail, bookingDetails) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: 'Booking Confirmation - Trippy Travels',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #4CAF50;">Booking Confirmed!</h2>
                    <p>Dear Customer,</p>
                    <p>Your booking has been confirmed. Here are the details:</p>
                    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
                        <h3>Booking Details:</h3>
                        <p><strong>Package:</strong> ${bookingDetails.packageName}</p>
                        <p><strong>Destination:</strong> ${bookingDetails.destination}</p>
                        <p><strong>Travel Date:</strong> ${bookingDetails.travelDate}</p>
                        <p><strong>Travelers:</strong> ${bookingDetails.travelers}</p>
                        <p><strong>Total Amount:</strong> ₹${bookingDetails.totalAmount}</p>
                        <p><strong>Status:</strong> Confirmed</p>
                    </div>
                    <p>Thank you for choosing Trippy Travels!</p>
                    <p>Best regards,<br>Trippy Travels Team</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('Booking confirmation email sent successfully');
    } catch (error) {
        console.error('Error sending booking confirmation email:', error);
        throw error;
    }
};

// Send booking pending email
export const sendBookingPendingEmail = async (userEmail, bookingDetails) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: 'Booking Received - Trippy Travels',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #FF9800;">Booking Received!</h2>
                    <p>Dear Customer,</p>
                    <p>Your booking has been received and is currently pending approval. Here are the details:</p>
                    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
                        <h3>Booking Details:</h3>
                        <p><strong>Package:</strong> ${bookingDetails.packageName}</p>
                        <p><strong>Destination:</strong> ${bookingDetails.destination}</p>
                        <p><strong>Travel Date:</strong> ${bookingDetails.travelDate}</p>
                        <p><strong>Travelers:</strong> ${bookingDetails.travelers}</p>
                        <p><strong>Total Amount:</strong> ₹${bookingDetails.totalAmount}</p>
                        <p><strong>Status:</strong> Pending</p>
                    </div>
                    <p>You will receive another email once your booking is confirmed by our admin team.</p>
                    <p>Thank you for choosing Trippy Travels!</p>
                    <p>Best regards,<br>Trippy Travels Team</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('Booking pending email sent successfully');
    } catch (error) {
        console.error('Error sending booking pending email:', error);
        throw error;
    }
};
