import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../constant";
import formatDate from "../../utils/date";
import { useAuth } from "../../context/AuthContext";
import Loader from "../Loader";

const LeadFollowUpByUser = () => {
  const { user } = useAuth();
  const [followUps, setFollowUps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const followUpsPerPage = 5;

  // Logic to paginate follow-ups
  const indexOfLastFollowUp = currentPage * followUpsPerPage;
  const indexOfFirstFollowUp = indexOfLastFollowUp - followUpsPerPage;
  const currentFollowUps = followUps?.slice(
    indexOfFirstFollowUp,
    indexOfLastFollowUp
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchFollowUps = async () => {
      setLoading(true); // Set loading to true before making the API call
      try {
        if (user && user._id) {
          const response = await axios.get(
            `${BASE_URL}/user/users-followups/${user._id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setFollowUps(response.data.data.followUps);
          setLoading(false); // Set loading to false after successfully fetching data
        }
      } catch (error) {
        // Handle error
        console.error("Error fetching follow-ups:", error);
        setError(error);
        setLoading(false); // Set loading to false if an error occurs
      }
    };

    fetchFollowUps();
  }, [user]);

  if (loading) {
    return <Loader />; // Render loading indicator while fetching data
  }

  if (error) {
    return <p>Error: {error.message}</p>; // Render error message if an error occurs
  }

  return (
    <>
      {/* <CreateLeadFollowUp setFollowUps={setFollowUps} user={user} /> */}
      <h1 className="text-title-md">Leads Follow Ups</h1>
      <div className="mt-3">
        <div className="max-w-full overflow-x-auto">
          <table className=" bg-white text-xs md:text-base w-full table-auto">
            <thead>
              <tr className="bg-bodydark text-center dark:bg-black">
                <th className="min-w-[100px]  py-2 px-2 font-bold text-black dark:text-white xl:pl-11">
                  Lead Name
                </th>
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
                    className=" dark:bg-graydark text-center"
                    key={followUp._id}
                  >
                    <td className="border-b border-[#eee] py-2 px-2  dark:border-strokedark xl:pl-4">
                      {followUp?.leadId.firstName} {followUp?.leadId.lastName}
                    </td>
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
                    className="border-b border-[#eee] py-3 px-2 pl-9 dark:border-strokedark xl:pl-11"
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
                  onClick={() => paginate(i + 1)}
                  className="bg-primary hover:bg-bodydark text-white font-bold py-1 px-2 rounded"
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
    </>
  );
};
export default LeadFollowUpByUser;
