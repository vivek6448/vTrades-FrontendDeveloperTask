import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { verifyOtp, sendOtpToEmail } from "../API/mockForgotPassword";

export default function VerifyOtp() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const inputsRef = useRef([]);

  /* HANDLE OTP CHANGE */
  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return; // allow only digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // auto focus next box
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  /* HANDLE BACKSPACE */
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  /* VERIFY OTP */
  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await verifyOtp(otp.join(""));
      navigate("/reset-password");
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  /* RESEND OTP */
  const handleResend = async () => {
    setResending(true);
    setError("");

    try {
      await sendOtpToEmail("resend@example.com");
    } finally {
      setResending(false);
    }
  };

  return (
    <div
      className="
        flex flex-col gap-10
        w-full max-w-md
        font-semibold text-white
        rounded-4xl
        shadow-xl
        space-y-10
      "
    >
      {/* HEADER */}
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Verify OTP</h1>
        <p className="text-zinc-400 text-sm leading-relaxed">
          Enter the 6-digit code sent to your email address.
        </p>
      </div>

      {/* FORM */}
      <form onSubmit={handleVerify} className="flex flex-col gap-6">
        <Link
          to="/forgot-password"
          className="font-semibold text-sm text-purple-400 hover:text-purple-300 transition"
        >
          Change email address
        </Link>

        {/* OTP BOXES */}
        <div className="flex justify-between gap-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="
                w-12 h-12
                text-xl font-bold text-center
                rounded-xl
                bg-zinc-900/90
                border border-zinc-700
                text-white
                focus:outline-none
                focus:border-purple-500
                focus:ring-2 focus:ring-purple-500/30
                transition
              "
            />
          ))}
        </div>

        {error && (
          <p className="text-red-400 text-sm text-center animate-pulse">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading || otp.some((d) => d === "")}
          className="
            h-10 w-full px-7 py-5
            text-sm font-semibold
            rounded-xl
            bg-purple-600
            hover:bg-purple-700
            transition-all
            active:scale-95
            disabled:opacity-60
          "
        >
          {loading ? "Verifying..." : "Continue"}
        </button>
      </form>

      {/* ACTION LINKS */}
      <div className="flex flex-col gap-4 text-center text-sm">
        <button
          onClick={handleResend}
          disabled={resending}
          className="text-purple-400 hover:text-purple-300 transition disabled:opacity-50"
        >
          {resending ? "Resending OTP..." : "Resend OTP"}
        </button>
      </div>
    </div>
  );
}
