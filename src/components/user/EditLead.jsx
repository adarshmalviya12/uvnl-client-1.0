import axios from "axios";
import { useParams } from "react-router-dom";
import BASE_URL from "../../constant";
import { useEffect, useState } from "react";

const EditLead = () => {
  const { leadId } = useParams();
  const [lead, setLead] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    email: "",
    number: "",
    leadSource: "",
    dob: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
    occupation: "",
    leadStatus: "",
  });

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/user/lead/${leadId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFormData({
          firstName: response.data.data.lead.firstName || "",
          middleName: response.data.data.lead.middleName || "",
          lastName: response.data.data.lead.lastName || "",
          gender: response.data.data.lead.gender || "",
          email: response.data.data.lead.email || "",
          number: response.data.data.lead.number || "",
          leadSource: response.data.data.lead.leadSource || "",
          dob: response.data.data.lead.dob || "",
          street: response.data.data.lead.address.street || "",
          city: response.data.data.lead.address.city || "",
          state: response.data.data.lead.address.state || "",
          pinCode: response.data.data.lead.address.pinCode || "",
          country: response.data.data.lead.address.country || "",
          occupation: response.data.data.lead.occupation || "",
          leadStatus: response.data.data.lead.leadStatus || "",
        });
        setLoading(false);
      } catch (error) {
        setError(error.response.data.message);
        setLoading(false);
      }
    };

    fetchLead();
  }, [leadId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`${BASE_URL}/user/lead/${leadId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Add success notification or redirect
      alert("Lead updated successfully!");
    } catch (error) {
      alert(error.response.data.message);
      // Add error notification
    }
  };
  return (
    <div className="relative bg-white p-6 flex-auto overflow-y-auto max-h-80 md:max-h-90 lg:max-h-115">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <form className="  font-thin text-sm" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4.5 flex flex-col gap-6 md:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white font-bold">
                First Name <span className="text-meta-1">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
            {/* Add similar inputs with corresponding name and value attributes */}
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white font-bold">
                Last Name <span className="text-meta-1">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
          </div>
          {/* Email and Phone */}
          <div className="mb-4.5 flex flex-col gap-6 md:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white font-bold">
                Email <span className="text-meta-1">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white font-bold">
                Phone <span className="text-meta-1">*</span>
              </label>
              <input
                type="tel"
                name="number"
                placeholder="number"
                value={formData.number}
                onChange={handleInputChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
          </div>
          {/* Gender and Date of Birth */}
          <div className="mb-4.5 flex flex-col gap-6 md:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white font-bold">
                Gender <span className="text-meta-1">*</span>
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white font-bold">
                Date of Birth <span className="text-meta-1">*</span>
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
          </div>
          {/* Occupation */}
          <div className="mb-4.5 flex flex-col gap-6 md:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white font-bold">
                Occupation <span className="text-meta-1">*</span>
              </label>
              <input
                type="text"
                name="occupation"
                placeholder="Occupation"
                value={formData.occupation}
                onChange={handleInputChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white font-bold">
                Lead Status <span className="text-meta-1">*</span>
              </label>
              <select
                name="leadStatus"
                value={formData.leadStatus}
                onChange={handleInputChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              >
                <option disabled>Select </option>
                <option value="Not Contacted">Not Contacted</option>
                <option value="Contacted">Contacted</option>
                <option value="Working">Working</option>
                <option value="Converted">Converted</option>
                <option value="Not converted">Not converted</option>
              </select>
            </div>
          </div>

          <div>
            <h1 className="text-title-sm text-white mb-3">Address:</h1>
            <div className="mb-4.5 flex flex-col gap-6 md:flex-row">
              {/* Street */}
              <div className="w-full xl:w-1/3">
                <label className="mb-2.5 block text-black dark:text-white font-bold">
                  Street <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  name="street"
                  placeholder="Street"
                  value={formData.street}
                  onChange={handleInputChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
              {/* City */}
              <div className="w-full xl:w-1/3">
                <label className="mb-2.5 block text-black dark:text-white font-bold">
                  City <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
              {/* State */}
              <div className="w-full xl:w-1/3">
                <label className="mb-2.5 block text-black dark:text-white font-bold">
                  State <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
            </div>
            <div className="mb-4.5 flex flex-col gap-6 md:flex-row">
              {/* Country */}
              <div className="w-full xl:w-1/3">
                <label className="mb-2.5 block text-black dark:text-white font-bold">
                  Country <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
              {/* Pincode */}
              <div className="w-full xl:w-1/3">
                <label className="mb-2.5 block text-black dark:text-white font-bold">
                  Pincode <span className="text-meta-1">*</span>
                </label>
                <input
                  type="number"
                  name="pinCode"
                  placeholder="Pincode"
                  value={formData.pinCode}
                  onChange={handleInputChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-md transition duration-300"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default EditLead;
