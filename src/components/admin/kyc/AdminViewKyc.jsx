import BASE_URL from "../../../constant";
import axios from "axios";
import { MdMail, MdPerson } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ViewImage from "../../ViewImage";

const AdminViewKyc = () => {
  const { kycId } = useParams();
  const [kyc, setKyc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKyc = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/admin/kyc/${kycId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setKyc(response.data.data);
      } catch (error) {
        setError(error.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchKyc();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <h1 className="mb-4 text-title-lg">User kyc Details</h1>

      {kyc ? (
        <div className="border-b border-stroke bg-white px-3 py-2 text-sm font-normal dark:border-strokedark dark:bg-black md:px-5 md:text-base">
          <div>
            <p className="text-gray-600 mb-2 flex items-center gap-2">
              <MdPerson /> <span className="font-bold">Name:</span>{" "}
              {kyc?.opportunity?.firstName} {kyc?.opportunity?.lastName}
            </p>
            <p className="text-gray-600 mb-2 flex items-center gap-2">
              <MdMail />
              <span className="font-bold">Kyc Status:</span> {kyc?.kycStatus}
            </p>
            <p className="text-gray-600 mb-2 flex items-center gap-2">
              <MdMail />
              <span className="font-bold">adharCardNumber:</span>{" "}
              {kyc.adharCardNumber}
            </p>
            <p className="text-gray-600 mb-2 flex items-center gap-2">
              <MdMail />
              <span className="font-bold">panCardNumber:</span>{" "}
              {kyc.panCardNumber}
            </p>
            {/* Here's the modification for the PAN card image as an example */}
            <div className="text-gray-600 mb-2 gap-2  md:flex  ">
              <ViewImage imageLink={kyc.signatureUrl} imageName="signature" />
              <ViewImage imageLink={kyc.adharCardUrl} imageName="Adhar Card" />
              <ViewImage
                imageLink={kyc.passportImageUrl}
                imageName="Passport Image"
              />
              <ViewImage imageLink={kyc.panCardUrl} imageName="Pancard" />
            </div>
          </div>
        </div>
      ) : (
        <div>No KYC data found.</div>
      )}
    </>
  );
};
export default AdminViewKyc;
