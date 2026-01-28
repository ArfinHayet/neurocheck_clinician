import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import StatsSection from "../../components/Dashboard/StatsSection";
import AppointmentSection from "../../components/Dashboard/AppointmentSection";
import Insights from "../../components/Dashboard/Insights";

const Dashboard = () => {
  const { userData, handleLogout } = useContext(AuthContext) || {};
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef(null);

  const navigate = useNavigate();
  // const [recentSubmissions, setRecentSubmissions] = useState([]);
  // const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  const [stats, setStats] = useState({
    pendingReviews: 0,
    upcomingAppointments: 0,
    monthlyEarnings: 0,
    totalEarnings: 0,
    monthlyAssessments: 0,
    totalAssessments: 0,
    completedToday: 0,
    avgResponseTime: "0h",
  });

  const [recentSubmissions, setRecentSubmissions] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  useEffect(() => {
    // Mock data - Replace with actual API calls
    setStats({
      pendingReviews: 4,
      upcomingAppointments: 3,
      monthlyEarnings: 1250,
      totalEarnings: 15420,
      monthlyAssessments: 12,
      totalAssessments: 65,
      completedToday: 2,
      avgResponseTime: "2.5h",
    });

    setRecentSubmissions([
      {
        id: 1,
        patientName: "Oliver Bennett",
        assessmentType: "ADHD Assessment",
        age: 15,
        submittedAt: "2h ago",
        status: "pending",
        urgency: "normal",
      },
      // ... more submissions
    ]);

    setUpcomingAppointments([
      {
        id: 1,
        patientName: "Sarah Mitchell",
        condition: "ADHD Follow-up",
        date: "Today",
        time: "14:30",
        status: "confirmed",
        duration: "45min",
      },
      // ... more appointments
    ]);
  }, []);

  

  // Close tooltip on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setShowTooltip(false);
      }
    };

    if (showTooltip) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showTooltip]);

  const toggleTooltip = () => {
    setShowTooltip((prev) => !prev);
  };

  // const handleLogoutClick = () => {
  //   //console.log("Logging out...");
  //   setShowTooltip(false);
  //   localStorage.removeItem("accessToken");
  //   navigation.replace("/signin");
  // };
const handleLogoutClick = () => {
  handleLogout(); 
  navigate("/signin", { replace: true }); 
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      <DashboardHeader
        userData={userData}
        stats={stats}
        onLogout={handleLogoutClick}
      />

      <div className="max-w-7xl mx-auto px-6 py-6">
        <StatsSection stats={stats} />
        <AppointmentSection
          recentSubmissions={recentSubmissions}
          upcomingAppointments={upcomingAppointments}
          onReviewClick={(item) => navigate(`/assessment/${item.id}`)}
          onJoinCall={(apt) => window.open(apt.link, "_blank")}
        />

        <Insights stats={stats} />
      </div>
    </div>
  );
};;

export default Dashboard;


// import React, { useState, useEffect } from "react";
// import { AiOutlinePoweroff } from "react-icons/ai";
// import {
//   Calendar,
//   Clock,
//   Users,
//   FileText,
//   TrendingUp,
//   Video,
//   CheckCircle,
//   AlertCircle,
//   ArrowUp,
//   ArrowDown,
//   DollarSign,
//   Activity,
//   Bell,
//   Search,
// } from "lucide-react";

// const Dashboard = () => {
//   const [loading, setLoading] = useState(false);

//   const [stats, setStats] = useState({
//     pendingReviews: 0,
//     upcomingAppointments: 0,
//     monthlyEarnings: 0,
//     totalEarnings: 0,
//     monthlyAssessments: 0,
//     totalAssessments: 0,
//     completedToday: 0,
//     avgResponseTime: "0h",
//   });

//   const [recentSubmissions, setRecentSubmissions] = useState([]);
//   const [upcomingAppointments, setUpcomingAppointments] = useState([]);

