import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../constant";

const EditUserDetails = () => {
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/admin/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const formattedDOB = response.data.data.user.dob
          ? new Date(response.data.data.user.dob).toISOString().split("T")[0]
          : "";
        setFormData({
          firstName: response.data.data.user.firstName || "",
          middleName: response.data.data.user.middleName || "",
          lastName: response.data.data.user.lastName || "",
          email: response.data.data.user.email || "",
          number: response.data.data.user.number || "",
          dob: formattedDOB || "",
        });
        setLoading(false);
      } catch (error) {
        setError(error.response.data.message);
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `${BASE_URL}/admin/user/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data.data);
      alert("User updated successfully!");
      setEdit(false);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-black shadow-md rounded-md dark:bg-gray-800">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600 dark:text-red-400">Error: {error}</p>
      ) : (
        <form className=" space-y-4  " onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-4.5 flex flex-col gap-3 md:flex-row">
            <div className="w-full xl:w-1/3">
              <label className="mb-1.5 block text-black dark:text-white">
                First Name <span className="text-meta-1">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
            <div className="w-full xl:w-1/3">
              <label className="mb-2.5 block text-black dark:text-white">
                Middle Name <span className="text-meta-1">*</span>
              </label>
              <input
                type="text"
                name="middleName"
                placeholder="Middle Name"
                value={formData.middleName}
                onChange={handleInputChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
            <div className="w-full xl:w-1/3">
              <label className="mb-2.5 block text-black dark:text-white">
                Last Name <span className="text-meta-1">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
          </div>
          {/* Email */}
          <div className="mb-4.5 flex flex-col gap-6 md:flex-row">
            <div className="w-full xl:w-1/3">
              <label className="mb-2.5 block text-black dark:text-white">
                Email <span className="text-meta-1">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
            <div className="w-full xl:w-1/3">
              <label className="mb-2.5 block text-black dark:text-white">
                Phone <span className="text-meta-1">*</span>
              </label>
              <input
                type="tel"
                name="number"
                placeholder="number"
                value={formData.number}
                onChange={handleInputChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
            <div className="w-full xl:w-1/3">
              <label className="mb-2.5 block text-black dark:text-white">
                Data of Birth <span className="text-meta-1">*</span>
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob.split("T")[0]} // Assuming the dob is in ISO format
                placeholder="Date of birth"
                onChange={handleInputChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
          </div>

          <button
            type="submit"
            className=" bg-primary  text-white active:bg-pink-600 font-bold uppercase text-sm px-3 py-1.5 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default EditUserDetails;
