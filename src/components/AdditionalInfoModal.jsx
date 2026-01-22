
import { updateStatus } from "../api/assessment";
import Modal from "./ui-reusable/Modal";
import { AuthContext } from "../Provider/AuthProvider";
import { useContext, useState } from "react";

const AdditionalInfoModal = ({
  isModalOpen,
  closeModal,
  patientId,
  additionalInfo,
}) => {
  const [medName, setMedName] = useState("");
  const [meds, setMeds] = useState([]);
  const { userData } = useContext(AuthContext) || {};

  const addMedication = () => {
    if (!medName.trim()) return;

    setMeds((prev) => [...prev, { name: medName.trim() }]);
    setMedName("");
  };

  const removeMedication = (index) => {
    setMeds((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddInfo = async () => {
    if (meds.length === 0) return;

    const prevInfo = additionalInfo || "";
    const prevCount = prevInfo
      ? (prevInfo.match(/question-\d+:/g) || []).length
      : 0;

    const newFormattedString = meds
      .map((med, index) => `question-${prevCount + index + 1}: ${med.name}`)
      .join(", ");

    const updatedInfo = prevInfo
      ? `${prevInfo}, ${newFormattedString}`
      : newFormattedString;

    const obj = {
      additionalInfo: updatedInfo,
      clinicianId: userData?.id,
    };

    const result = await updateStatus(patientId, obj);
    //console.log("API response:", result);

    if (result) {
      setMeds([]);
      setMedName("");
      closeModal();
    }
  };

  return (
    <div>
      <Modal
        classname="w-[65vw] lg:w-[34vw] h-auto"
        isOpen={isModalOpen}
        closeModal={closeModal}
        title="Additional Information"
      >
        <div className="-mt-6">
          <p className="text-xs text-[#3C3C4399] font-normal">
            Your request for additional information has been sent to the
            patient. You will be notified once they respond.
          </p>

          <div className="mt-7">
            <input
              className="w-full bg-[#FFFFFF] border border-[#E1E1E1] rounded-2xl p-2 text-sm outline-none"
              placeholder="Write your question here"
              value={medName}
              onChange={(e) => setMedName(e.target.value)}
              //   onKeyDown={(e) => e.key === "Enter" && addMedication()}
            />
            <div className="flex justify-end -mt-[35px] mr-1">
              <button
                type="button"
                onClick={addMedication}
                className="cursor-pointer bg-[#114654] rounded-3xl text-white px-3 py-1.5 text-sm"
              >
                Add
              </button>
            </div>

            <div className="mt-5 mb-2">
              {meds.map((med, index) => (
                <div
                  key={index}
                  className="border border-[#E2E2E2] rounded-lg text-sm text-[#000000CC] px-3 py-1 mt-2 mr-2"
                >
                  <div className="flex justify-between p-2">
                    <p>{`${index + 1}. ${med.name}`}</p>
                    <button
                      onClick={() => removeMedication(index)}
                      className="ml-2 text-red-600 hover:text-gray-700"
                    >
                      &times;
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleAddInfo}
              className="cursor-pointer w-full font-normal bg-[#114654] rounded-3xl text-white px-3 py-1.5 text-sm"
            >
              Send to patient
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdditionalInfoModal;