//   // Load data on mount - Replace with your actual API calls
//   useEffect(() => {
//     // TODO: Replace with actual API calls
//     // const loadData = async () => {
//     //   const clinicianId = localStorage.getItem('clinicianId');
//     //   const submissions = await fetch(`YOUR_API/submissions?clinicianId=${clinicianId}`);
//     //   const appointments = await fetch(`YOUR_API/appointments?limit=1000`);
//     // };

//     //   const loadData = async () => {
//     //     const clinicianId = localStorage.getItem("clinicianId");
//     //       const submissions = await getAllsubmissions();
//     //     const appointments = await getAllappointments();

//         // Data process করুন
//     //     setStats({
//     //       pendingReviews: submissions.filter((s) => s.status === "pending")
//     //         .length,
//     //       // ... other stats
//     //     });
//     //   };

//     //   loadData();
//     // }, []);

//     // Mock data for demo
//     setStats({
//       pendingReviews: 4,
//       upcomingAppointments: 3,
//       monthlyEarnings: 1250,
//       totalEarnings: 15420,
//       monthlyAssessments: 12,
//       totalAssessments: 65,
//       completedToday: 2,
//       avgResponseTime: "2.5h",
//     });

//     setRecentSubmissions([
//       {
//         id: 1,
//         patientName: "Oliver Bennett",
//         assessmentType: "ADHD Assessment",
//         age: 15,
//         submittedAt: "2h ago",
//         status: "pending",
//         urgency: "normal",
//       },
//       {
//         id: 2,
//         patientName: "Emma Thompson",
//         assessmentType: "Anxiety Review",
//         age: 28,
//         submittedAt: "4h ago",
//         status: "accepted",
//         urgency: "normal",
//       },
//       {
//         id: 3,
//         patientName: "James Wilson",
//         assessmentType: "Depression Screen",
//         age: 42,
//         submittedAt: "6h ago",
//         status: "pending",
//         urgency: "high",
//       },
//       {
//         id: 4,
//         patientName: "Sarah Mitchell",
//         assessmentType: "PTSD Evaluation",
//         age: 35,
//         submittedAt: "1d ago",
//         status: "in_review",
//         urgency: "normal",
//       },
//       {
//         id: 5,
//         patientName: "David Chen",
//         assessmentType: "OCD Assessment",
//         age: 31,
//         submittedAt: "1d ago",
//         status: "completed",
//         urgency: "low",
//       },
//     ]);

//     setUpcomingAppointments([
//       {
//         id: 1,
//         patientName: "Sarah Mitchell",
//         condition: "ADHD Follow-up",
//         date: "Today",
//         time: "14:30",
//         status: "confirmed",
//         duration: "45min",
//       },
//       {
//         id: 2,
//         patientName: "David Chen",
//         condition: "Initial Consultation",
//         date: "Today",
//         time: "16:00",
//         status: "confirmed",
//         duration: "60min",
//       },
//       {
//         id: 3,
//         patientName: "Lisa Anderson",
//         condition: "Medication Review",
//         date: "Tomorrow",
//         time: "10:00",
//         status: "pending",
//         duration: "30min",
//       },
//       {
//         id: 4,
//         patientName: "Michael Brown",
//         condition: "Therapy Session",
//         date: "Aug 15",
//         time: "15:30",
//         status: "confirmed",
//         duration: "50min",
//       },
//     ]);
//   }, []);

