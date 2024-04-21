import { useEffect, useState } from "react";
import CreateLeadFollowUp from "./CreateLeadFollowUp";
import axios from "axios";
import BASE_URL from "../../constant";
import formatDate from "../../utils/date";

const LeadLogs = ({ lead }) => {
  const [followUps, setFollowUps] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const followUpsPerPage = 5; // Number of follow-ups to display per page
  // const navigate = useNavigate();

  // Logic to paginate follow-ups
  const indexOfLastFollowUp = currentPage * followUpsPerPage;
  const indexOfFirstFollowUp = indexOfLastFollowUp - followUpsPerPage;
  const currentFollowUps = followUps?.slice(
    indexOfFirstFollowUp,
    indexOfLastFollowUp,
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchFollowUps = async () => {
      try {
        if (lead && lead._id) {
          const response = await axios.get(
            `${BASE_URL}/user/followups/${lead._id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );
          setFollowUps(response.data.data.followUps);
        }
      } catch (error) {
        // Handle error
        console.error("Error fetching follow-ups:", error);
      }
    };

    if (lead._id) {
      fetchFollowUps();
    }
  }, [lead]);

  return (
    <>
      <CreateLeadFollowUp
        followUps={followUps}
        setFollowUps={setFollowUps}
        lead={lead}
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
                    className=" text-center dark:bg-graydark"
                    key={followUp._id}
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
                    className="border-b border-[#eee] px-2 py-3 pl-9 dark:border-strokedark xl:pl-11"
                    colSpan="5"
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
                  onClick={() => paginate(i + 1)}
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
    </>
  );
};
export default LeadLogs;
