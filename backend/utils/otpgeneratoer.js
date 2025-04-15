// utils/otpGenerator.js
function generateOTP(length = 6) {
  const otp = Math.random().toString(36).substr(2, length);
  return otp;
}

module.exports = { generateOTP };
