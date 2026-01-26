import { useState, useRef, useEffect } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { getAge } from "../utils/ageConverter";
import { timeConverter } from "../utils/timeconverter";

const AssessmentCard = ({
  name,
  age,
  timeAgo,
  status,
  childCondition,
  description,
  onViewFullAssessment,
  onRateSummary,
  onAcceptCase,
  onDeclineCase,
  ratings,
  patientId,
  assessmentId,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const colors = {
    completed: "bg-green-100 text-green-700 border-green-200",
    pending: "bg-orange-100 text-orange-700 border-orange-200",
    rejected: "bg-red-100 text-red-700 border-red-200",
  };

  const statusKey =
    status && status.trim() !== "" ? status.toLowerCase() : "pending";
  const statusClass = colors[statusKey] || colors.pending;

  const handleCardClick = () => {
    navigate(`/assessment/${patientId}/${assessmentId}`);
  };

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4 flex-1">
          {/* Avatar with initials */}
          {/* <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
            {name
              ?.split(" ")
              .map((n) => n[0])
              .join("") || "NA"}
          </div> */}
          <img className=""/>

          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              {/* Clickable name */}
              <h2
                onClick={handleCardClick}
                className="font-semibold text-slate-900 cursor-pointer hover:text-blue-600 transition-colors"
              >
                {name}
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusClass}`}
              >
                {status && status.trim() !== ""
                  ? status.toUpperCase()
                  : "PENDING"}
              </span>
              {ratings && (
                <span className="px-2 py-1 bg-amber-50 text-amber-700 rounded-md text-xs font-medium">
                  ⭐ {ratings}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {getAge(age)} years • {timeConverter(timeAgo)}
            </p>

            {/* Content - clickable area */}
            <div onClick={handleCardClick} className="mt-3 cursor-pointer">
              <p className="font-semibold text-sm text-slate-900">
                {childCondition}
              </p>
              <p className="text-slate-600 text-xs mt-1 line-clamp-2">
                {description}
              </p>
            </div>
          </div>
        </div>

        {/* Three-dot menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="p-2 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            aria-label="More options"
          >
            <FiMoreVertical size={20} className="text-slate-600" />
          </button>

          {menuOpen && (
            <div
              role="menu"
              className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 z-20 overflow-hidden"
            >
              {status !== "completed" && (
                <>
                  <button
                    onClick={() => {
                      onAcceptCase?.();
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-green-50 cursor-pointer text-sm text-slate-700 hover:text-green-700 font-medium transition-colors border-b border-slate-100"
                    role="menuitem"
                  >
                     Accept this case
                  </button>
                  <button
                    onClick={() => {
                      onDeclineCase?.();
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-red-50 cursor-pointer text-sm text-slate-700 hover:text-red-700 font-medium transition-colors"
                    role="menuitem"
                  >
                     Decline this case
                  </button>
                </>
              )}
              {status === "completed" && (
                <p className="px-4 py-3 text-sm text-slate-500 text-center">
                  Case completed
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssessmentCard;
