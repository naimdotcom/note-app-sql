const OtpEmailTemplate = (firstName, Otp, expirationTime) => {
  const formattedTime = new Date(expirationTime).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // Use 12-hour format
  });

  return `
       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h2 style="color: #4CAF50; text-align: center;">OTP Verification</h2>
            <p style="font-size: 16px; color: #333;">Hi,</p>
            <p style="font-size: 16px; color: #333;">Your OTP code for verification is:</p>
            <h1 style="text-align: center; color: #4CAF50; font-size: 36px; margin: 20px 0;">${Otp}</h1>
            <p style="font-size: 14px; color: #555; text-align: center;">This OTP is valid for the next 10 minutes or at ${formattedTime}. Please do not share it with anyone.</p>
            <p style="font-size: 14px; color: #555; text-align: center;">If you didn’t request this, please ignore this email.</p>
            <p style="font-size: 16px; color: #333; text-align: center;">Thank you,</p>
            <p style="font-size: 16px; color: #333; text-align: center;"><strong>${firstName}</strong></p>
            <footer style="margin-top: 20px; font-size: 12px; color: #666; text-align: center;">
              <p>You are receiving this email because a verification request was made with your email address.</p>
            </footer>
          </div>
      `;
};

module.exports = { OtpEmailTemplate };
