import { FaEdit, FaEye } from "react-icons/fa";
import DeleteButton from "./DeleteButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../constant";
import { useOpportunities } from "../../context/OpportunityContext";

const OpportunityTable = () => {
  const { opportunities, setOpportunities } = useOpportunities(); // Update context hook
  const [currentPage, setCurrentPage] = useState(1);
  const opportunitiesPerPage = 5;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/admin/opportunity/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOpportunities(opportunities.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const indexOfLastOpportunity = currentPage * opportunitiesPerPage;
  const indexOfFirstOpportunity = indexOfLastOpportunity - opportunitiesPerPage;
  const currentOpportunities = opportunities?.slice(
    indexOfFirstOpportunity,
    indexOfLastOpportunity,
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const fetchOpportunities = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/opportunities`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOpportunities(response.data.data.opportunities);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  return (
    <>
      <div className="mb-3 flex items-center justify-between text-title-lg">
        <h1 className="text-black dark:text-white">Opportunities</h1>
      </div>
      <div>
        <div className="max-w-full overflow-x-auto">
          <table className=" w-full table-auto bg-white text-xs md:text-base">
            <thead>
              <tr className="bg-bodydark text-center dark:bg-black">
                <th className="min-w-[100px]  px-2 py-2 font-bold text-black dark:text-white xl:pl-11">
                  Name
                </th>
                <th className="min-w-[100px]  px-2 py-2 font-bold text-black dark:text-white xl:pl-11">
                  Mobile Number
                </th>
                <th className="min-w-[100px]  px-2 py-2 font-bold text-black dark:text-white xl:pl-11">
                  Email
                </th>
                <th className="min-w-[100px]  px-2 py-2 font-bold text-black dark:text-white xl:pl-11">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {opportunities.length !== 0 ? (
                currentOpportunities?.map((item) => (
                  <tr className="text-center dark:bg-graydark" key={item?._id}>
                    <td className="dark:border-strokedark xl:pl-4 border-b border-[#eee] px-2  py-2">
                      {item.firstName} {item.lastName}
                    </td>
                    <td className="dark:border-strokedark xl:pl-4 border-b border-[#eee] px-2  py-2">
                      {item.number}
                    </td>
                    <td className="dark:border-strokedark xl:pl-4 border-b border-[#eee] px-2  py-2">
                      {item.email}
                    </td>
                    <td className="dark:border-strokedark xl:pl-4 border-b border-[#eee] px-2  py-2">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() =>
                            navigate(`/admin/opportunity/${item._id}`)
                          }
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() =>
                            navigate(`/admin/opportunity/edit/${item._id}`)
                          }
                        >
                          <FaEdit />
                        </button>
                        <DeleteButton onDelete={() => handleDelete(item._id)} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="dark:bg-meta-4">
                  <td
                    className="dark:border-strokedark xl:pl-4 border-b border-[#eee] px-2  py-2"
                    colSpan="4"
                  >
                    No opportunities to display
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <ul className="mt-4 flex justify-center">
          {Array.from(
            {
              length: Math.ceil(opportunities.length / opportunitiesPerPage),
            },
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

export default OpportunityTable;
