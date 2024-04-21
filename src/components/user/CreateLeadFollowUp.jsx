import axios from "axios";
import { useState } from "react";
import BASE_URL from "../../constant";

const CreateLeadFollowUp = ({ lead, setFollowUps }) => {
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    type: "",
    nextFollowUpDate: "",
    callStatus: "",
    remarks: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Lead in ViewLead:", lead);
    try {
      const response = await axios.post(
        `${BASE_URL}/user/followup/${lead._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setFollowUps((prevFollowUps = []) => [
        ...prevFollowUps,
        response.data.data,
      ]);
      setShowModal(false);
    } catch (error) {
      console.error("Error creating follow-up:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
    }
  };
  return (
    <>
      <button
        className=" active:bg-pink-600  mb-1 mr-1 rounded bg-primary px-3 py-1.5 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Add Followups
      </button>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-9999 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none md:max-h-171.5">
            <div className="relative mx-auto my-6 w-auto max-w-3xl">
              <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none dark:bg-black">
                <div className="border-b border-stroke px-5 py-2 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    FollowUps
                  </h3>
                </div>
                <div className="relative max-h-80 flex-auto overflow-y-auto p-6 md:max-h-90 lg:max-h-115">
                  <form action="" className="text-sm font-thin ">
                    <div className="mb-4.5 flex flex-col gap-6 md:flex-row">
                      <div className="w-full xl:w-1/3">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Follow-up Type <span className="text-meta-1">*</span>
                        </label>
                        <input
                          type="text"
                          name="type"
                          placeholder="Follow-up Type"
                          value={formData.type}
                          onChange={handleInputChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-3 py-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>
                      <div className="w-full xl:w-1/3">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Next Follow-up Date{" "}
                          <span className="text-meta-1">*</span>
                        </label>
                        <input
                          type="datetime-local"
                          name="nextFollowUpDate"
                          value={formData.nextFollowUpDate}
                          onChange={handleInputChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-3 py-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>
                      <div className="w-full xl:w-1/3">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Call Status <span className="text-meta-1">*</span>
                        </label>
                        <select
                          name="callStatus"
                          value={formData.callStatus}
                          onChange={handleInputChange}
                          className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-3 py-1.5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        >
                          <option value="" disabled>
                            Select
                          </option>
                          <option value="not contacted">Not Contacted</option>
                          <option value="received">Received</option>
                          <option value="not picking">Not Picking</option>
                          <option value="lost">Lost</option>
                          <option value="busy">Busy</option>
                          <option value="not reachable">Not Reachable</option>
                          <option value="converted">Converted</option>
                        </select>
                      </div>
                    </div>
                    <div className="mb-4.5 flex flex-col gap-6 md:flex-row">
                      <div className="w-full">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Remarks
                        </label>
                        <textarea
                          name="remarks"
                          value={formData.remarks}
                          onChange={handleInputChange}
                          rows="3"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-3 py-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        ></textarea>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="border-blueGray-200 flex items-center justify-end gap-2 rounded-b border-t border-solid p-4 text-title-sm">
                  <button
                    className="inline-flex items-center justify-center bg-danger px-2 py-1 text-center font-normal text-white hover:bg-opacity-90 md:px-2 xl:px-4"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="inline-flex items-center justify-center bg-primary px-2 py-1 text-center font-normal text-white hover:bg-opacity-90 md:px-2 xl:px-4"
                    type="button"
                    onClick={handleFormSubmit}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </>
  );
};

export default CreateLeadFollowUp;
