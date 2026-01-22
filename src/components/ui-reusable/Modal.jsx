import { useRef } from "react";
import { RxCross2 } from "react-icons/rx";

const Modal = ({ isOpen, closeModal, children, classname, title }) => {
  const modalRef = useRef(null);

  return (
    isOpen && (
      <div
        className="fixed z-20 inset-0 min-h-screen flex justify-center items-center bg-[#BBBBBB4D] bg-opacity-50"
        onClick={closeModal}
      >
        <div
          ref={modalRef}
          onClick={(e) => e.stopPropagation()}
          className={`bg-[#FFFFFF] flex flex-col gap-5 p-6 rounded-lg shadow-lg ${classname}`}
        >
          <div className="flex flex-row justify-between mb-4">
            <p className="text-xl font-semibold text-[#000000]">{title}</p>
            <button onClick={closeModal} className="cursor-pointer">
              <RxCross2 className="text-xl " />
            </button>
          </div>

          {children}
        </div>
      </div>
    )
  );
};

export default Modal;