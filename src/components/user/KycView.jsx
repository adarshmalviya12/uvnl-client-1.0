import { useState, useEffect } from "react";
import axios from "axios";
import { MdMail, MdPerson, MdPhone } from "react-icons/md";
import { useParams } from "react-router-dom";
import BASE_URL from "../../constant";

const KycView = () => {
  const { kycId } = useParams();
  const [kyc, setKyc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKyc = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/user/kyc/${kycId}`, {
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
  }, [kycId]);

  if (loading) {
    return <div>Loading...</div>; // Here you can replace this with a spinner or any loading component you prefer
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message
  }

  return (
    <>
      <h1 className="text-title-lg mb-4">User Details</h1>
      {kyc ? (
        <div className="border-b border-stroke font-normal text-sm md:text-base px-3 md:px-5 py-2 dark:border-strokedark bg-white dark:bg-black">
          <div>
            <p className="text-gray-600 mb-2 flex items-center gap-2">
              <MdPerson /> <span className="font-bold">Name:</span>{" "}
              {kyc?.opportunity?.firstName} {kyc?.opportunity?.lastName}
            </p>
            <p className="text-gray-600 mb-2 flex items-center gap-2">
              <MdMail />
              <span className="font-bold">Kyc Status:</span> {kyc.kycStatus}
            </p>
            {/* Here's the modification for the PAN card image as an example */}
            <p className="text-gray-600 mb-2 flex items-center gap-2">
              <a
                href={kyc.panCardUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={kyc.panCardUrl}
                  alt="PAN card"
                  style={{ maxWidth: "300px", maxHeight: "300px" }}
                />
              </a>
            </p>
            {/* Repeat the pattern for other documents */}
            <p className="text-gray-600 mb-2 flex items-center gap-2">
              <a
                href={kyc.adharCardUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={kyc.adharCardUrl}
                  alt="Aadhar card"
                  style={{ maxWidth: "300px", maxHeight: "300px" }}
                />
              </a>
            </p>
            <p className="text-gray-600 mb-2 flex items-center gap-2">
              <a
                href={kyc.signatureUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={kyc.signatureUrl}
                  alt="Signature"
                  style={{ maxWidth: "300px", maxHeight: "300px" }}
                />
              </a>
            </p>
            <p className="text-gray-600 mb-2 flex items-center gap-2">
              <a
                href={kyc.passportImageUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={kyc.passportImageUrl}
                  alt="Passport"
                  style={{ maxWidth: "300px", maxHeight: "300px" }}
                />
              </a>
            </p>
          </div>
        </div>
      ) : (
        <div>No KYC data found.</div>
      )}
    </>
  );
};

export default KycView;
