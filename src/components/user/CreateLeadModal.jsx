import { useState } from "react";
import { useLeads } from "../../context/LeadContext";
import axios from "axios";
import BASE_URL from "../../constant";
import DatePicker from "react-datepicker";

const CreateLeadModel = () => {
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    email: "",
    number: "",
    leadSource: "",
    dob: null, //
    street: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
    occupation: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, dob: date }); // Update dob with selected date
  };

  const { setLeads } = useLeads();
  const token = localStorage.getItem("token");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const currentYear = new Date().getFullYear();
    const dobYear = new Date(formData.dob).getFullYear();

    // Check if the DOB is at least five years ago
    if (currentYear - dobYear < 5) {
      setErrorMessage("DOB should be at least five years ago");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/user/lead`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLeads((prevLeads) => [...prevLeads, response.data.data.lead]);
      setShowModal(false);
    } catch (error) {
      console.error("Error creating lead:", error);
      setErrorMessage(error.response?.data.message || "An error occurred");
    }
  };

  return (
    <>
      <button
        className=" active:bg-pink-600  mb-1 mr-1 rounded bg-primary px-3 py-1.5 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Create lead
      </button>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-9999 flex items-center justify-center   overflow-y-auto overflow-x-hidden  outline-none focus:outline-none">
            <div className="relative mx-auto my-6 w-auto max-w-3xl">
              {/*content*/}
              <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none dark:bg-black">
                {/*header*/}
                <div className="border-b border-stroke px-5 py-2 dark:border-strokedark">
                  <h3 className="text-title-sm font-medium text-black dark:text-white">
                    Create Lead
                  </h3>
                </div>
                {/*body*/}
                <div className="relative max-h-80 flex-auto overflow-y-auto p-6 md:max-h-90 lg:max-h-115">
                  {errorMessage && (
                    <div className="mb-2 text-sm text-danger">
                      {errorMessage}
                    </div>
                  )}
                  <form action="" className="text-sm font-thin ">
                    {/* name  */}
                    <div className="mb-4.5 flex flex-col gap-3 md:flex-row">
                      <div className="w-full xl:w-1/3">
                        <label className="mb-1.5 block text-black dark:text-white">
                          First name <span className="text-meta-1">*</span>
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          placeholder="first name"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-1.5 py-0.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>

                      <div className="w-full xl:w-1/2">
                        <label className="mb-1.5 block text-black dark:text-white">
                          Middlename
                        </label>
                        <input
                          type="text"
                          name="middleName"
                          placeholder="middlename"
                          value={formData.middleName}
                          onChange={handleInputChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-1.5 py-0.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>

                      <div className="w-full xl:w-1/3">
                        <label className="mb-1.5 block text-black dark:text-white">
                          Last name <span className="text-meta-1">*</span>
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          placeholder="last name"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-1.5 py-0.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>
                    </div>
                    {/* email and phone no  */}
                    <div className="mb-4.5 flex flex-col gap-6 md:flex-row">
                      <div className="w-full xl:w-1/3">
                        <label className="mb-1.5 block text-black dark:text-white">
                          Email <span className="text-meta-1">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          placeholder="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-1.5 py-0.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>

                      <div className="w-full xl:w-1/3">
                        <label className="mb-1.5 block text-black dark:text-white">
                          Phone No<span className="text-meta-1">*</span>
                        </label>
                        <input
                          type="tel"
                          name="number"
                          placeholder="phone no"
                          value={formData.number}
                          onChange={handleInputChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-1.5 py-0.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>

                      <div className="w-full xl:w-1/3">
                        <label className="mb-1.5 block text-black dark:text-white">
                          Gender <span className="text-meta-1">*</span>
                        </label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-3 py-1.5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        >
                          <option value="" disabled>
                            select
                          </option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    {/* gender dob and lead status */}
                    <div className="mb-4.5 flex flex-col gap-6 md:flex-row">
                      <div className="w-full xl:w-1/3">
                        <label className="mb-1.5 block text-black dark:text-white">
                          Occupation <span className="text-meta-1">*</span>
                        </label>
                        <input
                          type="text"
                          name="occupation"
                          placeholder="Occupation"
                          value={formData.occupation}
                          onChange={handleInputChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-1.5 py-0.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>

                      <div className="w-full xl:w-1/3">
                        <label className="mb-1.5 block text-black dark:text-white">
                          Date of Birth <span className="text-meta-1">*</span>
                        </label>
                        {/* <input
                          type="date"
                          name="dob"
                          placeholder="date of birth"
                          value={formData.dob}
                          onChange={handleInputChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        /> */}
                        <DatePicker
                          selected={formData.dob} // Set selected date
                          onChange={handleDateChange} // Handle date change
                          dateFormat="dd/MM/yyyy"
                          maxDate={new Date("01-01-2021")}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-1.5 py-0.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          isClearable
                        />
                      </div>

                      <div className="w-full xl:w-1/3">
                        <label className="mb-1.5 block text-black dark:text-white">
                          Lead Source
                        </label>
                        <select
                          name="leadSource"
                          value={formData.leadSource}
                          onChange={handleInputChange}
                          className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-3 py-1.5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        >
                          <option value="" disabled>
                            select
                          </option>
                          <option value="marketing">marketing</option>
                          <option value="call">call</option>
                          <option value="email">email</option>
                        </select>
                      </div>
                    </div>
                    {/* Address */}
                    <div>
                      <h1 className="mb-3 text-title-sm text-white">
                        Address :
                      </h1>
                      <div className="mb-4.5 flex flex-col gap-6 md:flex-row">
                        <div className="w-full xl:w-1/3">
                          <label className="mb-1.5 block text-black dark:text-white">
                            Street
                          </label>
                          <input
                            type="text"
                            name="street"
                            placeholder="street"
                            value={formData.street}
                            onChange={handleInputChange}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-1.5 py-0.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          />
                        </div>

                        <div className="w-full xl:w-1/3">
                          <label className="mb-1.5 block text-black dark:text-white">
                            City
                          </label>
                          <input
                            type="text"
                            name="city"
                            placeholder="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-1.5 py-0.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          />
                        </div>
                        <div className="w-full xl:w-1/3">
                          <label className="mb-1.5 block text-black dark:text-white">
                            State
                          </label>
                          <input
                            type="text"
                            name="state"
                            placeholder="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-1.5 py-0.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          />
                        </div>
                      </div>
                      <div className="mb-4.5 flex flex-col gap-6 md:flex-row">
                        <div className="w-full xl:w-1/2">
                          <label className="mb-1.5 block text-black dark:text-white">
                            country
                          </label>
                          <input
                            type="text"
                            name="country"
                            placeholder="Country"
                            value={formData.country}
                            onChange={handleInputChange}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-1.5 py-0.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          />
                        </div>

                        <div className="w-full xl:w-1/2">
                          <label className="mb-1.5 block text-black dark:text-white">
                            Pincode
                          </label>
                          <input
                            type="number"
                            name="pinCode"
                            placeholder="Pincode"
                            value={formData.pinCode}
                            onChange={handleInputChange}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-1.5 py-0.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                {/*footer*/}
                <div className="border-blueGray-200 flex items-center justify-end gap-2 rounded-b border-t border-solid p-4 text-title-sm">
                  <button
                    className="inline-flex items-center justify-center bg-danger px-2 py-1 text-center font-normal text-white hover:bg-opacity-90 md:px-2 xl:px-4"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="inline-flex items-center justify-center bg-primary px-2 py-1 text-center font-normal  text-white hover:bg-opacity-90 md:px-2 xl:px-4"
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
export default CreateLeadModel;
