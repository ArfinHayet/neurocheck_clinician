import { FileText, Calendar, Video, Activity } from "lucide-react";

const QuickActionCard = ({ icon: Icon, title, description, color }) => (
  <button
    className={`p-4 rounded-xl border-2 border-dashed transition-all text-left w-full group ${
      color === "blue"
        ? "border-blue-200 bg-blue-50 hover:bg-blue-100"
        : color === "green"
        ? "border-green-200 bg-green-50 hover:bg-green-100"
        : color === "purple"
        ? "border-purple-200 bg-purple-50 hover:bg-purple-100"
        : "border-orange-200 bg-orange-50 hover:bg-orange-100"
    }`}
  >
    <Icon
      className={`w-6 h-6 mb-2 group-hover:scale-110 transition-transform ${
        color === "blue"
          ? "text-blue-600"
          : color === "green"
          ? "text-green-600"
          : color === "purple"
          ? "text-purple-600"
          : "text-orange-600"
      }`}
    />
    <h3
      className={`font-semibold text-sm ${
        color === "blue"
          ? "text-blue-900"
          : color === "green"
          ? "text-green-900"
          : color === "purple"
          ? "text-purple-900"
          : "text-orange-900"
      }`}
    >
      {title}
    </h3>
    <p
      className={`text-xs mt-1 ${
        color === "blue"
          ? "text-blue-700"
          : color === "green"
          ? "text-green-700"
          : color === "purple"
          ? "text-purple-700"
          : "text-orange-700"
      }`}
    >
      {description}
    </p>
  </button>
);

const QuickActionsSection = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
      <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <QuickActionCard
          icon={FileText}
          title="Review Assessment"
          description="Check pending submissions"
          color="blue"
        />
        <QuickActionCard
          icon={Calendar}
          title="Schedule Appointment"
          description="Review consultation"
          color="green"
        />
        <QuickActionCard
          icon={Video}
          title="Start Call"
          description="Begin video consultation"
          color="purple"
        />
        <QuickActionCard
          icon={Activity}
          title="View Invoice"
          description="View Appointment's Invoice"
          color="orange"
        />
      </div>
    </div>
  );
};

export default QuickActionsSection;