//   const StatCard = ({
//     title,
//     value,
//     change,
//     icon: Icon,
//     trend,
//     color = "blue",
//     subtitle,
//   }) => (
//     <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
//       <div className="flex items-start justify-start">
//         <div className="flex-1">
//           <p className="text-sm font-medium text-slate-600">{title}</p>
//           <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
//           {subtitle && (
//             <p className="text-xs text-slate-500 mt-1 p-1.5  bg-gray-50 rounded-full">{subtitle}</p>
//           )}
//           {change && (
//             <div
//               className={`flex items-center mt-2 text-sm ${trend === "up" ? "text-green-600" : "text-red-600"}`}
//             >
//               {trend === "up" ? (
//                 <ArrowUp className="w-4 h-4 mr-1" />
//               ) : (
//                 <ArrowDown className="w-4 h-4 mr-1" />
//               )}
//               <span className="font-medium">{change}</span>
//               <span className="text-slate-500 ml-1">vs last month</span>
//             </div>
//           )}
//         </div>
//         <div
//           className={`p-3 rounded-lg ${
//             color === "orange"
//               ? "bg-orange-50"
//               : color === "blue"
//                 ? "bg-blue-50"
//                 : color === "green"
//                   ? "bg-green-50"
//                   : "bg-purple-50"
//           }`}
//         >
//           <Icon
//             className={`w-6 h-6 ${
//               color === "orange"
//                 ? "text-orange-600"
//                 : color === "blue"
//                   ? "text-blue-600"
//                   : color === "green"
//                     ? "text-green-600"
//                     : "text-purple-600"
//             }`}
//           />
//         </div>
//       </div>
//     </div>
//   );

//   const QuickActionCard = ({
//     icon: Icon,
//     title,
//     description,
//     color,
//     onClick,
//   }) => (
//     <button
//       onClick={onClick}
//       className={`p-4  rounded-xl border-2 border-dashed transition-all text-left w-full group ${
//         color === "blue"
//           ? "border-blue-200 bg-blue-50 hover:bg-blue-100"
//           : color === "green"
//             ? "border-green-200 bg-green-50 hover:bg-green-100"
//             : color === "purple"
//               ? "border-purple-200 bg-purple-50 hover:bg-purple-100"
//               : "border-orange-200 bg-orange-50 hover:bg-orange-100"
//       }`}
//     >
//       <Icon
//         className={`w-6 h-6 mb-2 group-hover:scale-110 transition-transform ${
//           color === "blue"
//             ? "text-blue-600"
//             : color === "green"
//               ? "text-green-600"
//               : color === "purple"
//                 ? "text-purple-600"
//                 : "text-orange-600"
//         }`}
//       />
//       <h3
//         className={`font-semibold text-sm ${
//           color === "blue"
//             ? "text-blue-900"
//             : color === "green"
//               ? "text-green-900"
//               : color === "purple"
//                 ? "text-purple-900"
//                 : "text-orange-900"
//         }`}
//       >
//         {title}
//       </h3>
//       <p
//         className={`text-xs mt-0 ${
//           color === "blue"
//             ? "text-blue-700"
//             : color === "green"
//               ? "text-green-700"
//               : color === "purple"
//                 ? "text-purple-700"
//                 : "text-orange-700"
//         }`}
//       >
//         {description}
//       </p>
//     </button>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
//       {/* Header Section */}
//       <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
//         <div className="max-w-7xl mx-auto px-6 py-5">
//           <div className="flex justify-between items-center">
//             <div>
//               <h1 className="text-2xl font-bold text-slate-900 text-start">
//                 Good afternoon, Dr. Smith
//               </h1>
//               <p className="text-slate-600 text-sm mt-1">
//                 You have {stats.pendingReviews} pending reviews and{" "}
//                 {stats.upcomingAppointments} appointments today
//               </p>
//             </div>
//             <div className="flex gap-3 items-center">
//               <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors">
//                 <Bell className="w-5 h-5 text-slate-600" />
//                 <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//               </button>
//               <AiOutlinePoweroff  className="w-5 h-5"/>
//               <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
//                 <Calendar className="w-4 h-4" />
//                 Schedule
//               </button>

//               {/* <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg text-sm font-medium transition-all shadow-sm flex items-center gap-2">
//                 <Video className="w-4 h-4" />
//                 Start Consultation
//               </button> */}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 py-6">
//         {/* Key Metrics Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
//           <StatCard
//             title="Pending Reviews"
//             value={stats.pendingReviews}
//             icon={AlertCircle}
//             color="orange"
//           />
//           <StatCard
//             title="Today's Appointments"
//             value={stats.upcomingAppointments}
//             icon={Calendar}
//             color="blue"
//             subtitle="Next at 14:30"
//           />
//           <StatCard
//             title="January Earnings"
//             value={`£${stats.monthlyEarnings}`}
//             change="+12.5%"
//             trend="up"
//             icon={DollarSign}
//             color="green"
//           />
//           <StatCard
//             title="Completed Today"
//             value={stats.completedToday}
//             icon={CheckCircle}
//             color="purple"
//             subtitle={`Avg. ${stats.avgResponseTime} response`}
//           />
//         </div>

