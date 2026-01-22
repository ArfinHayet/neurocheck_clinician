import AssessmentTable from "../../components/Invoice/AssessmentTable";
import ClinicianDetails from "../../components/Invoice/ClinicianDetails";
import InvoiceHeader from "../../components/Invoice/InvoiceHeader";
import { useParams } from "react-router-dom";

const InvoiceDetails = () => {
  const { assessmentId } = useParams();

  if (!assessmentId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">Loading invoice details...</p>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-0 text-gray-800">
      <InvoiceHeader />
      <ClinicianDetails />
      <AssessmentTable assessmentId={assessmentId} />
    </div>
  );
};

export default InvoiceDetails;
