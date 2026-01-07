import { Outlet, useLocation } from "react-router-dom";

export default function AuthLayout() {
  const location = useLocation();
  const hideGoogleAuth = location.pathname === "/forgot-password";

  return (
    <div className="min-h-screen w-full bg-[#0f1117] flex items-center justify-center pt-10 pb-20">
      <div className="w-full max-w-7xl flex flex-col md:flex-row gap-10 px-6">

        {/* LEFT IMAGE WITH BOTTOM-CENTER OVERLAY */}
        <div className="hidden md:flex w-1/2 p-4 items-center">
          <div className="relative w-full h-[80vh] rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
              loading="lazy"
              alt="Work"
              className="w-full h-full object-cover object-center"
            />

            {/* BOTTOM CENTER OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center">
              <div className="text-center space-y-4 px-8 pb-10">
                <h2 className="text-white text-3xl font-bold flex items-start justify-center gap-2">
                  Welcome to <span className="uppercase">WORKHIVE!</span>
                </h2>

                <ul className="text-zinc-200 text-sm space-y-1.5">
                  <li>• Employee Management:View detailed profiles ,track performance and manage attendance</li>
                  <li>• Performance Insights:Track and analyze employee performance metrics</li>
                  <li>• Attendance & Leaves:Manage attendance records and leave requests</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="w-90 text-white rounded-2xl p-8 space-y-6">
            {/* Pass context to pages */}
            <Outlet context={{ showGoogle: !hideGoogleAuth }} />
          </div>
        </div>

      </div>
    </div>
  );
}
