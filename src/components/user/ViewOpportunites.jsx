import { FaEdit, FaEye } from "react-icons/fa";
import DeleteButton from "./DeleteButton";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../constant";
import { useOpportunities } from "../../context/OpportunityContext";

const ViewOpportunites = () => {
  const { opportunities, setOpportunities } = useOpportunities(); // Update context hook

  const [currentPage, setCurrentPage] = useState(1);
  const opportunitiesPerPage = 5;

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchOpportunities = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/opportunities`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOpportunities(response.data.data.opportunities);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.patch(`${BASE_URL}/user/delete-opportunity/${id}`, null, {
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
    indexOfLastOpportunity
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchOpportunities();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center text-title-sm md:text-title-md mb-3   ">
        <h1 className="text-black dark:text-white">Opportunity</h1>
      </div>
      <div>
        <div className="max-w-full overflow-x-auto">
          <table className=" bg-white text-xs md:text-base w-full table-auto">
            <thead>
              <tr className="bg-bodydark text-center dark:bg-black">
                <th className="min-w-[100px]  py-2 px-2 font-bold text-black dark:text-white xl:pl-11">
                  Name
                </th>
                <th className="min-w-[100px]  py-2 px-2 font-bold text-black dark:text-white xl:pl-11">
                  Mobile Number
                </th>
                <th className="min-w-[100px]  py-2 px-2 font-bold text-black dark:text-white xl:pl-11">
                  Email
                </th>
                <th className="min-w-[100px]  py-2 px-2 font-bold text-black dark:text-white xl:pl-11">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {opportunities.length !== 0 ? (
                currentOpportunities?.map((item) => (
                  <tr className="dark:bg-graydark text-center" key={item?._id}>
                    <td className="border-b border-[#eee] py-2 px-2  dark:border-strokedark xl:pl-4">
                      {item.firstName} {item.lastName}
                    </td>
                    <td className="border-b border-[#eee] py-2 px-2  dark:border-strokedark xl:pl-4">
                      {item.number}
                    </td>
                    <td className="border-b border-[#eee] py-2 px-2  dark:border-strokedark xl:pl-4">
                      {item.email}
                    </td>
                    <td className="border-b border-[#eee] py-2 px-2  dark:border-strokedark xl:pl-4">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() =>
                            navigate(`/user/opportunity/${item._id}`)
                          }
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() =>
                            navigate(`/user/opportunity/edit/${item._id}`)
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
                    className="border-b border-[#eee] py-3 px-2 pl-9 dark:border-strokedark xl:pl-11"
                    colSpan="4"
                  >
                    No opportunities to display
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <ul className="flex justify-center mt-4">
          {Array.from(
            { length: Math.ceil(opportunities.length / opportunitiesPerPage) },
            (_, i) => (
              <li key={i} className="mx-1">
                <button
                  onClick={() => paginate(i + 1)}
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
    </>
  );
};

export default ViewOpportunites;
