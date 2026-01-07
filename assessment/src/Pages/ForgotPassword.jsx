import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendOtpToEmail } from "../API/mockForgotPassword";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await sendOtpToEmail(email); // mock OTP send
      setShowPopup(true);         // show popup
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* MAIN CARD */}
      <div
        className="
          flex flex-col gap-10
          w-full h-100 max-w-md
          font-semibold text-white
          rounded-4xl
          shadow-xl
          space-y-10
        "
      >
        {/* HEADER */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Forgot Password</h1>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Don&apos;t worry! Enter your email address and we&apos;ll send you a
            link to reset your password.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="space-y-2 flex flex-col gap-1">
            <label className="block text-sm text-zinc-300">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="
                h-10 w-full px-7 py-5 text-sm
                rounded-xl
                bg-zinc-900/90
                border border-zinc-700
                text-white
                transition-all duration-200
                focus:outline-none
                focus:border-purple-500
                focus:ring-4 focus:ring-purple-500/30
                hover:border-zinc-500
              "
            />
          </div>

          <button
            type="submit"
            disabled={loading}
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
            {loading ? "Sending OTP..." : "Submit"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-zinc-500 text-sm text-center">
          Back to{" "}
          <Link
            to="/"
            className="text-purple-400 hover:text-purple-300 transition"
          >
            Sign In
          </Link>
        </p>
      </div>

      {/* SUCCESS POPUP */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <div className="popup-icon">✓</div>

            <h2 className="text-lg font-semibold">
              Link Sent Successfully
            </h2>

            <p className="text-sm text-zinc-400 text-center">
              Please check your email for the OTP.
            </p>

            <button
              onClick={() => {
                setShowPopup(false);
                navigate("/verify-otp");
              }}
              className="popup-btn"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}
