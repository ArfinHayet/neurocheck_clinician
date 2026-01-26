import {
  addClinicianAvailabilty,
  getCinicianAvailabilityById,
} from "../api/user";
import { AuthContext } from "../Provider/AuthProvider";
// import { AuthContext } from "../Provider/AuthProvider";
// import { AuthContext } from "../Provider/AuthProvider";
import { useContext, useEffect, useState } from "react";

const Availability = () => {
  const { userData } = useContext(AuthContext) || {};
  const [availabilityType, setAvailabilityType] = useState("Select");
  // const [leaves, setLeaves] = useState([]);
  const [timeSlots, setTimeSlots] = useState([
    {
      day: "Saturday",
      start: "",
      end: "",
    },
  ]);

  const availabilityTypes = ["Select", "All day", "Specific day"];
  const days = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  const to12HourFormat = (time24) => {
    let [hour, minute] = time24.split(":").map(Number);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")} ${ampm}`;
  };

  const formatTime = (t) => {
    // If already has seconds, return as is
    if (t.length === 8) return t;
    return t + ":00";
  };

  const handleAddSlot = () => {
    setTimeSlots([...timeSlots, { day: "Saturday", start: "", end: "" }]);
  };

  const handleSlotChange = (index, field, value) => {
    const newSlots = [...timeSlots];
    newSlots[index][field] = value;
    setTimeSlots(newSlots);
  };

  const handleAddLeave = async () => {
    if (availabilityType === "Select") return;

    const validSlots = timeSlots.filter((slot) => slot.start && slot.end);

    if (validSlots.length === 0) return;

    const payload = validSlots.map((slot) => ({
      availabilityType:
        availabilityType === "All day" ? "all_day" : "specific_day",
      day: slot.day,
      time: formatTime(slot.start),
      endTime: formatTime(slot.end),
      userId: String(userData?.id),
    }));

    //console.log("Payload:", payload);

    const result = await addClinicianAvailabilty(payload);
    //console.log("API Result:", result);

    getAvailability();
    // setLeaves((prev) => [...prev, ...validSlots]);
    setAvailabilityType("Select");
    setTimeSlots([{ day: "Saturday", start: "", end: "" }]);
  };

  const [availability, setAvailability] = useState([]);
  const getAvailability = async () => {
    const data = await getCinicianAvailabilityById(userData?.id);
    //console.log(data?.payload);
    setAvailability(data?.payload);
  };

  useEffect(() => {
    getAvailability();
  }, [userData?.id]);

  return (
    <div className="w-full flex flex-row gap-6 px-8">
      <div className="w-3/6 flex flex-col gap-4  space-y-4">
        <div>
          <label className="block mb-4 text-[#5A5A5A] font-semibold text-sm">
            Availability type
          </label>
          <select
            className="w-full border outline-none text-sm text-[#5A5A5A] border-[#E1E1E1]  rounded p-2"
            value={availabilityType}
            onChange={(e) => setAvailabilityType(e.target.value)}
          >
            {availabilityTypes.map((type) => (
              <option className="text-xs" key={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {(availabilityType === "All day" ||
          availabilityType === "Specific day") &&
          timeSlots.map((slot, index) => (
            <div key={index} className="flex gap-2">
              {availabilityType === "Specific day" && (
                <select
                  className="border text-sm text-[#5A5A5A] outline-none border-[#E1E1E1] rounded p-2"
                  value={slot.day}
                  onChange={(e) =>
                    handleSlotChange(index, "day", e.target.value)
                  }
                >
                  {days.map((day) => (
                    <option key={day}>{day}</option>
                  ))}
                </select>
              )}

              {/* Time inputs */}
              <input
                type="time"
                className="flex-1 border text-sm text-[#5A5A5A] outline-none border-[#E1E1E1] rounded p-2"
                value={slot.start}
                onChange={(e) =>
                  handleSlotChange(index, "start", e.target.value)
                }
              />
              <input
                type="time"
                className="flex-1 border text-sm text-[#5A5A5A] outline-none border-[#E1E1E1] rounded p-2"
                value={slot.end}
                onChange={(e) => handleSlotChange(index, "end", e.target.value)}
              />

              {/* Plus button only for Specific day */}
              {availabilityType === "Specific day" &&
                index === timeSlots.length - 1 && (
                  <button
                    type="button"
                    className="px-4 py-2 border border-[#E1E1E1] rounded bg-gray-100 hover:bg-gray-200"
                    onClick={handleAddSlot}
                  >
                    +
                  </button>
                )}
            </div>
          ))}

        <div className="flex justify-center">
          <button
            type="button"
            className="bg-[#0A4863] text-sm w-full text-white p-2 rounded-4xl"
            onClick={handleAddLeave}
          >
            Add Availability
          </button>
        </div>
      </div>

      {/* Right Table */}
      <div className="w-3/6 mt-[4.5rem] flex justify-center">
        {availability?.length === 0 ? (
          <p className="text-gray-500">No data available</p>
        ) : (
          <table className="min-w-full border border-[#E1E1E1] text-sm">
            <thead className="bg-gray-50 text-left text-[#5A5A5A] font-semibold">
              <tr className="border-[#E1E1E1]">
                <th className="p-2 border border-[#E1E1E1]">Day</th>
                <th className="p-2 border border-[#E1E1E1]">Start</th>
                <th className="p-2 border border-[#E1E1E1]">End</th>
              </tr>
            </thead>
            <tbody>
              {availability?.map((leave) => (
                <tr key={leave?.id} className="border-t border-[#E1E1E1]">
                  <td className="p-2 border border-[#E1E1E1]">{leave?.day}</td>
                  <td className="p-2 border border-[#E1E1E1]">{leave?.time}</td>
                  <td className="p-2 border border-[#E1E1E1]">
                    {leave?.endTime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Availability;
