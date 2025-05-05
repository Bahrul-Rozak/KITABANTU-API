// Dummy function untuk pengiriman email
exports.sendResetPasswordEmail = (email, token) => {
    console.log(`Reset password link untuk ${email}:`);
    console.log(`http://localhost:3000/reset-password?token=${token}`);
    return Promise.resolve();
  };