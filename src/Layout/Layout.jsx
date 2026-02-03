import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import Topbar from "../components/Topbar";
import { Toaster } from "react-hot-toast";

export default function RootLayout() {
  const location = useLocation();

  // console.log("RootLayout rendering, path:", location.pathname);

  return (
    <div className="min-h-screen flex ">
      <div className="w-[16%] fixed left-0 h-full">
        <Navbar />
      </div>

      <div className="lg:flex-1 lg:ml-[16%] bg-[#F6F7F9]  w-full ">
      {/* <div > */}
        <Topbar />
        <Toaster />
        <Outlet />
      </div>
    </div>
  );
}
