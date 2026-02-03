
import Header from "./ui-reusable/Header";

const Guidelines = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 ">
      {/* Page Header */}
      <Header
        title="Clinical Guidelines"
        description="View and follow the Neurocheck Pro clinician guidelines"
      />

      {/* Content Area */}
      <div className="mx-auto">
        <div className="bg-white overflow-hidden">
          {/* PDF Viewer */}
          <iframe
            src="/Neurocheck-Pro-Clinician-Guideline.pdf"
            title="Guidelines PDF"
            className="w-full h-[86.8vh]"
          />
        </div>
      </div>
    </div>
  );
};

export default Guidelines;
