import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../constant";
import { formatDate } from "../../utils/date";
import CreateOpportunityFollowUp from "./CreateOpportunityFollowUp";

const OpportunityLogs = ({ opportunity, kycId }) => {
  const [followUps, setFollowUps] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const followUpsPerPage = 5; // Number of follow-ups to display per page

  // Logic to paginate follow-ups
  const indexOfLastFollowUp = currentPage * followUpsPerPage;
  const indexOfFirstFollowUp = indexOfLastFollowUp - followUpsPerPage;
  const currentFollowUps = followUps?.slice(
    indexOfFirstFollowUp,
    indexOfLastFollowUp,
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
            },
          );
          setFollowUps(response.data.data.followUps);
          setLoading(false);
        }
      } catch (error) {
        // Handle error
        setError(error.response.data.message);
        setLoading(false);
      }
    };

    if (opportunity && opportunity._id) {
      fetchFollowUps();
    }
  }, [opportunity, token]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <CreateOpportunityFollowUp
        followUps={followUps}
        setFollowUps={setFollowUps}
        opportunity={opportunity}
      />
      <div className="mt-3">
        <div className="max-w-full overflow-x-auto">
          <table className=" w-full table-auto bg-white text-xs md:text-base">
            <thead>
              <tr className="bg-bodydark text-center dark:bg-black">
                <th className="min-w-[100px]  px-2 py-2 font-bold text-black dark:text-white xl:pl-11">
                  Type
                </th>
                <th className="min-w-[100px]  px-2 py-2 font-bold text-black dark:text-white xl:pl-11">
                  Follow-up Date
                </th>
                <th className="min-w-[100px]  px-2 py-2 font-bold text-black dark:text-white xl:pl-11">
                  Next Follow-up Date
                </th>
                <th className="min-w-[100px]  px-2 py-2 font-bold text-black dark:text-white xl:pl-11">
                  Remarks
                </th>
                <th className="min-w-[100px]  px-2 py-2 font-bold text-black dark:text-white xl:pl-11">
                  Call Status
                </th>
              </tr>
            </thead>
            <tbody>
              {currentFollowUps?.length !== 0 ? (
                currentFollowUps?.map((followUp) => (
                  <tr
                    className="text-center dark:bg-graydark"
                    key={followUp?._id}
                  >
                    <td className="dark:border-strokedark xl:pl-4 border-b border-[#eee] px-2  py-2">
                      {followUp?.type}
                    </td>
                    <td className="dark:border-strokedark xl:pl-4 border-b border-[#eee] px-2  py-2">
                      {formatDate(followUp?.followUpDate)}{" "}
                    </td>
                    <td className="dark:border-strokedark xl:pl-4 border-b border-[#eee] px-2  py-2">
                      {formatDate(followUp?.nextFollowUpDate)}
                    </td>
                    <td className="dark:border-strokedark xl:pl-4 border-b border-[#eee] px-2  py-2">
                      {followUp.remarks}
                    </td>
                    <td className="dark:border-strokedark xl:pl-4 border-b border-[#eee] px-2  py-2">
                      {followUp?.callStatus}
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="dark:bg-meta-4">
                  <td
                    className=" xl:pl-4 border-b border-[#eee] px-2  py-2 dark:border-strokedark"
                    colSpan="6"
                  >
                    No follow-ups to display
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <ul className="mt-4 flex justify-center">
          {Array.from(
            { length: Math.ceil(followUps?.length / followUpsPerPage) },
            (_, i) => (
              <li key={i} className="mx-1">
                <button
                  onClick={() => setCurrentPage(i + 1)}
                  className="rounded bg-bodydark px-4 py-2 font-bold text-white hover:bg-bodydark"
                  style={{
                    backgroundColor:
                      currentPage === i + 1 ? "#4f46e5" : "#6b63ff",
                    borderColor: currentPage === i + 1 ? "#4f46e5" : "#6b63ff",
                  }}
                >
                  {i + 1}
                </button>
              </li>
            ),
          )}
        </ul>
      </div>
    </div>
  );
};

export default OpportunityLogs;
