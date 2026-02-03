import {
  AlertCircle,
  Calendar,
  CheckCircle,
  DollarSign,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

const StatCard = ({
  title,
  value,
  change,
  icon: Icon,
  trend,
  color = "blue",
  subtitle,
}) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-600">{title}</p>
        <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
        {subtitle && (
          <p className="text-xs text-slate-500 mt-1 p-1.5 bg-gray-50 rounded-full">
            {subtitle}
          </p>
        )}
        {change && (
          <div
            className={`flex items-center mt-2 text-sm ${
              trend === "up" ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend === "up" ? (
              <ArrowUp className="w-4 h-4 mr-1" />
            ) : (
              <ArrowDown className="w-4 h-4 mr-1" />
            )}
            <span className="font-medium">{change}</span>
            <span className="text-slate-500 ml-1">vs last month</span>
          </div>
        )}
      </div>
      <div
        className={`p-3 rounded-full ${
          color === "orange"
            ? "bg-orange-50"
            : color === "blue"
              ? "bg-blue-50"
              : color === "green"
                ? "bg-green-50"
                : "bg-purple-50"
        }`}
      >
        <Icon
          className={`w-6 h-6 ${
            color === "orange"
              ? "text-orange-600"
              : color === "blue"
                ? "text-blue-600"
                : color === "green"
                  ? "text-green-600"
                  : "text-purple-600"
          }`}
        />
      </div>
    </div>
  </div>
);

const StatsSection = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
      <StatCard
        title="Pending Reviews"
        value={stats.pendingReviews}
        icon={AlertCircle}
        color="orange"
      />
      <StatCard
        title="Today's Appointments"
        value={stats.upcomingAppointments}
        icon={Calendar}
        color="blue"
        subtitle="Next at 14:30"
      />
      <StatCard
        title="January Earnings"
        value={`£${stats.monthlyEarnings}`}
        change="+12.5%"
        trend="up"
        icon={DollarSign}
        color="green"
      />
      <StatCard
        title="Completed Cases"
        value={stats.completedToday}
        icon={CheckCircle}
        color="purple"
        subtitle={`Avg. ${stats.avgResponseTime} response`}
      />
    </div>
  );
};

export default StatsSection;
