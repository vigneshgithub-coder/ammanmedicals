// utils/mailer.js

const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vigneshwaranmca22@gmail.com',
    pass: 'gway cslv hhbt xezt',
  },
});

 async function sendOTPEmail(to, otp) {
  const mailOptions = {
    from: 'vigneshwaranmca22@gmail.com',
    to,
    subject: 'Order Confirmation OTP',
    html: `<p>Your OTP to confirm the order is: <b>${otp}</b>. It expires in 5 minutes.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Mailer error:", error);  // Log the error from the mailer
    throw new Error('Error sending OTP email');
  }

}


module.exports = { sendOTPEmail };
