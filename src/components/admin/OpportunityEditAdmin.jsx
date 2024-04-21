import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BASE_URL from "../../constant";
import axios from "axios";

const OpportunityEditAdmin = () => {
  const { opportunityId } = useParams();
  const [opportunity, setOpportunity] = useState({});
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
    kycStatus: "",
    dob: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
    occupation: "",
  });

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
          },
        );
        setOpportunity(response.data.data.opportunity);
        setFormData({
          firstName: response.data.data.opportunity.firstName || "",
          middleName: response.data.data.opportunity.middleName || "",
          lastName: response.data.data.opportunity.lastName || "",
          gender: response.data.data.opportunity.gender || "",
          email: response.data.data.opportunity.email || "",
          number: response.data.data.opportunity.number || "",
          leadSource: response.data.data.opportunity.leadSource || "",
          dob: response.data.data.opportunity.dob || "",
          street: response.data.data.opportunity.address.street || "",
          city: response.data.data.opportunity.address.city || "",
          state: response.data.data.opportunity.address.state || "",
          pinCode: response.data.data.opportunity.address.pinCode || "",
          country: response.data.data.opportunity.address.country || "",
          occupation: response.data.data.opportunity.occupation || "",
          kycStatus: response.data.data.opportunity.kycStatus || "",
        });
        setLoading(false);
      } catch (error) {
        setError(error.response?.data.message);
        setLoading(false);
      }
    };

    fetchOpportunity();
  }, [opportunityId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `${BASE_URL}/admin/opportunity/${opportunityId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // Add success notification or redirect
      alert("Opportunity updated successfully!");
    } catch (error) {
      alert(error.response.data.message);
      // Add error notification
    }
  };
  return (
    <div className="relative max-h-80 flex-auto overflow-y-auto bg-white p-6 md:max-h-90 lg:max-h-115">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <form className="text-sm font-thin" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4.5 flex flex-col gap-6 md:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                First Name <span className="text-meta-1">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-3 py-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
            {/* Add similar inputs with corresponding name and value attributes */}
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Last Name <span className="text-meta-1">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-3 py-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
          </div>
          {/* Email and Phone */}
          <div className="mb-4.5 flex flex-col gap-6 md:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Email <span className="text-meta-1">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-3 py-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Phone <span className="text-meta-1">*</span>
              </label>
              <input
                type="tel"
                name="number"
                placeholder="number"
                value={formData.number}
                onChange={handleInputChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-3 py-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
          </div>
          {/* Gender and Date of Birth */}
          <div className="mb-4.5 flex flex-col gap-6 md:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Gender <span className="text-meta-1">*</span>
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-3 py-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Date of Birth <span className="text-meta-1">*</span>
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-3 py-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
          </div>
          {/* Occupation */}
          <div className="mb-4.5 flex flex-col gap-6 md:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Occupation <span className="text-meta-1">*</span>
              </label>
              <input
                type="text"
                name="occupation"
                placeholder="Occupation"
                value={formData.occupation}
                onChange={handleInputChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-3 py-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Kyc Status <span className="text-meta-1">*</span>
              </label>
              <select
                name="kycStatus"
                value={formData.kycStatus}
                onChange={handleInputChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-3 py-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              >
                <option disabled>Select </option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Pending">Pending</option>
                <option value="Needs">Needs</option>
                <option value="Clarification">Clarification</option>
              </select>
            </div>
          </div>

          <div>
            <h1 className="mb-3 text-title-sm text-white">Address:</h1>
            <div className="mb-4.5 flex flex-col gap-6 md:flex-row">
              {/* Street */}
              <div className="w-full xl:w-1/3">
                <label className="mb-2.5 block text-black dark:text-white">
                  Street <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  name="street"
                  placeholder="Street"
                  value={formData.street}
                  onChange={handleInputChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-3 py-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
              {/* City */}
              <div className="w-full xl:w-1/3">
                <label className="mb-2.5 block text-black dark:text-white">
                  City <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-3 py-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
              {/* State */}
              <div className="w-full xl:w-1/3">
                <label className="mb-2.5 block text-black dark:text-white">
                  State <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-3 py-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
            </div>
            <div className="mb-4.5 flex flex-col gap-6 md:flex-row">
              {/* Country */}
              <div className="w-full xl:w-1/3">
                <label className="mb-2.5 block text-black dark:text-white">
                  Country <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-3 py-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
              {/* Pincode */}
              <div className="w-full xl:w-1/3">
                <label className="mb-2.5 block text-black dark:text-white">
                  Pincode <span className="text-meta-1">*</span>
                </label>
                <input
                  type="number"
                  name="pinCode"
                  placeholder="Pincode"
                  value={formData.pinCode}
                  onChange={handleInputChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-3 py-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <button
            type="submit"
            className="hover:bg-primary-dark rounded-md bg-primary px-6 py-2 font-semibold text-white transition duration-300"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};
export default OpportunityEditAdmin;
