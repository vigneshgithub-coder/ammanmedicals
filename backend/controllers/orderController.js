const twilio = require('twilio');
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } = process.env; // Store your credentials in environment variables

// Initialize Twilio client
const client = new twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const sendOtp = (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: "Phone number required" });

  try {
    const otp = generateOtp(); // Generate OTP
    storeOtp(phone, otp, otpStore); // Store OTP in memory or DB
    console.log(`📲 OTP for ${phone} is ${otp}`); // Log OTP for debugging (can be removed in production)

    // Send OTP via Twilio
    client.messages
      .create({
        body: `Your OTP code is ${otp}`,
        from: TWILIO_PHONE_NUMBER, // Your Twilio phone number
        to: phone, // The phone number to which OTP is sent
      })
      .then((message) => {
        console.log(`OTP sent to ${phone}: ${message.sid}`);
        res.json({ success: true, message: "OTP sent successfully" });
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
        res.status(500).json({ success: false, message: "Failed to send OTP" });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
