
import { getAllappointments, updateSchedule } from "../../api/assessment";
import Header from "../../components/ui-reusable/Header";
import { formatDate } from "../../components/utils/formateDate";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { MdEditCalendar } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import { FaUserEdit } from "react-icons/fa";
import { PiVideoCameraBold } from "react-icons/pi";
import Modal from "../../components/ui-reusable/Modal";

const statusColors = {
  Confirmed: "bg-green-100 text-green-600",
  Rescheduled: "bg-orange-100 text-orange-600",
  Cancelled: "bg-red-100 text-red-600",
  Unknown: "bg-gray-100 text-gray-600",
};

const callStatusColors = {
  Active: "text-green-600",
  Escalated: "text-blue-600",
  Resolved: "text-purple-600",
  Dropped: "text-orange-600",
  Scheduled: "text-purple-600",
  Missed: "text-red-600",
};

const Appointments = () => {
  const { userData } = useContext(AuthContext) || {};
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [rescheduleModal, setRescheduleModal] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointment, setAppointment] = useState([]);
  const [notes, setNotes] = useState("");

  const fetchAppointments = async () => {
    const res = await getAllappointments();
    const rawData = res?.payload?.filter(
      (i) => i?.clinicianId === Number(userData?.id),
    );
    //console.log("appppp", rawData);
    setAppointment(rawData);
  };

  useEffect(() => {
    fetchAppointments();
  }, [userData?.id]);

  const closeModal = () => {
    setShowModal(false);
  };
  const closeRescheduleModal = () => {
    setRescheduleModal(false);
  };
  const closeFeedBackModal = () => {
    setFeedbackModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //console.log("reschedule", selectedAppointment);

    if (selectedAppointment?.tries >= 3) {
      alert(
        "This patient has already reached the maximum number of reschedules (3).",
      );
      return;
    }

    const payload = {
      userId: selectedAppointment?.userId,
      patientId: selectedAppointment?.patientId,
      time: appointmentDate,
      clinicianId: selectedAppointment?.clinicianId,
      status: "Rescheduled",
      metting_status: "Scheduled",
      tries: (selectedAppointment?.tries || 0) + 1,
    };

    //console.log("apppp", payload);

    const result = await updateSchedule(selectedAppointment?.id, payload);

    setRescheduleModal(false);
    fetchAppointments();
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();

    //console.log("reschedulefedd", selectedAppointment);

    // const payload = {
    //   diagnosis: diagnosis,
    //   notes_from_review: notes,
    // };

    // //console.log("appppfeed", payload);

    // const result = await updateSchedule(selectedAppointment?.id, payload);

    setFeedbackModal(false);
    fetchAppointments();
  };

  return (
    <div className="min-h-screen">
      <Header
        title="Appointment List"
        description="Your central hub for tracking assessments, reviewing patient insights, and managing your schedule"
      />

      <div className="">
        <table className="w-full text-center border-collapse">
          <thead className="">
            <tr>
              <th className="p-3">Patient Name</th>
              <th className="p-3">Appointment Status</th>
              <th className="p-3">Date</th>
              <th className="p-3">Call Status</th>
              <th className="p-3">No of Retries</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointment?.map((appt) => (
              <tr
                key={appt.id}
                className="border-b text-center text-gray-600 text-xs border-[#DFDFDF] hover:bg-gray-50"
              >
                <td className="p-3">{appt.patient?.name}</td>
                <td
                  className={`text-center text-xs mt-4 px-2 py-1 inline-block rounded-full ${statusColors[appt.status]}`}
                >
                  {appt.status}
                </td>
                <td className="p-3">{formatDate(appt.time)}</td>
                <td className={`p-3 ${callStatusColors[appt.metting_status]}`}>
                  {appt.metting_status}
                </td>
                <td className="p-3">{appt.tries}</td>
                <td>
                  <p className="flex justify-center items-center gap-4">
                    <Link
                      className=" cursor-pointer"
                      href={appt.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      <span>
                        <PiVideoCameraBold size={16} />
                      </span>
                    </Link>
                    <span>
                      <IoEyeSharp
                        className="cursor-pointer"
                        size={16}
                        onClick={() => {
                          setSelectedAppointment(appt);
                          setShowModal(true);
                        }}
                      />
                    </span>
                    <span>
                      <FaUserEdit
                        size={16}
                        className=" cursor-pointer"
                        onClick={() => {
                          setSelectedAppointment(appt);
                          setFeedbackModal(true);
                        }}
                      />
                    </span>
                    <span>
                      <MdEditCalendar
                        size={16}
                        className=" cursor-pointer"
                        onClick={() => {
                          setSelectedAppointment(appt);
                          setRescheduleModal(true);
                        }}
                      />
                    </span>
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>{/* <BasicTable/> */}</div>

      {selectedAppointment && (
        <Modal
          classname="w-[65vw] lg:w-[34vw] h-auto"
          isOpen={showModal}
          closeModal={closeModal}
          title="Appointment Details"
        >
          <div className="space-y-2 text-sm">
            <p>
              <strong>Patient Name:</strong> {selectedAppointment.displayName}
            </p>
            <p>
              <strong>Status:</strong> {selectedAppointment.status}
            </p>
            <p>
              <strong>Date:</strong> {formatDate(selectedAppointment.time)}
            </p>
            <p>
              <strong>Call Status:</strong> {selectedAppointment.metting_status}
            </p>
            <p>
              <strong>Tries:</strong> {selectedAppointment.tries}
            </p>
            <p>
              <strong>Diagnosis:</strong>{" "}
              {selectedAppointment.diagnosis ?? "N/A"}
            </p>
            <p>
              <strong>Notes:</strong>{" "}
              {selectedAppointment.notes_from_review ?? "N/A"}
            </p>
          </div>
        </Modal>
      )}

      {selectedAppointment && (
        <Modal
          classname="w-[65vw] lg:w-[34vw] h-auto"
          isOpen={rescheduleModal}
          closeModal={closeRescheduleModal}
          title="Reschedule Appointment"
        >
          <form onSubmit={handleSubmit} className="space-y-2 text-sm">
            <input
              type="datetime-local"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              className="w-full pl-4 pr-10 py-2 border border-[#E2E2E2] rounded bg-[#F9F9F9] text-sm text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-[#0A4863]"
            />
            <button
              className="w-full cursor-pointer bg-[#0A4863] text-white rounded-lg py-2 shadow"
              type="submit"
            >
              Submit
            </button>
          </form>
        </Modal>
      )}

      {selectedAppointment && (
        <Modal
          classname="w-[65vw] lg:w-[34vw] h-auto"
          isOpen={feedbackModal}
          closeModal={closeFeedBackModal}
          title="Post Appointment Feedback"
        >
          <form onSubmit={handleSubmitFeedback}>
            <label className="block font-medium text-sm text-[#3B3B3B] mb-2">
              Clinician Notes Post Consultation
            </label>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full h-36 rounded border border-[#E2E2E2] p-4 bg-gray-50 resize-none outline-none"
            />

            <div className="mt-2 mb-9">
              <button
                className="w-full cursor-pointer bg-[#0A4863] text-white rounded-lg py-2 shadow"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
export default Appointments;
