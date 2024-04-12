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
        }
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
        className=" bg-primary  text-white active:bg-pink-600 font-bold uppercase text-sm px-3 py-1.5 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Add Followups
      </button>
      {showModal ? (
        <>
          <div className="justify-center z-9999 items-center flex overflow-x-hidden overflow-y-auto md:max-h-171.5 fixed inset-0 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-black outline-none focus:outline-none">
                <div className="border-b border-stroke px-5 py-2 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    FollowUps
                  </h3>
                </div>
                <div className="relative p-6 flex-auto overflow-y-auto max-h-80 md:max-h-90 lg:max-h-115">
                  <form action="" className="font-thin text-sm ">
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
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
                          className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-1.5 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        ></textarea>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="flex items-center text-title-sm justify-end gap-2 p-4 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="inline-flex items-center justify-center bg-danger py-1 px-2 text-center font-normal text-white hover:bg-opacity-90 md:px-2 xl:px-4"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="inline-flex items-center justify-center bg-primary py-1 px-2 text-center font-normal text-white hover:bg-opacity-90 md:px-2 xl:px-4"
                    type="button"
                    onClick={handleFormSubmit}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default CreateLeadFollowUp;
