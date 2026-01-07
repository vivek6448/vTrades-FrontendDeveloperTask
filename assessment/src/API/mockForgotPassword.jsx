let generatedOTP = null;

export const sendOtpToEmail = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
      console.log("Mock OTP sent to email:", generatedOTP);
      resolve({ success: true });
    }, 1000);
  });
};

export const verifyOtp = (otp) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (otp === generatedOTP) {
        resolve({ success: true });
      } else {
        reject("Invalid OTP");
      }
    }, 800);
  });
};

export const resetPassword = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      generatedOTP = null;
      resolve({ success: true });
    }, 800);
  });
};