//         {/* Main Content Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
//           {/* Recent Submissions - Takes 2 columns */}
//           <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200">
//             <div className="p-4 border-b border-slate-200">
//               <div className="flex justify-between items-center">
//                 <div className="text-start">
//                   <h2 className="text-lg font-bold text-slate-900">
//                     Recent Submissions
//                   </h2>
//                   <p className="text-xs text-slate-600 ">
//                     Latest assessment submissions requiring review
//                   </p>
//                 </div>
//                 <div className="flex gap-2">
//                   <button className="px-3 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
//                     All
//                   </button>
//                   <button className="px-3 py-1.5 text-xs font-medium hover:bg-slate-100 rounded-lg transition-colors">
//                     Pending
//                   </button>
//                   <button className="px-3 py-1.5 text-xs font-medium hover:bg-slate-100 rounded-lg transition-colors">
//                     Urgent
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="divide-y divide-slate-200">
//               {recentSubmissions.map((submission) => (
//                 <div
//                   key={submission.id}
//                   className="p-4 hover:bg-slate-50 transition-colors cursor-pointer"
//                 >
//                   <div className="flex items-start justify-between">
//                     <div className="flex items-start gap-3 flex-1">
//                       <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/45 to-primary/90 flex items-center justify-center text-white font-semibold text-sm">
//                         {submission.patientName
//                           .split(" ")
//                           .map((n) => n[0])
//                           .join("")}
//                       </div>
//                       <div className="flex-1">
//                         <div className="flex items-center gap-2">
//                           <h3 className="font-semibold text-slate-900">
//                             {submission.patientName}
//                           </h3>
//                           {submission.urgency === "high" && (
//                             <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-700 rounded">
//                               Urgent
//                             </span>
//                           )}
//                         </div>
//                         <p className="text-sm text-slate-600 mt-0.5">
//                           {submission.assessmentType} • {submission.age} years
//                         </p>
//                         <p className="text-xs text-slate-500 mt-1">
//                           {submission.submittedAt}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex flex-col items-end gap-2">
//                       <span
//                         className={`px-3 py-1 text-xs font-semibold rounded-full ${
//                           submission.status === "pending"
//                             ? "bg-orange-100 text-orange-700"
//                             : submission.status === "accepted"
//                               ? "bg-green-100 text-green-700"
//                               : submission.status === "in_review"
//                                 ? "bg-blue-100 text-blue-700"
//                                 : "bg-slate-100 text-slate-700"
//                         }`}
//                       >
//                         {submission.status.replace("_", " ").toUpperCase()}
//                       </span>
//                       <button className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
//                         Review →
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="p-4 border-t border-slate-200">
//               <button className="w-full py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
//                 View All Submissions
//               </button>
//             </div>
//           </div>

//           {/* Upcoming Appointments Sidebar */}
//           <div className="bg-white rounded-xl shadow-sm border border-slate-200">
//             <div className="p-4 border-b border-slate-200">
//               <h2 className="text-lg font-bold text-slate-900">
//                 Today's Schedule
//               </h2>
//               <p className="text-xs text-slate-600 ">
//                 {upcomingAppointments.length} appointments
//               </p>
//             </div>

