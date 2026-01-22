
import { useEffect, useRef, useState } from "react";
import { LuMessageSquareMore } from "react-icons/lu";
import { RiShutDownLine } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";


const Header = ({ title, description }) => {
  // const [time, setTime] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef(null);

  const navigation = useNavigate();

  // Set current time and update every minute
  // useEffect(() => {
  //   const updateTime = () => {
  //     const now = new Date();
  //     const formatted = now.toLocaleTimeString([], {
  //       hour: "numeric",
  //       minute: "2-digit",
  //       hour12: true,
  //     });
  //     setTime(formatted);
  //   };

  //   updateTime();
  //   const interval = setInterval(updateTime, 60000);
  //   return () => clearInterval(interval);
  // }, []);

  // Close tooltip on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target)
      ) {
        setShowTooltip(false);
      }
    };

    if (showTooltip) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showTooltip]);

  const toggleTooltip = () => {
    setShowTooltip((prev) => !prev);
  };

  const handleLogout = () => {
    //console.log("Logging out...");
    setShowTooltip(false);
    localStorage.removeItem("accessToken");
    navigation.replace("/signin");
   
  
  };

  return (
    <div className="flex-1 mb-8 relative">
   
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="md:block hidden">
          <div className="flex relative">
            {/* <button>
              <LuMessageSquareMore size={20} className="text-[#114654] cursor-pointer" />
            </button> */}
            <button>
              <IoMdNotificationsOutline size={23} className="text-[#114654] mx-2 cursor-pointer" />
            </button>
            <button onClick={toggleTooltip}>
                <RiShutDownLine size={21} className="text-[#114654] cursor-pointer" />
            </button>
           
            <div className="relative" ref={tooltipRef}>            
              {showTooltip && (
                <div className="absolute cursor-pointer right-0 mt-8 w-24 bg-white border border-gray-300 rounded shadow-md z-10">
                  <button
                    onClick={handleLogout}
                    className="w-full px-3 py-2 cursor-pointer text-sm text-left hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      
      <div className="flex flex-col text-[#3B3B3B] font-semibold text-lg md:flex-row md:justify-between">
        <p className="mt-2 text-xs text-[#6C6C6C]">{description}</p>
        {/* {time && (
          <p className="text-2xl md:block hidden font-medium text-[#3B3B3B] mt-2 md:mt-0">
            {time}
          </p>
        )} */}
      </div>
    </div>
  );
};

export default Header;
