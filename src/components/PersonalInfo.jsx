import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../api/user";
import { AuthContext } from "../Provider/AuthProvider";
import Header from "./ui-reusable/Header";
import p1 from "../../public/svg/placeholder.png";
import {
  FaEdit,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCertificate,
  FaIdCard,
} from "react-icons/fa";

const PersonalInfo = () => {
  const { userData } = useContext(AuthContext) || {};
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    console.log("AuthContext userData:", userData);


  useEffect(() => {
    const fetchUserProfile = async () => {
      if (userData?.id) {
        try {
          setLoading(true);
          const response = await getUserById(userData.id);
          setUserProfile(response?.payload || response);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserProfile();
  }, [userData?.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
        <div className="text-center">
          <p className="text-slate-600">No profile data found</p>
        </div>
      </div>
    );
  }

  const InfoRow = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
      <div className="p-2 bg-blue-100 rounded-lg">
        <Icon className="w-5 h-5 text-blue-600" />
      </div>
      <div className="flex-1">
        <p className="text-sm text-slate-600 font-medium">{label}</p>
        <p className="text-slate-900 mt-1">{value || "Not provided"}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 px-8 ">
      {/* <div className="text-left ">
        <h1 className="text-xl font-bold ">Personal Details</h1>
      </div> */}

      <div className=" mx-auto  pb-6">
        {/* Profile Header Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <img
                src={userData.image || p1}
                alt=""
                className="h-14 w-auto"
              />

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {userData.name}
                </h2>
                <p className="text-slate-600 text-xs">{userData.email}</p>
                {/* <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                  {userData.role?.toUpperCase()}
                </span> */}
              </div>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => navigate("/profile/edit")}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg text-sm font-medium transition-all shadow-sm"
            >
              <FaEdit className="w-4 h-4" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Information Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Details */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <FaUser className="text-blue-600" />
              Personal Details
            </h3>
            <div className="space-y-3">
              <InfoRow
                icon={FaUser}
                label="Full Name"
                value={userData.name}
              />
              <InfoRow
                icon={FaEnvelope}
                label="Email Address"
                value={userData.email}
              />
              <InfoRow
                icon={FaPhone}
                label="Phone Number"
                value={userData.phone}
              />
            </div>
          </div>

          {/* Professional Details */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <FaCertificate className="text-blue-600" />
              Professional Details
            </h3>
            <div className="space-y-3">
              <InfoRow
                icon={FaIdCard}
                label="Practice Name"
                value={userData.practiceName}
              />
              <InfoRow
                icon={FaCertificate}
                label="HCPC Title"
                value={userData.hcpcTitle}
              />
              <InfoRow
                icon={FaIdCard}
                label="Registration Number"
                value={userData.regNo}
              />
              <InfoRow
                icon={FaCertificate}
                label="Certification"
                value={userData.certification}
              />
            </div>
          </div>

          {/* Address Details */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 lg:col-span-2">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <FaMapMarkerAlt className="text-blue-600" />
              Address Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <InfoRow
                icon={FaMapMarkerAlt}
                label="Street"
                value={userData.street}
              />
              <InfoRow
                icon={FaMapMarkerAlt}
                label="Post Code"
                value={userData.postCode}
              />
              <InfoRow
                icon={FaMapMarkerAlt}
                label="State"
                value={userData.state}
              />
              <InfoRow
                icon={FaMapMarkerAlt}
                label="Country"
                value={userData.country}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
