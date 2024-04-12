import { useState } from "react";
import BASE_URL from "../../constant";
import axios from "axios";
import Loader from "../Loader";

const ConvertOpportunity = ({ opportunityId, kycId }) => {
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    adharCardNumber: "",
    panCardNumber: "",
    kycId: kycId,
  });
  const [fileInputs, setFileInputs] = useState({
    adharCardUrl: null,
    panCardUrl: null,
    passportImageUrl: null,
    signatureUrl: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileInputChange = (e) => {
    const { name, files } = e.target;
    setFileInputs({ ...fileInputs, [name]: files[0] });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const formDataWithFiles = new FormData();
      formDataWithFiles.append("adharCardNumber", formData.adharCardNumber);
      formDataWithFiles.append("panCardNumber", formData.panCardNumber);
      formDataWithFiles.append("adharCardUrl", fileInputs.adharCardUrl);
      formDataWithFiles.append("panCardUrl", fileInputs.panCardUrl);
      formDataWithFiles.append("passportImageUrl", fileInputs.passportImageUrl);
      formDataWithFiles.append("signatureUrl", fileInputs.signatureUrl);

      await axios.post(
        `${BASE_URL}/user/kyc/${opportunityId}`,
        formDataWithFiles,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("KYC submitted successfully!");
      setShowModal(false);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className=" bg-primary  text-white text-xs active:bg-pink-600 font-bold uppercase px-1 py-0.5 md:px-3 md:py-1.5 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Submit KYC
      </button>
      {showModal && (
        <div className="justify-center z-9999 items-center flex overflow-x-hidden overflow-y-auto md:max-h-171.5 fixed inset-0 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl form-container">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="border-b border-stroke px-5 py-2">
                <h3 className="font-medium text-black">
                  Submit KYC for Opportunity
                </h3>
              </div>
              <div className="relative p-6 flex-auto overflow-y-auto max-h-96">
                {loading ? (
                  <Loader /> // Display loader when loading is true
                ) : (
                  <form
                    onSubmit={handleFormSubmit}
                    enctype="multipart/form-data"
                  >
                    <div className="mb-4">
                      <label
                        htmlFor="adharCardNumber"
                        className="block text-black mb-2"
                      >
                        Adhar Card Number
                      </label>
                      <input
                        type="text"
                        name="adharCardNumber"
                        value={formData.adharCardNumber}
                        onChange={handleInputChange}
                        className="w-full border border-stroke rounded py-1.5 px-3 outline-none focus:border-primary"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="panCardNumber"
                        className="block text-black mb-2"
                      >
                        Pan Card Number
                      </label>
                      <input
                        type="text"
                        name="panCardNumber"
                        value={formData.panCardNumber}
                        onChange={handleInputChange}
                        className="w-full border border-stroke rounded py-1.5 px-3 outline-none focus:border-primary"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="adharCardUrl"
                        className="block text-black mb-2"
                      >
                        Upload Adhar Card
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        name="adharCardUrl"
                        onChange={handleFileInputChange}
                        className="w-full border border-stroke rounded py-1.5 px-3 outline-none focus:border-primary"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="panCardUrl"
                        className="block text-black mb-2"
                      >
                        Upload Pan Card
                      </label>
                      <input
                        type="file"
                        name="panCardUrl"
                        accept="image/*"
                        onChange={handleFileInputChange}
                        className="w-full border border-stroke rounded py-1.5 px-3 outline-none focus:border-primary"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="passportImageUrl"
                        className="block text-black mb-2"
                      >
                        Upload Passport Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        name="passportImageUrl"
                        onChange={handleFileInputChange}
                        className="w-full border border-stroke rounded py-1.5 px-3 outline-none focus:border-primary"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="signatureUrl"
                        className="block text-black mb-2"
                      >
                        Upload Signature Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        name="signatureUrl"
                        onChange={handleFileInputChange}
                        className="w-full border border-stroke rounded py-1.5 px-3 outline-none focus:border-primary"
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        className="bg-primary text-white py-2 px-4 rounded hover:bg-opacity-90"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                )}
                {errorMessage && (
                  <div className="text-red-500">{errorMessage}</div> // Display error message if present
                )}
              </div>
              <div className="border-t border-solid border-blueGray-200 rounded-b">
                <div className="flex items-center justify-end p-4 gap-2">
                  <button
                    className="bg-danger text-white py-2 px-4 rounded hover:bg-opacity-90"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConvertOpportunity;
