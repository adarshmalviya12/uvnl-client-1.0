import CreateLeadModel from "./CreateLeadModal";
import { FaEdit, FaEye } from "react-icons/fa";
import DeleteButton from "./DeleteButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../constant";

const UserLeadsTable = ({ leads, setLeads }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 5;

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleDelete = async (id) => {
    try {
      await axios.patch(`${BASE_URL}/user/delete-lead/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLeads(leads.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  // Logic to paginate leads
  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = leads.slice(indexOfFirstLead, indexOfLastLead);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="mb-3 flex items-center justify-between text-title-sm md:text-title-md   ">
        <h1 className="text-black dark:text-white">Leads</h1>
        <CreateLeadModel />
      </div>
      <div className="">
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
              {currentLeads.length !== 0 ? (
                currentLeads?.map((lead) => (
                  <tr className="text-center dark:bg-graydark" key={lead?._id}>
                    <td className="dark:border-strokedark xl:pl-4 border-b border-[#eee] px-2  py-2">
                      {lead?.firstName} {lead?.lastName}
                    </td>
                    <td className="dark:border-strokedark xl:pl-4 border-b border-[#eee] px-2  py-2">
                      {lead?.number}
                    </td>
                    <td className="dark:border-strokedark xl:pl-4 border-b border-[#eee] px-2  py-2">
                      {lead?.email}
                    </td>
                    <td className="dark:border-strokedark xl:pl-4 border-b border-[#eee] px-2  py-2">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => navigate(`/user/lead/${lead?._id}`)}
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() =>
                            navigate(`/user/lead/edit/${lead?._id}`)
                          }
                        >
                          <FaEdit />
                        </button>
                        <DeleteButton
                          onDelete={() => handleDelete(lead?._id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="text-center dark:bg-graydark ">
                  <td
                    className=" xl:pl-4 border-b border-[#eee] px-2  py-2 dark:border-strokedark"
                    colSpan="5"
                  >
                    no lead to display
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <ul className="mt-4 flex justify-center">
          {Array.from(
            { length: Math.ceil(leads.length / leadsPerPage) },
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
export default UserLeadsTable;
