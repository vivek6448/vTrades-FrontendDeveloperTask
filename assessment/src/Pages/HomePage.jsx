import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import GoogleSignIn from "../Components/GoogleSignIn";
import { emailPasswordLogin } from "../API/mockAuth";

export default function Home() {
  const { showGoogle } = useOutletContext(); // from AuthLayout

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

  /* ---------------- LOGGED IN VIEW ---------------- */
  if (user) {
    return (
      <div className="text-white text-center space-y-4">
        <img
          src={user.user.avatar}
          alt="profile"
          className="w-24 h-24 rounded-full mx-auto"
        />
        <h2 className="text-xl font-semibold">{user.user.name}</h2>
        <p className="text-zinc-400">{user.user.email}</p>
        <button
          onClick={() => setUser(null)}
          className="mt-4 w-full bg-red-500 hover:bg-red-600 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>
    );
  }

  /* ---------------- SIGN IN FORM ---------------- */
  return (
    <div
      className=" flex flex-col gap-6 w-full text-white
   bg-[#0f1117] 
    rounded-2xl
    p-6 md:p-8"
    >
      {/* HEADING */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Sign In</h1>
        <p className="text-zinc-400 text-sm">
          Manage your workspace seamlessly. Sign in to continue.
        </p>
      </div>

      {/* FORM */}
      <form onSubmit={handleLogin} className="flex flex-col gap-5">
        {/* EMAIL */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-zinc-300">Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
            className="
              h-11 px-4 text-sm rounded-xl
              bg-zinc-900 border border-zinc-700
              focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30
            "
          />
        </div>

        {/* PASSWORD */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-zinc-300">Password</label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
              className="
                h-11 w-full px-4 pr-12 text-sm rounded-xl
                bg-zinc-900 border border-zinc-700
                focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30
              "
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
        </div>

        {/* REMEMBER / FORGOT */}
        <div className="flex items-center justify-between text-sm text-zinc-400">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="accent-purple-500" />
            Remember me
          </label>

          <span
            onClick={() => navigate("/forgot-password")}
            className="text-purple-400 hover:text-purple-300 cursor-pointer"
          >
            Forgot password?
          </span>
        </div>

        {/* ERROR */}
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="
            h-11 rounded-xl font-semibold
            bg-purple-600 hover:bg-purple-700
            transition disabled:opacity-60
          "
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        {/* SIGN UP */}
        <p className="text-sm text-zinc-500 text-center">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-purple-400 hover:text-purple-300 cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </form>

      {/* GOOGLE SIGN IN */}
      {showGoogle && (
        <div className="flex flex-col gap-4 pt-2">
          {/* DIVIDER */}
          <div className="relative text-center text-zinc-500 text-sm">
            <span className="px-3 bg-[#131622] relative z-10">or</span>
            <div className="absolute inset-x-0 top-1/2 border-t border-zinc-700" />
          </div>

          {/* GOOGLE BUTTON */}
          <div className="rounded-xl border border-zinc-700 overflow-hidden">
            <GoogleSignIn onSuccess={setUser} />
          </div>
        </div>
      )}
    </div>
  );
}
