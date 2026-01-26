
import UserTab from "../../components/ui-reusable/UserTab";
import { useState, useMemo } from "react";
import Availability from "../../components/Availability";
import Leave from "./Leave";
import Invoice from "../Invoice/Invoice";
import PersonalInfo from "../../components/PersonalInfo";

const Profile = () => {
  const tabs = ["Personal Info", "Availability", "Leave", "Invoices"];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const tabMeta = {
    "Personal Info": {
      title: "Personal Information",
      description: "Manage basic details and contact information.",
    },
    Availability: {
      title: "Availability",
      description:
        "Set your available days and times so users can book when it works best for you.",
    },
    Leave: {
      title: "Leave",
      description:
        "Schedule your time off. Let us know when you’ll be unavailable so we can keep things running smoothly.",
    },
    Invoices: {
      title: "Invoices",
      description: "Review and manage billing records.",
    },
  };

  const { title, description } = useMemo(
    () => tabMeta[selectedTab] ?? { title: selectedTab, description: "" },
    [selectedTab],
  );

  return (
    <div className="p-6 lg:p-0">
      <UserTab
        tabs={tabs}
        selected={selectedTab}
        setSelected={setSelectedTab}
        title={title}
        description={description}
      />

      <div className="mt-4 min-h-screen">
        {selectedTab === "Personal Info" &&  <PersonalInfo/> }
        {selectedTab === "Availability" && <Availability />}
        {selectedTab === "Leave" && <Leave />}
        {selectedTab === "Invoices" && <Invoice />}
      </div>
    </div>
  );
};

export default Profile;
