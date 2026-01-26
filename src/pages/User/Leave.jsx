

import { useContext, useEffect, useState } from "react";
import Modal from "../../components/ui-reusable/Modal";
import { addClinicianLeave, getLeavesById } from "../../api/user";

import { formatDate } from "../../components/utils/formateDate";
import { AuthContext } from "../../Provider/AuthProvider";

const Leave = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const availabilityTypes = ["Select", "Multiple day", "Single day"];
  const [timeSlots, setTimeSlots] = useState([{ start: "", end: "" }]);
  const [leaves, setLeaves] = useState([]);
  const [leaveType, setLeaveType] = useState("Select");
  const { userData } = useContext(AuthContext) || {};
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSlotChange = (index, field, value) => {
    const updatedSlots = [...timeSlots];
    updatedSlots[index][field] = value;
    setTimeSlots(updatedSlots);
  };

  const handleSubmit = async () => {
    if (leaveType === "Select") return;

    const slot = timeSlots.find((s) => s.start && s.end);
    if (!slot) return;

    const payload = {
      leaveType:
        leaveType === "Single day"
          ? "single_day"
          : leaveType === "Multiple day"
            ? "multiple_day"
            : "unknown",
      startDate: slot.start,
      endDate: slot.end,
      userId: userData?.id,
      status: "pending",
    };

    //console.log("Payload to submit:", payload);

    const result = await addClinicianLeave(payload);
    if (result) {
      setTimeSlots([{ start: "", end: "" }]);
      setLeaveType("Select");
      setIsModalOpen(false);
    }
  };

  ////// fetch leaves ///////
  // const [leaves, setLeaves] = useState([])
  const ClinicianLeaves = async () => {
    const result = await getLeavesById(userData?.id);
    setLeaves(result?.payload);
  };

  useEffect(() => {
    ClinicianLeaves();
  }, [userData?.id]);

  return (
    <div classname="mx-8">
      <div className="flex justify-end mb-4 ">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#0A4863] text-xs cursor-pointer text-white rounded-2xl px-4 py-2"
        >
          Add leave
        </button>
      </div>

      {/* ✅ Plain table without any package */}
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#E0E0E0]">
            <th className=" px-3 py-2 text-left">Leave type</th>
            <th className=" px-3 py-2 text-left">Start time</th>
            <th className=" px-3 py-2 text-left">End time</th>
          </tr>
        </thead>
        <tbody>
          {leaves?.length > 0 ? (
            leaves?.map((row, i) => (
              <tr key={i}>
                <td className=" px-3 py-2">{row.leaveType}</td>
                <td className=" px-3 py-2">{formatDate(row.startDate)}</td>
                <td className=" px-3 py-2">{formatDate(row.endDate)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="3"
                className="border border-gray-300 px-3 py-2 text-center text-gray-500"
              >
                No leaves added yet
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal */}
      <Modal
        classname="w-[30vw] h-auto"
        isOpen={isModalOpen}
        closeModal={closeModal}
        title="Add leave"
      >
        <p className="-mt-7 text-xs text-[#3C3C4399]">
          Schedule your time off. Let us know when you’ll be unavailable so we
          can keep things running smoothly.
        </p>

        <div className="flex flex-col gap-3">
          <div>
            <label className="block mb-4 text-[#5A5A5A] font-semibold text-sm">
              Leave type
            </label>
            <select
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              className="w-full border outline-none text-sm text-[#5A5A5A] border-[#E1E1E1] p-3 rounded-xl"
            >
              {availabilityTypes.map((type) => (
                <option className="text-xs" key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Time slot inputs */}
        {timeSlots.map((slot, index) => (
          <div key={index} className="flex gap-2 mt-2">
            <input
              type="date"
              className="flex-1 border text-sm text-[#5A5A5A] outline-none border-[#E1E1E1] rounded-xl p-2"
              value={slot.start}
              onChange={(e) => handleSlotChange(index, "start", e.target.value)}
            />
            <input
              type="date"
              className="flex-1 border text-sm text-[#5A5A5A] outline-none border-[#E1E1E1] rounded-xl p-2"
              value={slot.end}
              onChange={(e) => handleSlotChange(index, "end", e.target.value)}
            />

            {/* {index === timeSlots.length - 1 && (
              <button
                type="button"
                className="px-4 py-2 border border-[#E1E1E1] rounded bg-gray-100 hover:bg-gray-200"
                onClick={handleAddSlot}
              >
                +
              </button>
            )} */}
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="bg-[#0A4863] w-full mt-4 rounded-2xl text-sm p-2 text-white"
        >
          Submit
        </button>
      </Modal>
    </div>
  );
};

export default Leave;
