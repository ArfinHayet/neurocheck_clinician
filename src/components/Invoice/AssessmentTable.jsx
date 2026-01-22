import { useState } from "react";

const assessments = [
  { name: "Alfie Thompson", date: "2 August, 2025", category: "Child ADHD Diagnosis", amount: "130.99" },
  { name: "Harry Walker", date: "2 August, 2025", category: "Adult ADHD Diagnosis", amount: "130.99" },
  { name: "Oliver Benett", date: "2 August, 2025", category: "Child ADHD Diagnosis", amount: "130.99" },
  { name: "Oliver Hughes", date: "2 August, 2025", category: "Child ADHD Diagnosis", amount: "130.99" },
  { name: "Noah Bennett", date: "2 August, 2025", category: "Adult ADHD Diagnosis", amount: "130.99" },
  { name: "Freya Clarke", date: "2 August, 2025", category: "Child ADHD Diagnosis", amount: "130.99" },
];

const AssessmentTable = ({ assessmentId }) => {
  const [patient, setPatient] = useState([])
  

  const total = assessments.reduce((sum, a) => sum + parseFloat(a.amount), 0).toFixed(2);

  return (
    <div className=" p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-[#000000] mb-4">Assessment Summary</h3>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className=" text-sm font-medium text-[#000000]">
            <tr>
              <th className="py-2">Patient’s name</th>
              <th className="py-2">Date</th>
              <th className="py-2">Assessment category</th>
              <th className="py-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {assessments?.map((item, idx) => (
              <tr key={idx} className="border-b text-[#606060] border-b-[#DFDFDF]">
                <td className="py-2">{item.name}</td>
                <td className="py-2">{item.date}</td>
                <td className="py-2">{item.category}</td>
                <td className="py-2 text-right">£ {item.amount}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" className="py-2 text-right font-semibold">Total</td>
              <td className="py-2 text-right font-semibold">£ {total}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default AssessmentTable;
