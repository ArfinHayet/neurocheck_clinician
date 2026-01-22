import { AuthContext } from "../../Provider/AuthProvider";

import { useContext } from "react";
import { FaCalendarAlt, FaFileInvoice } from "react-icons/fa";

const ClinicianDetails = () => {

  const { userData } = useContext(AuthContext) || {};

  return (
    <div className=" p-4 rounded-lg  flex justify-between items-start border border-[#DFDFDF] mb-8">
    <div className="">
      <h2 className="text-lg font-semibold text-black">{userData?.name}</h2>
      <p className="text-sm text-gray-600">{userData?.certification}</p>
      <p className="text-sm text-gray-600">{userData?.email}</p>
      <p className="text-sm text-gray-600">{userData?.phone}</p>
    </div>

    <div className="text-sm text-gray-700 space-y-3"> 
      <div className="flex items-center gap-2">
        <FaFileInvoice />
        <span>INV-JUL-2025-039</span>
        <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 text-xs rounded-full ml-2">unpaid</span>
      </div>
      <div className="flex items-center gap-2">
        <FaCalendarAlt />
        <span>31 July 2025</span>
      </div>
    </div>
  </div>
  );
};

export default ClinicianDetails;