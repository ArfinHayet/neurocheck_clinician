import { Bell, Calendar } from "lucide-react";
import { AiOutlinePoweroff } from "react-icons/ai";
import { useNavigate } from "react-router-dom";


const DashboardHeader = ({ userData, stats, onLogout }) => {
  const navigate = useNavigate();
  const handleGuidelineClick = () => {
    navigate("/guidelines");
  };

  return (
    <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex justify-between items-center">
          {/* LEFT */}
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Good afternoon, {userData?.name || ""}
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              You have {stats.pendingReviews} pending reviews and{" "}
              {stats.upcomingAppointments} appointments today
            </p>
          </div>
         

          {/* RIGHT */}
          <div className="flex gap-3 items-center">
            <button onClick={handleGuidelineClick}
              className="bg-emerald-600 p-2 rounded-lg text-white text-sm ">View Guidelines</button>
            {/* Notification */}
            <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Logout */}
            <button
              onClick={onLogout}
              className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
              title="Logout"
            >
              <AiOutlinePoweroff className="w-5 h-5 text-slate-600 group-hover:text-red-600" />
            </button>

            {/* Schedule */}
            {/* <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Schedule
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
