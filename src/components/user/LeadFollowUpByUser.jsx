import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../constant";
import { formatDateAndTime } from "../../utils/date";
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
    indexOfLastFollowUp,
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
            },
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
          <table className=" w-full table-auto bg-white text-xs md:text-base">
            <thead>
              <tr className="bg-bodydark text-center dark:bg-black">
                <th className="min-w-[100px]  px-2 py-2 font-bold text-black dark:text-white xl:pl-11">
                  Lead Name
                </th>
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
                    <td className="border-[#eee] xl:pl-4  border-b px-2  py-2  dark:border-strokedark">
                      {followUp?.leadId.firstName} {followUp?.leadId.lastName}
                    </td>
                    <td className="dark:border-strokedark xl:pl-4 border-b border-[#eee] px-2  py-2">
                      {followUp?.type}
                    </td>
                    <td className="dark:border-strokedark xl:pl-4 border-b border-[#eee] px-2  py-2">
                      {formatDateAndTime(followUp?.followUpDate)}{" "}
                    </td>
                    <td className="dark:border-strokedark xl:pl-4 border-b border-[#eee] px-2  py-2">
                      {formatDateAndTime(followUp?.nextFollowUpDate)}
                    </td>
                    <td className=" dark:border-strokedark  border-b  border-[#eee] px-2 py-2  xl:pl-4">
                      {followUp.remarks}
                    </td>
                    <td className="border-[#eee] xl:pl-4 border-b px-2  py-2  dark:border-strokedark">
                      {followUp?.callStatus}
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="dark:bg-meta-4">
                  <td
                    className="border-b border-[#eee] px-2 py-3 pl-9 dark:border-strokedark xl:pl-11"
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
                  onClick={() => paginate(i + 1)}
                  className="rounded bg-primary px-2 py-1 font-bold text-white hover:bg-bodydark"
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
export default LeadFollowUpByUser;
