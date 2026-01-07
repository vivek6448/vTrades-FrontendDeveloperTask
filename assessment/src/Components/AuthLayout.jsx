import { Outlet, useLocation } from "react-router-dom";

export default function AuthLayout() {
  const location = useLocation();
  const hideGoogleAuth = location.pathname === "/forgot-password";

  return (
    <div className="min-h-screen w-full bg-[#0f1117] flex items-center justify-center pt-6 pb-10">
      <div className="w-full max-w-7xl flex flex-col md:flex-row gap-8 px-4 md:px-6">

        {/* LEFT IMAGE — VISIBLE ON MOBILE + DESKTOP */}
        <div className="flex w-full md:w-1/2 p-2 md:p-4 items-center justify-center">
          <div className="relative w-full h-[40vh] md:h-[80vh] rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
              loading="lazy"
              alt="Work"
              className="w-full h-full object-cover object-center"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center">
              <div className="text-center space-y-3 md:space-y-4 px-5 md:px-8 pb-6 md:pb-10">
                <h2 className="text-white text-xl md:text-3xl font-bold flex items-center justify-center gap-2">
                  Welcome to <span className="uppercase">WORKHIVE!</span>
                </h2>

                <ul className="text-zinc-200 text-xs md:text-sm space-y-1.5">
                  <li>• Employee Management: View profiles & attendance</li>
                  <li>• Performance Insights & analytics</li>
                  <li>• Attendance & leave management</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE — AUTH FORMS */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="w-full max-w-md text-white rounded-2xl p-6 md:p-8 space-y-6 bg-[#131622] shadow-xl">
            {/* Pass context to auth pages */}
            <Outlet context={{ showGoogle: !hideGoogleAuth }} />
          </div>
        </div>

      </div>
    </div>
  );
}
