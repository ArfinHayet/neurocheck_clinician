
import { LuMessageSquareMore } from "react-icons/lu";
import { IoNotificationsOutline } from "react-icons/io5";
import { RiShutDownLine } from "react-icons/ri";

import logo from "../../public/svg/mobile_logo.svg";

const Topbar = () => {
  return (
    <div className="md:hidden bg-[#114654] text-white px-4 py-3 flex items-center justify-between">
      <div className="text-2xl font-bold">
        <img src={logo} alt="logo" className="w-10 h-10" />
      </div>

      <div className="flex gap-3">
        <button type="button">
          <LuMessageSquareMore className="text-xl text-white" />
        </button>

        <button type="button">
          <IoNotificationsOutline className="text-xl text-white" />
        </button>

        <button type="button">
          <RiShutDownLine className="text-xl text-white" />
        </button>
      </div>
    </div>
  );
};

export default Topbar;
