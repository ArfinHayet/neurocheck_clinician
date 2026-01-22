import { getSubmissionByClinicianId } from "../../api/assessment"; 
import InvoiceCard from "../../components/Invoice/InvoiceCard";
import { AuthContext } from "../../Provider/AuthProvider";
import { useContext, useEffect, useState } from "react";

const Invoice = () => {
  const [invoice, setInvoice] = useState([]);
  const { userData } = useContext(AuthContext) || {}; // safe access

  const groupInvoices = (invoices) => {
    const grouped = {};

    invoices?.forEach((item) => {
      const date = new Date(item.createdAt);
      const month = date.toLocaleString("default", { month: "long" });
      const year = date.getFullYear();
      const key = `${month}-${year}-${item.assessmentId}`;

      if (!grouped[key]) {
        grouped[key] = {
          month,
          year,
          assessmentId: item.assessmentId,
          assessmentName: item.assessment?.name,
          assessmentCount: 0,
          totalPaidAmount: 0,
        };
      }

      grouped[key].assessmentCount += 1;
      grouped[key].totalPaidAmount += item.paidAmount || 0;
    });

    return Object.values(grouped);
  };

  const getInvoice = async () => {
    if (!userData?.id) return;
    const data = await getSubmissionByClinicianId(userData.id);
    const groupedData = groupInvoices(data?.payload || []);
    setInvoice(groupedData);
  };

  useEffect(() => {
    if (userData?.id) {
      getInvoice();
    }
  }, [userData?.id]);

  // render loading if userData not yet ready
  if (!userData?.id) return <div>Loading...</div>;

  return (
    <div>
      {invoice?.length > 0 ? (
        invoice.map((item, i) => (
          <InvoiceCard
            key={i}
            month={item.month}
            year={item.year}
            assessmentId={item.assessmentId}
            assessmentCount={item.assessmentCount}
            earnings={item.totalPaidAmount}
            status="Pending"
            invoiceLink={`${item.assessmentId}`}
          />
        ))
      ) : (
        <div>No invoices found</div>
      )}
    </div>
  );
};

export default Invoice;
