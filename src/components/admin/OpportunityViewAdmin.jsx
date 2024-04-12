import axios from "axios";
import { useParams } from "react-router-dom";
import BASE_URL from "../../constant";
import { useEffect, useState } from "react";

const OpportunityViewAdmin = () => {
  const { opportunityId } = useParams();
  const [opportunity, setOpportunity] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOpportunity = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/admin/opportunity/${opportunityId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOpportunity(response.data.data.opportunity);
        setLoading(false);
      } catch (error) {
        setError(error.response.data.message);
        setLoading(false);
      }
    };

    fetchOpportunity();
  }, [opportunityId]);

  return (
    <div className="p-10 text-black dark:text-white">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          <h2 className="text-title-lg font-extrabold mb-2 inline-block">
            Opportunities Details :
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-stroke px-5 py-2 dark:border-strokedark bg-white dark:bg-black">
            <div className="bg-white dark:bg-black">
              <h2 className="text-xl font-semibold mb-4">
                {`${opportunity?.firstName} ${
                  opportunity?.middleName ? opportunity?.middleName + " " : ""
                }${opportunity?.lastName}`}
              </h2>
              <p className="text-gray-600 mb-2">Email: {opportunity?.email}</p>
              <p className="text-gray-600 mb-2">
                Mobile Number: {opportunity?.number}
              </p>
              <p className="text-gray-600 mb-2">
                Created By: {opportunity?.createdBy}
              </p>
              <p className="text-gray-600 mb-2">
                KYC Status: {opportunity?.kyc.kycStatus}
              </p>
            </div>
            <div className="bg-white dark:bg-black">
              <h2 className="text-title-md font-extrabold mb-4">Address:</h2>
              {opportunity?.address?.street} {opportunity?.address?.city}{" "}
              {opportunity?.address?.state} {opportunity?.address?.pinCode}{" "}
              {opportunity?.address?.country}
            </div>
            <div>
              <img src={opportunity?.kyc.panCardUrl} alt="adharcard" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default OpportunityViewAdmin;
