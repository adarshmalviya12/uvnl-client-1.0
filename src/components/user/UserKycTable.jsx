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
      <div className="flex justify-between items-center text-title-sm md:text-title-md mb-3">
        <h1 className="text-black dark:text-white">KYC Data</h1>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto bg-white text-xs md:text-base">
          <thead>
            <tr className="dark:bg-black bg-bodydark text-center">
              <th className="px-2 py-2 xl:pl-11 font-bold text-black dark:text-white min-w-[100px]">
                Opportunity Name
              </th>
              <th className="px-2 py-2 xl:pl-11 font-bold text-black dark:text-white min-w-[100px]">
                KYC Status
              </th>
              <th className="px-2 py-2 xl:pl-11 font-bold text-black dark:text-white min-w-[100px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentKyc.length !== 0 ? (
              currentKyc.map((kyc) => (
                <tr className="dark:bg-graydark text-center" key={kyc._id}>
                  <td className="px-2 py-2 xl:pl-4 border-b border-[#eee] dark:border-strokedark">
                    {kyc.opportunity.firstName} {kyc.opportunity.lastName}
                  </td>
                  <td className="px-2 py-2 xl:pl-4 border-b border-[#eee] dark:border-strokedark">
                    {kyc.kycStatus}
                  </td>
                  <td className="border-b border-[#eee] py-2 px-2  dark:border-strokedark xl:pl-4">
                    <div className="flex gap-2 justify-center">
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
              <tr className="dark:bg-graydark text-center">
                <td
                  colSpan="3"
                  className="px-2 py-2 xl:pl-4 border-b border-[#eee] dark:border-strokedark"
                >
                  No KYC data to display
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ul className="flex justify-center mt-4">
        {Array.from(
          { length: Math.ceil(kycData.length / kycPerPage) },
          (_, i) => (
            <li key={i} className="mx-1">
              <button
                onClick={() => paginate(i + 1)}
                className={`py-2 px-4 font-bold rounded bg-bodydark text-white hover:bg-bodydark ${
                  currentPage === i + 1 ? "bg-primarydark" : "bg-secondarydark"
                }`}
              >
                {i + 1}
              </button>
            </li>
          )
        )}
      </ul>
    </>
  );
};

export default UserKycTable;
