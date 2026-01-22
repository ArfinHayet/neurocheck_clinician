

import { useState, useRef, useEffect } from "react";
import { FiMoreVertical } from "react-icons/fi";
import p1 from "../../../public/svg/user-img.svg";
import { Link } from "react-router-dom";
import { getAge } from "../utils/ageConverter";
import { timeConverter } from "../utils/timeconverter";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
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
  ratings,
  patientId,
  assessmentId,
}) => {
  // //console.log("answers",timeAgo)
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

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
    completed: "bg-[#EBF6EC] text-[#4CAF50]",
    pending: "bg-yellow-100 text-yellow-800",
    rejected: "bg-red-100 text-red-800",
  };

  const statusKey =
    status && status.trim() !== "" ? status.toLowerCase() : "pending";
  const statusClass = colors[statusKey] || colors.pending;

  const generateConsultancyReport = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });

    let y = 40;

    // ------------------- TITLE -------------------
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor("#171717");
    doc.text("Report Structure ADHD Adult", 40, y);

    y += 25;

    // ------------------- TABLE DATA -------------------
    const tableData = [
      ["Patient Name", "XX YY"],
      ["Age", "YY"],
      ["Demographics", "XX"],
      ["Clinician Diagnosis", ""],
      ["Clinician Notes from Review", ""],
      ["Clinician Notes Post Consultation", ""],
      ["Diagnosis Recommendation", "Exhibits ADHD type XX / YY / ZZ"],
    ];

    autoTable(doc, {
      startY: y,
      head: [],
      body: tableData,
      theme: "grid",

      styles: {
        fontSize: 11,
        cellPadding: 10,
        valign: "middle",
      },

      columnStyles: {
        0: { cellWidth: 150, fontStyle: "bold" },
        1: { cellWidth: 350 },
      },

      tableWidth: 500,
    });

    // After table ends
    y = doc.lastAutoTable.finalY + 30;

    // ------------------- NORMAL SECTIONS -------------------
    const leftX = 40;

    const writeSection = (title, text) => {
      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.text(title, leftX, y);
      y += 15;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);

      const wrapped = doc.splitTextToSize(text, 500);
      doc.text(wrapped, leftX, y);
      y += wrapped.length * 12 + 15;
    };

    writeSection("Medical History Summary", "Lorem ipsum dolor sit amet...");
    writeSection("ASRS Summary", "Key areas rated very often...");
    writeSection("Weiss Rating Summary", "# of items scored 2 or 3...");
    writeSection("DIVA Summary", "# of childhood/adulthood criteria met...");

    // ------------------- SAVE PDF -------------------
    doc.save("consultancy-report.pdf");
  };

  return (
    <div className="bg-[#FFFFFF] rounded-lg p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4">
          <img
            src={p1}
            alt={name || "User"}
            height={40}
            width={40}
            className="w-10 h-10 rounded-full"
            priority
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-semibold">{name}</h2>
              <span
                className={`px-2 py-0.5 md:block hidden rounded-md text-xs ${statusClass}`}
              >
                {/* {(status || "").toUpperCase()} */}
                {status && status.trim() !== ""
                  ? status.toUpperCase()
                  : "PENDING"}
              </span>
            </div>
            <p className="text-xs text-gray-500">
              {getAge(age)} years • {timeConverter(timeAgo)}
            </p>
          </div>
        </div>

        {/* Three-dot menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="p-1 rounded hover:bg-gray-100 cursor-pointer"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            aria-label="More options"
          >
            <FiMoreVertical size={20} />
          </button>

          {menuOpen && (
            <div
              role="menu"
              className="absolute right-0 mt-2 w-48 bg-white rounded shadow-md z-10"
            >
             
              

              {status !== "completed" && (
                <button
                  onClick={() => {
                    onAcceptCase?.();
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 cursor-pointer text-sm text-[#114654]"
                  role="menuitem"
                >
                  Accept this case
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <Link
        className="no-underline"
        href={`/assessment/${patientId}/${assessmentId}`}
      >
        <div className="flex-1 mt-5">
          <div className="flex flex-row gap-2">
            <p className="font-semibold text-sm mt-2 text-[#4B4B4B]">
              {childCondition}
            </p>
            <p
              className={`px-2 py-0.5 mt-[10px] md:hidden rounded-md text-xs ${statusClass}`}
            >
              {(status || "").toUpperCase()}
            </p>
            <p className="px-2 py-0.5 mt-[8px]  rounded-md text-xs ">
              rating:{ratings}
            </p>
          </div>
          <p className="text-[#3C3C4399] text-xs mt-1">{description}</p>
        </div>
      </Link>
    </div>
  );
};

export default AssessmentCard;
