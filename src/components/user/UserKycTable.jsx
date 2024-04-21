import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const UserKycTable = ({ kycData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const kycPerPage = 5;

  const navigate = useNavigate();

  const indexOfLastKyc = currentPage * kycPerPage;
  const indexOfFirstKyc = indexOfLastKyc - kycPerPage;
  const currentKyc = kycData.slice(indexOfFirstKyc, indexOfLastKyc);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="mb-3 flex items-center justify-between text-title-sm md:text-title-md">
        <h1 className="text-black dark:text-white">KYC Data</h1>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto bg-white text-xs md:text-base">
          <thead>
            <tr className="bg-bodydark text-center dark:bg-black">
              <th className="min-w-[100px] px-2 py-2 font-bold text-black dark:text-white xl:pl-11">
                Opportunity Name
              </th>
              <th className="min-w-[100px] px-2 py-2 font-bold text-black dark:text-white xl:pl-11">
                KYC Status
              </th>
              <th className="min-w-[100px] px-2 py-2 font-bold text-black dark:text-white xl:pl-11">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentKyc.length !== 0 ? (
              currentKyc.map((kyc) => (
                <tr className="text-center dark:bg-graydark" key={kyc._id}>
                  <td className="border-b border-[#eee] px-2 py-2 dark:border-strokedark xl:pl-4">
                    {kyc.opportunity.firstName} {kyc.opportunity.lastName}
                  </td>
                  <td className="border-b border-[#eee] px-2 py-2 dark:border-strokedark xl:pl-4">
                    {kyc.kycStatus}
                  </td>
                  <td className="dark:border-strokedark xl:pl-4 border-b border-[#eee] px-2  py-2">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() =>
                          navigate(`/user/kyc/${kyc?.opportunity._id}`)
                        }
                      >
                        <FaEye />
                      </button>

                      {/* <DeleteButton onDelete={() => handleDelete(lead?._id)} /> */}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-center dark:bg-graydark">
                <td
                  colSpan="3"
                  className="border-b border-[#eee] px-2 py-2 dark:border-strokedark xl:pl-4"
                >
                  No KYC data to display
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ul className="mt-4 flex justify-center">
        {Array.from(
          { length: Math.ceil(kycData.length / kycPerPage) },
          (_, i) => (
            <li key={i} className="mx-1">
              <button
                onClick={() => paginate(i + 1)}
                className={`rounded bg-bodydark px-4 py-2 font-bold text-white hover:bg-bodydark ${
                  currentPage === i + 1 ? "bg-primarydark" : "bg-secondarydark"
                }`}
              >
                {i + 1}
              </button>
            </li>
          ),
        )}
      </ul>
    </>
  );
};

export default UserKycTable;
