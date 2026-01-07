import { useState } from "react";
import { googleLogin } from "../API/mockAuth";

export default function GoogleSignIn({ onSuccess }) {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const res = await googleLogin();
      onSuccess(res);
    } catch (err) {
      console.error(err);
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      disabled={loading}
      className="google-btn w-full  text-white py-2 rounded-lg font-semibold"
    >
      {loading ? "Signing in..." : "Sign in with Google"}
    </button>
  );
}
// Sign in with Google button component using mock API