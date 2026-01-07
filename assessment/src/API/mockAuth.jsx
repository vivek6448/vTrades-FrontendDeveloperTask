export const emailPasswordLogin = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "vivek@gmail.com" && password === "123456") {
        resolve({
          success: true,
          token: "mock-email-jwt",
          user: {
            name: "Vivek Singh",
            email,
            avatar:
              "https://www.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png",
          },
        });
      } else {
        reject("Invalid credentials");
      }
    }, 1200);
  });
};

export const googleLogin = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        token: "mock-google-jwt-token",
        user: {
          name: "Vivek Singh",
          email: "vivek@gmail.com",
          avatar:
            "https://www.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png",
        },
      });
    }, 1200);
  });
};
//Mock API jwt token for login in Sign in with Google button
