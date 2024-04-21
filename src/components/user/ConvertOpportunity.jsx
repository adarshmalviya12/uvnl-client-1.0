import { useState } from "react";
import BASE_URL from "../../constant";
import axios from "axios";
import Loader from "../Loader";

const ConvertOpportunity = ({ opportunityId, setKycDetails }) => {
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    adharCardNumber: "",
    panCardNumber: "",
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

      const response = await axios.post(
        `${BASE_URL}/user/kyc/${opportunityId}`,
        formDataWithFiles,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setKycDetails(response.data.data.kyc);
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
        className=" active:bg-pink-600  mb-1 mr-1 rounded bg-primary px-1 py-0.5 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none md:px-3 md:py-1.5"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Submit KYC
      </button>
      {showModal && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none md:max-h-171.5">
          <div className="form-container relative mx-auto my-6 w-auto max-w-3xl">
            <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
              <div className="border-b border-stroke px-5 py-2">
                <h3 className="font-medium text-black">
                  Submit KYC for Opportunity
                </h3>
              </div>
              <div className="relative max-h-96 flex-auto overflow-y-auto p-6">
                {loading ? (
                  <Loader /> // Display loader when loading is true
                ) : (
                  <form
                    onSubmit={handleFormSubmit}
                    className="text-sm font-thin "
                  >
                    <div className="mb-4.5 flex flex-col gap-3 md:flex-row">
                      <div className="w-full xl:w-1/2">
                        <label
                          htmlFor="adharCardNumber"
                          className="mb-1.5 block text-black dark:text-white"
                        >
                          Adhar Card Number
                        </label>
                        <input
                          type="text"
                          name="adharCardNumber"
                          value={formData.adharCardNumber}
                          onChange={handleInputChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-1.5 py-0.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>
                      <div className="w-full xl:w-1/2">
                        <label
                          htmlFor="adharCardUrl"
                          className="mb-1.5 block text-black dark:text-white"
                        >
                          Upload Adhar Card
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          name="adharCardUrl"
                          onChange={handleFileInputChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-1.5 py-0.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>
                    </div>
                    <div className="mb-4.5 flex flex-col gap-3 md:flex-row">
                      <div className="w-full xl:w-1/2">
                        <label
                          htmlFor="panCardNumber"
                          className="mb-1.5 block text-black dark:text-white"
                        >
                          Pan Card Number
                        </label>
                        <input
                          type="text"
                          name="panCardNumber"
                          value={formData.panCardNumber}
                          onChange={handleInputChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-1.5 py-0.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>
                      <div className="w-full xl:w-1/2">
                        <label
                          htmlFor="panCardUrl"
                          className="mb-1.5 block text-black dark:text-white"
                        >
                          Upload Pan Card
                        </label>
                        <input
                          type="file"
                          name="panCardUrl"
                          accept="image/*"
                          onChange={handleFileInputChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-1.5 py-0.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>
                    </div>
                    <div className="mb-4.5 flex flex-col gap-3 md:flex-row">
                      <div className="w-full xl:w-1/2">
                        <label
                          htmlFor="passportImageUrl"
                          className="mb-1.5 block text-black dark:text-white"
                        >
                          Upload Passport Image
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          name="passportImageUrl"
                          onChange={handleFileInputChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-1.5 py-0.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>
                      <div className="w-full xl:w-1/2">
                        <label
                          htmlFor="signatureUrl"
                          className="mb-1.5 block text-black dark:text-white"
                        >
                          Upload Signature Image
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          name="signatureUrl"
                          onChange={handleFileInputChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-1.5 py-0.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>
                    </div>
                  </form>
                )}
                {errorMessage && (
                  <div className="text-danger">{errorMessage}</div> // Display error message if present
                )}
              </div>
              <div className="border-blueGray-200 rounded-b border-t border-solid">
                <div className="flex items-center justify-end gap-2 p-4">
                  <button
                    className="rounded bg-primary px-4 py-2 text-white hover:bg-opacity-90"
                    type="submit"
                    onClick={handleFormSubmit}
                  >
                    Submit
                  </button>
                  <button
                    className="rounded bg-danger px-4 py-2 text-white hover:bg-opacity-90"
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
