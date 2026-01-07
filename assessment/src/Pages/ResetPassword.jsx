import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../API/mockForgotPassword";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");

    //  Empty fields validation
    if (!password || !confirm) {
      setError("Please fill in both password fields");
      return;
    }

    //  Minimum length validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    //  Password match validation
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    // Mock API call
    try {
      await resetPassword();
      navigate("/");
    } catch (err) {
      setError("Something went wrong. Try again.",err);
    }
  };

  return (
    <div className="w-full max-w-md text-white flex flex-col gap-8">
      <h1 className="text-3xl font-bold text-center">
        Create New Password
      </h1>

      <form onSubmit={handleReset} className="flex flex-col gap-6">
        {/* PASSWORD */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-zinc-300">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full h-11 px-4 pr-12
                rounded-xl
                bg-zinc-900
                border border-zinc-700
                text-white text-sm
                focus:outline-none
                focus:border-purple-500
                focus:ring-4 focus:ring-purple-500/30
              "
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="
                absolute right-4 top-1/2 -translate-y-1/2
                text-zinc-400 hover:text-white
              "
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-zinc-300">
            Confirm Password
          </label>

          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="
                w-full h-11 px-4 pr-12
                rounded-xl
                bg-zinc-900
                border border-zinc-700
                text-white text-sm
                focus:outline-none
                focus:border-purple-500
                focus:ring-4 focus:ring-purple-500/30
              "
            />

            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="
                absolute right-4 top-1/2 -translate-y-1/2
                text-zinc-400 hover:text-white
              "
            >
              {showConfirm ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <p className="text-red-400 text-sm text-center animate-pulse">
            {error}
          </p>
        )}

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={!password || !confirm}
          className="
            w-full h-11
            rounded-xl
            bg-purple-600
            hover:bg-purple-700
            font-semibold text-sm
            transition-all
            active:scale-95
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          Update Password
        </button>
      </form>
    </div>
  );
}
