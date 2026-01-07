import { Link, useNavigate, useOutletContext } from "react-router-dom";
import GoogleSignIn from "../Components/GoogleSignIn";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function SignUp() {
  const navigate = useNavigate();
  const { showGoogle } = useOutletContext(); // from AuthLayout

  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSignUp = () => {
    // signup logic / API call
    navigate("/"); // go to Sign In page
  };

  // OPTIONAL: if user logs in via Google
  if (user) {
    navigate("/");
    return null;
  }

  return (
    <div className="flex flex-col gap-4 max-w-md w-full text-white space-y-6">
      <h1 className="text-3xl font-bold mb-6">Create Account</h1>

      {/* EMAIL */}
      <div className="space-y-2 flex flex-col gap-1">
        <label htmlFor="email" className="block text-sm text-zinc-300">
          Email
        </label>
        <input
          id="email"
          placeholder="Email"
          className="h-10 w-full px-7 py-5 text-sm rounded-xl bg-zinc-900/90 border border-zinc-700 text-white transition-all duration-200 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/30 hover:border-zinc-500"
        />
      </div>

      {/* PASSWORD */}
      <div className="space-y-2 flex flex-col gap-1">
        <label htmlFor="password" className="block text-sm text-zinc-300">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="h-10 w-full px-7 py-5 pr-14 text-sm rounded-xl bg-zinc-900/90 border border-zinc-700 text-white transition-all duration-200 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/30 hover:border-zinc-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition"
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>
      </div>

      {/* CONFIRM PASSWORD */}
      <div className="space-y-2 flex flex-col gap-1">
        <label
          htmlFor="confirmPassword"
          className="block text-sm text-zinc-300"
        >
          Confirm Password
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            type={showConfirm ? "text" : "password"}
            placeholder="**********"
            className="h-10 w-full px-7 py-5 pr-14 text-sm rounded-xl bg-zinc-900/90 border border-zinc-700 text-white transition-all duration-200 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/30 hover:border-zinc-500"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition"
          >
            {showConfirm ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>
      </div>

      {/* SIGN UP BUTTON */}
      <button
        onClick={handleSignUp}
        className="w-full h-10 bg-purple-600 py-3 rounded-xl font-semibold hover:bg-purple-700 transition"
      >
        Sign Up
      </button>

      {/* GOOGLE SIGN IN */}
      {showGoogle && (
        <div className="flex flex-col gap-4 pt-2">
          {/* Divider */}
          <div className="relative text-center text-zinc-500 text-sm">
            <span className="px-4">or</span>
            <div className="absolute left-0 right-0 top-1/2 border-t border-zinc-700" />
          </div>

          {/* Google Button */}
          <div className="rounded-lg border border-zinc-700 overflow-hidden">
            <GoogleSignIn onSuccess={setUser} />
          </div>
        </div>
      )}

      {/* FOOTER */}
      <p className="text-zinc-500 text-center">
        Already have an account?{" "}
        <Link to="/" className="text-purple-400 hover:text-purple-300">
          Sign In
        </Link>
      </p>
    </div>
  );
}
