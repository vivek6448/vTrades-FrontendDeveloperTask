import { useState } from "react";
import { emailPasswordLogin } from "../API/mockAuth";
import { useNavigate, useOutletContext } from "react-router-dom";
import GoogleSignIn from "../Components/GoogleSignIn";
import { Eye, EyeOff } from "lucide-react";

export default function Home() {
  const { showGoogle } = useOutletContext(); // 👈 from AuthLayout

  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await emailPasswordLogin(form);
      setUser(res);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- LOGGED IN ---------------- */
  if (user) {
    return (
      <div className="text-white text-center">
        <img
          src={user.user.avatar}
          alt="profile"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h2 className="text-xl font-semibold">{user.user.name}</h2>
        <p className="text-zinc-400">{user.user.email}</p>
        <button
          onClick={() => setUser(null)}
          className="mt-5 w-full bg-red-500 hover:bg-red-600 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>
    );
  }

  /* ---------------- SIGN IN CONTENT ---------------- */
  return (
    <div
      className="
      flex flex-col gap-8
        w-100 h-140 max-w-md
        font-semibold text-white
        rounded-4xl
        shadow-xl
        space-y-6
      "
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Sign In</h1>
        <p className="text-zinc-400 text-sm">
          Manage your workspace seamlessly. Sign in to continue.
        </p>
      </div>

      <form onSubmit={handleLogin} className="flex flex-col gap-6">
        {/* EMAIL */}
        <div className="space-y-2 flex flex-col gap-1">
          <label className="block text-sm text-zinc-300">Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="h-10 w-full px-7 py-5 text-sm rounded-xl bg-zinc-900/90 border border-zinc-700 text-white transition-all duration-200 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/30 hover:border-zinc-500"
          />
        </div>

        {/* PASSWORD */}
        <div className="space-y-2 flex flex-col gap-1">
          <label className="block text-sm text-zinc-300">Password</label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Your Password"
              value={form.password}
              onChange={handleChange}
              required
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

        {/* REMEMBER / FORGOT */}
        <div className="flex items-center justify-between text-sm text-zinc-400">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="accent-purple-500 cursor-pointer scale-110"
            />
            Remember me
          </label>
          <span
            onClick={() => navigate("/forgot-password")}
            className="text-purple-400 hover:text-purple-300 cursor-pointer transition"
          >
            Forgot Password?
          </span>
        </div>

        {error && (
          <p className="text-red-400 text-sm text-center animate-pulse">
            {error}
          </p>
        )}

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="h-10 w-full px-7 py-5 text-xl rounded-xl bg-zinc-900/90 border border-zinc-700 text-white transition-all duration-200 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/30 hover:border-zinc-500"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        {/* SIGN UP */}
        <p className="text-sm text-zinc-500 text-center">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-purple-400 hover:text-purple-300 cursor-pointer transition"
          >
            Sign Up
          </span>
        </p>
      </form>

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
    </div>
  );
}
