import axios from "axios";
import { useParams } from "react-router-dom";
import BASE_URL from "../../constant";
import { useEffect, useState } from "react";
import {
  MdPerson,
  MdEmail,
  MdPhone,
  MdDateRange,
  MdWork,
  MdLocationOn,
  MdWc,
  MdOutlineCardTravel,
} from "react-icons/md";

const OpportunityViewAdmin = () => {
  const { opportunityId } = useParams();
  const [opportunity, setOpportunity] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const date = new Date(opportunity?.dob).toDateString();

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
          <div className="flex justify-between">
            <h2 className="text-title-sm  md:text-title-lg mb-2">
              Opportunities Details
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-stroke px-5 py-2 dark:border-strokedark bg-white dark:bg-black">
            <div className="flex-1">
              <div className="">
                <p className="text-gray-600 mb-2 flex items-center gap-2">
                  {" "}
                  <MdPerson />
                  {`${opportunity.firstName} ${
                    opportunity.middleName ? opportunity.middleName + " " : ""
                  }${opportunity.lastName}`}
                </p>
                <p className="text-gray-600 mb-2 flex items-center gap-2">
                  <MdPhone /> Mobile Number: {opportunity.number}
                </p>
                <p className="text-gray-600 mb-2 flex items-center gap-2">
                  <MdOutlineCardTravel /> Lead Source: {opportunity.leadSource}
                </p>
                <p className="text-gray-600 mb-2 flex items-center gap-2">
                  <MdWork /> Occupation: {opportunity.occupation}
                </p>
                <p className="text-gray-600 mb-2 flex items-center gap-2">
                  <MdWork /> Status: {opportunity?.kycStatus}
                </p>
              </div>
              <div className="bg-white dark:bg-black">
                {opportunity.address ? (
                  <p className="text-gray-600 mb-2 flex items-center gap-2">
                    <MdLocationOn /> {opportunity?.address?.street}{" "}
                    {opportunity?.address.city}, {opportunity?.address.state}{" "}
                    {opportunity?.address.pinCode},{" "}
                    {opportunity.address.country}
                  </p>
                ) : null}
              </div>
            </div>

            {/* Second Column */}
            <div className="flex-1">
              <div className="">
                <p className="text-gray-600 mb-2 flex items-center gap-2">
                  <MdEmail /> Email: {opportunity.email}
                </p>
                <p className="text-gray-600 mb-2 flex items-center gap-2">
                  <MdWc /> Gender: {opportunity.gender}
                </p>
                <p className="text-gray-600 mb-2 flex items-center gap-2">
                  <MdDateRange /> Date of Birth: {date}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default OpportunityViewAdmin;
