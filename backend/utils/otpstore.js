const otpStore = {};

function saveOTP(email, otp) {
  otpStore[email] = {
    otp,
    timestamp: Date.now()
  };
}

function verifyOTP(email, enteredOtp) {
  const record = otpStore[email];
  if (!record) return false;

  // Optional: Check if OTP is expired (e.g., 5 mins)
  const isExpired = Date.now() - record.timestamp > 5 * 60 * 1000;
  if (isExpired) return false;

  return record.otp === enteredOtp;
}

module.exports = {
  saveOTP,
  verifyOTP,
};