//             <div className="p-4 space-y-3">
//               {upcomingAppointments.map((apt) => (
//                 <div
//                   key={apt.id}
//                   className="p-3 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer"
//                 >
//                   <div className="flex items-start justify-between mb-2">
//                     <div className="flex items-center gap-2">
//                       <Clock className="w-4 h-4 text-slate-500" />
//                       <span className="text-sm font-semibold text-slate-900">
//                         {apt.time}
//                       </span>
//                     </div>
//                     <span
//                       className={`px-2 py-0.5 text-xs font-medium rounded ${
//                         apt.status === "confirmed"
//                           ? "bg-green-100 text-green-700"
//                           : "bg-orange-100 text-orange-700"
//                       }`}
//                     >
//                       {apt.status}
//                     </span>
//                   </div>
//                   <h3 className="font-semibold text-slate-900 text-sm">
//                     {apt.patientName}
//                   </h3>
//                   <p className="text-xs text-slate-600 mt-1">{apt.condition}</p>
//                   <div className="flex items-center gap-2 -mt-2">
//                     {/* <span className="text-xs text-slate-500">
//                       {apt.duration}
//                     </span> */}
//                     {apt.date === "Today" && (
//                       <button className="ml-auto px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
//                         Join Call
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="p-4 border-t border-slate-200">
//               <button className="w-full py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
//                 View Full Calendar
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Quick Actions */}
//         <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
//           <h2 className="text-lg font-bold text-slate-900 mb-4">
//             Quick Actions
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <QuickActionCard
//               icon={FileText}
//               title="Review Assessment"
//               description="Check pending submissions"
//               color="blue"
//             />
//             <QuickActionCard
//               icon={Calendar}
//               title="Schedule Appointment"
//               description="Review  consultation"
//               color="green"
//             />
//             <QuickActionCard
//               icon={Video}
//               title="Start Call"
//               description="Begin video consultation"
//               color="purple"
//             />
//             <QuickActionCard
//               icon={Activity}
//               title="View Invoice"
//               description="View Appointment's Invoice"
//               color="orange"
//             />
//           </div>
//         </div>

//         {/* Performance Overview */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
//             <h3 className="font-semibold text-slate-900 mb-4">
//               Monthly Performance
//             </h3>
//             <div className="space-y-3">
//               <div>
//                 <div className="flex justify-between text-sm mb-1">
//                   <span className="text-slate-600">Assessments</span>
//                   <span className="font-medium">
//                     {stats.monthlyAssessments}/15
//                   </span>
//                 </div>
//                 <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
//                   <div
//                     className="h-full bg-blue-600 rounded-full"
//                     style={{
//                       width: `${(stats.monthlyAssessments / 15) * 100}%`,
//                     }}
//                   ></div>
//                 </div>
//               </div>
//               <div>
//                 <div className="flex justify-between text-sm mb-1">
//                   <span className="text-slate-600">Response Time</span>
//                   <span className="font-medium text-green-600">Excellent</span>
//                 </div>
//                 <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
//                   <div
//                     className="h-full bg-green-600 rounded-full"
//                     style={{ width: "85%" }}
//                   ></div>
//                 </div>
//               </div>
//               <div>
//                 <div className="flex justify-between text-sm mb-1">
//                   <span className="text-slate-600">Patient Satisfaction</span>
//                   <span className="font-medium">4.8/5.0</span>
//                 </div>
//                 <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
//                   <div
//                     className="h-full bg-purple-600 rounded-full"
//                     style={{ width: "96%" }}
//                   ></div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
//             <h3 className="font-semibold text-slate-900 mb-4">
//               Assessments Category
//             </h3>
//             <div className="space-y-2">
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-slate-600">ADHD Assessments</span>
//                 <span className="text-sm font-semibold">42%</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-slate-600">Anxiety Reviews</span>
//                 <span className="text-sm font-semibold">28%</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-slate-600">
//                   Depression Screens
//                 </span>
//                 <span className="text-sm font-semibold">18%</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-slate-600">Other</span>
//                 <span className="text-sm font-semibold">12%</span>
//               </div>
//             </div>
//           </div>

//           <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-sm p-6 text-white">
//             <h3 className="font-semibold mb-2">Total Earnings</h3>
//             <p className="text-3xl font-bold mb-4">
//               £{stats.totalEarnings.toLocaleString()}
//             </p>
//             <div className="space-y-2 text-sm opacity-90">
//               <div className="flex justify-between">
//                 <span>This Month</span>
//                 <span className="font-semibold">£{stats.monthlyEarnings}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Total Patients</span>
//                 <span className="font-semibold">{stats.totalAssessments}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
