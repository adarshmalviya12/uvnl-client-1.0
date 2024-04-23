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
  MdCheck,
  MdLocationOn,
  MdWc,
  MdOutlineCardTravel,
} from "react-icons/md";
import Convert from "../Convert";
import CallModel from "../CallModel";
import WhatsappModel from "../WhatsappModel";
import LeadLogs from "./LeadLogs";
import { formatDate } from "../../utils/date";

const ViewLead = () => {
  const { leadId } = useParams();
  const [lead, setLead] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const date = formatDate(lead?.dob);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchLead = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/lead/${leadId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLead(response.data.data.lead);
        setLoading(false);
      } catch (error) {
        setError(error.response.data.message);
        setLoading(false);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/products`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProducts(response.data.data.products);
        setLoading(false);
      } catch (error) {
        setErrorMessage(error.response.data.message);
        setLoading(false);
      }
    };

    fetchLead();
    fetchProducts();
  }, []);

  return (
    <>
      <div className="p-10 text-black dark:text-white">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div className="">
            <div className="justify-between md:flex">
              {" "}
              <h2 className="mb-2  text-title-sm md:text-title-lg">
                Leads Details :
              </h2>
              <div className=" mb-2 justify-end text-xs md:flex ">
                <Convert products={products} leadId={lead?._id} />
                <CallModel callonNo={lead.number} />
                <WhatsappModel whatsappNo={lead.number} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 border-b border-stroke bg-white px-5 py-2 text-xs dark:border-strokedark dark:bg-black md:grid-cols-2 md:text-sm">
              <div className="flex-1">
                <div className="">
                  {/* Your existing code for the first column */}
                  <p className="text-gray-600 mb-2 flex items-center gap-2">
                    <MdPerson /> Name :{" "}
                    {`${lead.firstName} ${
                      lead.middleName ? lead.middleName + " " : ""
                    }${lead.lastName}`}
                  </p>
                  <p className="text-gray-600 mb-2 flex items-center gap-2">
                    <MdPhone /> Mobile Number : {lead.number}
                  </p>
                  <p className="text-gray-600 mb-2 flex items-center gap-2">
                    <MdOutlineCardTravel /> Lead Source : {lead.leadSource}
                  </p>
                  <p className="text-gray-600 mb-2 flex items-center gap-2">
                    <MdWork /> Occupation : {lead.occupation}
                  </p>
                </div>
                <div>
                  {lead?.address ? (
                    <p className="text-gray-600 mb-2 flex items-center gap-2">
                      <MdLocationOn /> Address : {lead?.address?.street}{" "}
                      {lead?.address.city} {lead?.address.state}{" "}
                      {lead?.address.pinCode} , {lead.address.country}
                    </p>
                  ) : null}
                </div>
              </div>

              {/* Second Column */}
              <div className="flex-1 ">
                <div className=" ">
                  {/* Content for the second column */}
                  <p className="text-gray-600 mb-2 flex items-center gap-2">
                    <MdEmail /> Email: {lead.email}
                  </p>
                  <p className="text-gray-600 mb-2 flex items-center gap-2">
                    <MdWc /> Gender: {lead.gender}
                  </p>
                  <p className="text-gray-600 mb-2 flex items-center gap-2">
                    <MdDateRange /> Date of Birth: {date}
                  </p>
                  <p className="text-gray-600 mb-2 flex items-center gap-2">
                    <MdCheck /> Converted: {lead.isConverted ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* logs */}
        <div className="mt-5">
          <LeadLogs lead={lead} setLead={setLead} />
        </div>
      </div>
    </>
  );
};

export default ViewLead;
