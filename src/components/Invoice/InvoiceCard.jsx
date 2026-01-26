import { FaCalendarAlt } from "react-icons/fa";

const InvoiceCard = ({
  month,
  year,
  assessmentCount,
  earnings,
  status,
  assessmentId,
  invoiceLink,
}) => {
  return (
    <div className="bg-[#0A48630D] p-5 rounded-xl flex justify-between items-center w-full mb-4 ">
      {/* Left Side */}
      <div className="flex flex-col">
        <div className="flex flex-row gap-2 items-center">
          <FaCalendarAlt className="text-lg text-gray-500" />
          <p className="text-sm font-semibold text-[#000000]">
            {month} {year}
          </p>
        </div>
        <div className="mt-3">
          <span className="font-normal text-sm">Assessment-Id : </span>
          <span className="text-xs">{assessmentId}</span> 
        </div>
        <div className="text-sm text-[#000000] flex gap-5 mt-1">
          <div>
            <span className="font-normal text-sm">Total Assessment</span>
            <span className="text-xs">{assessmentCount}</span>
          </div>
          <div>
            <span className="font-normal text-sm">Total Earnings</span>
           <span className="font-semibold text-xs"> £{earnings}</span> 
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-col items-center gap-4">
        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-3 py-1 rounded-full">
          {status}
        </span>
        <a
          href={`/invoice/${invoiceLink}`}
          className="text-[#114654] text-sm font-medium hover:underline"
        >
          View Invoice
        </a>
      </div>
    </div>
  );
};

export default InvoiceCard;
