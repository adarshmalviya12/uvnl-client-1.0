import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../constant";
import formatDate from "../../utils/date";
import CreateOpportunityFollowUp from "./CreateOpportunityFollowUp";

const OpportunityLogs = ({ opportunity, kycId }) => {
  const [followUps, setFollowUps] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const followUpsPerPage = 5; // Number of follow-ups to display per page

  // Logic to paginate follow-ups
  const indexOfLastFollowUp = currentPage * followUpsPerPage;
  const indexOfFirstFollowUp = indexOfLastFollowUp - followUpsPerPage;
  const currentFollowUps = followUps?.slice(
    indexOfFirstFollowUp,
    indexOfLastFollowUp
  );

  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchFollowUps = async () => {
      try {
        if (opportunity && opportunity._id) {
          const response = await axios.get(
            `${BASE_URL}/user/opportunity-followup/${opportunity._id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setFollowUps(response.data.data.followUps);
        }
      } catch (error) {
        // Handle error
        console.error("Error fetching follow-ups:", error);
      }
    };

    if (opportunity._id) {
      fetchFollowUps();
    }
  }, [opportunity]);

  return (
    <div>
      <CreateOpportunityFollowUp
        followUps={followUps}
        setFollowUps={setFollowUps}
        opportunity={opportunity}
      />
      <div className="mt-3">
        <div className="max-w-full overflow-x-auto">
          <table className=" bg-white text-xs md:text-base w-full table-auto">
            <thead>
              <tr className="bg-bodydark text-center dark:bg-black">
                <th className="min-w-[100px]  py-2 px-2 font-bold text-black dark:text-white xl:pl-11">
                  Type
                </th>
                <th className="min-w-[100px]  py-2 px-2 font-bold text-black dark:text-white xl:pl-11">
                  Follow-up Date
                </th>
                <th className="min-w-[100px]  py-2 px-2 font-bold text-black dark:text-white xl:pl-11">
                  Next Follow-up Date
                </th>
                <th className="min-w-[100px]  py-2 px-2 font-bold text-black dark:text-white xl:pl-11">
                  Remarks
                </th>
                <th className="min-w-[100px]  py-2 px-2 font-bold text-black dark:text-white xl:pl-11">
                  Call Status
                </th>
              </tr>
            </thead>
            <tbody>
              {currentFollowUps?.length !== 0 ? (
                currentFollowUps?.map((followUp) => (
                  <tr
                    className="dark:bg-graydark text-center"
                    key={followUp?._id}
                  >
                    <td className="border-b border-[#eee] py-2 px-2  dark:border-strokedark xl:pl-4">
                      {followUp?.type}
                    </td>
                    <td className="border-b border-[#eee] py-2 px-2  dark:border-strokedark xl:pl-4">
                      {formatDate(followUp?.followUpDate)}{" "}
                    </td>
                    <td className="border-b border-[#eee] py-2 px-2  dark:border-strokedark xl:pl-4">
                      {formatDate(followUp?.nextFollowUpDate)}
                    </td>
                    <td className="border-b border-[#eee] py-2 px-2  dark:border-strokedark xl:pl-4">
                      {followUp.remarks}
                    </td>
                    <td className="border-b border-[#eee] py-2 px-2  dark:border-strokedark xl:pl-4">
                      {followUp?.callStatus}
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="dark:bg-meta-4">
                  <td
                    className="border-b border-[#eee] py-2 px-2  dark:border-strokedark  xl:pl-4"
                    colSpan="6"
                  >
                    No follow-ups to display
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <ul className="flex justify-center mt-4">
          {Array.from(
            { length: Math.ceil(followUps?.length / followUpsPerPage) },
            (_, i) => (
              <li key={i} className="mx-1">
                <button
                  onClick={() => setCurrentPage(i + 1)}
                  className="bg-bodydark hover:bg-bodydark text-white font-bold py-2 px-4 rounded"
                  style={{
                    backgroundColor:
                      currentPage === i + 1 ? "#4f46e5" : "#6b63ff",
                    borderColor: currentPage === i + 1 ? "#4f46e5" : "#6b63ff",
                  }}
                >
                  {i + 1}
                </button>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default OpportunityLogs;
