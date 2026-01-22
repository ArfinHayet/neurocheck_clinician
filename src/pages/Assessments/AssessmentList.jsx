
import Header from "../../components/ui-reusable/Header";
import AssessmentCard from "../../components/ui-reusable/AssesmentCard";
import { useContext, useEffect, useState } from "react";
import RatingModal from "../../components/RatingModal";
import SubmissionDetails from "../../components/SubmissionDetails"
import { getAllsubmissions, updateStatus } from "../../api/assessment";
import { AuthContext } from "../../Provider/AuthProvider";

const AssessmentList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);
  const [submission, setSubmission] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const { userData } = useContext(AuthContext) || {};

  const handleSubmitRating = () => {
    setIsRateModalOpen(false);
  };

  const handleView = (item) => {
    //console.log("33", item);
    setSelectedSubmission(item);
    setIsModalOpen(true);
  };

  const handleViewRate = (id) => {
    setSelectedId(id);
    setIsRateModalOpen(true);
  };

  const handleAccept = async (id) => {
    //console.log("2222222222",id)
    const obj = {
      status: "completed",
      clinicianId: Number(userData?.id),
    };
    //console.log("tttqqqqq",obj)

    const result = await updateStatus(id, obj);
    //console.log("ttt",result)
    alert("Accepted");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSubmission(null);
  };

  const fetchSubmissions = async () => {
    const res = await getAllsubmissions();

    const rawData = res?.payload?.filter(
      (i) =>
        i?.assessment?.type === "premium" &&
        i?.clinicianId === Number(userData?.id),
    );
    // const rawData = res?.payload
    //console.log("assessment", rawData);

    // group by patientId, assessmentId, and userId
    const grouped = Object?.values(
      rawData?.reduce((acc, item) => {
        const key = `${item.patientId}-${item.assessmentId}-${item.userId}`;

        if (!acc[key]) {
          acc[key] = {
            id: item?.id,
            status: item?.status,
            ratings: item?.ratings,
            patientId: item?.patientId,
            assessmentId: item?.assessmentId,
            userId: item?.userId,
            patient: item?.patient,
            assessment: item?.assessment,
            user: item?.user,
            summaries: [],
          };
        }

        acc[key].summaries.push({
          questionType: item.questionType,
          summary: item.summary,
        });

        return acc;
      }, {}),
    );

    //console.log("Grouped Data:", grouped);

    setSubmission(grouped);
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  return (
    <div className="p-6 lg:p-0 min-h-screen mb-2">
      <Header
        title="Assessment queue"
        description="Your central hub for tracking assessments, reviewing patient insights, and managing your schedule"
      />

      <div className="flex flex-col gap-5">
        {submission?.length > 0 ? (
          submission?.map((item, index) => (
            <AssessmentCard
              key={index}
              patientId={item?.patientId}
              assessmentId={item?.assessmentId}
              name={item?.patient?.name}
              age={item?.patient?.dateOfBirth}
              timeAgo={item?.assessment?.createdAt}
              status={item?.status}
              ratings={item?.ratings}
              childCondition={item?.assessment?.category}
              description={item?.assessment?.description}
              onViewFullAssessment={() => handleView(item)}
              onRateSummary={() => handleViewRate(item?.id)}
              onAcceptCase={() => handleAccept(item?.id)}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 italic">
            There is no submission yet.
          </p>
        )}
      </div>

      {selectedSubmission && (
        <SubmissionDetails
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          patientId={selectedSubmission?.patientId}
          time={selectedSubmission?.assessment?.createdAt}
          score={selectedSubmission?.score}
          assessmentId={selectedSubmission?.assessmentId}
        />
      )}

      <RatingModal
        isOpen={isRateModalOpen}
        onClose={() => setIsRateModalOpen(false)}
        onSubmit={handleSubmitRating}
        maxStars={5}
        selectedId={selectedId}
        initialRating={0}
      />
    </div>
  );
};

export default AssessmentList;
