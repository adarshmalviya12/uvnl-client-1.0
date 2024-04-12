import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BASE_URL from "../../constant";
import { MdMail, MdPerson, MdPhone } from "react-icons/md";

const ViewUser = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    number: "",
    dob: "",
  });

  const date = user && user.dob ? new Date(user.dob).toDateString() : "N/A";
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/admin/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.data.user);

        const formattedDOB = response.data.data.user.dob
          ? new Date(response.data.data.user.dob).toISOString().split("T")[0]
          : "";

        setFormData({
          firstName: response.data.data.user.firstName,
          middleName: response.data.data.user.middleName || "",
          lastName: response.data.data.user.lastName,
          email: response.data.data.user.email,
          number: response.data.data.user.number || "",
          dob: formattedDOB,
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
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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
    <>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <h1 className="text-title-lg mb-4">User Details</h1>
          <div className="border-b border-stroke font-normal text-sm md:text-base px-3 md:px-5 py-2 dark:border-strokedark bg-white dark:bg-black">
            {!edit ? (
              <>
                <div>
                  <p className="text-gray-600 mb-2 flex items-center gap-2">
                    <MdPerson /> <span className="font-bold">Name :</span>
                    {`${user.firstName} ${
                      user.middleName ? user.middleName + " " : ""
                    }${user.lastName}`}
                  </p>
                  <p className="text-gray-600 mb-2 flex items-center gap-2">
                    <MdMail />
                    <span className="font-bold">Email: </span> {user.email}
                  </p>
                  <p className="text-gray-600 mb-2 flex items-center gap-2">
                    <MdPhone />
                    <span className="font-bold">Number: </span> {user.number}
                  </p>
                  <p className="text-gray-600 mb-2 flex items-center gap-2">
                    <MdPhone />
                    <span className="font-bold">Date of Birth: </span> {date}
                  </p>
                </div>
                <div className="mt-3 flex justify-end">
                  <button
                    className="bg-primary text-white font-bold uppercase text-sm px-3 py-1 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setEdit(true)}
                  >
                    Edit
                  </button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Username */}
                    <div className="mb-4.5 flex flex-col gap-6 md:flex-row">
                      <div className="w-full xl:w-1/3">
                        <label className="md:mb-2.5 block text-black dark:text-white">
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
                      <div className="w-full xl:w-1/3">
                        <label className="md:mb-2.5 block text-black dark:text-white">
                          Middle Name
                        </label>
                        <input
                          type="text"
                          name="middleName"
                          placeholder="Middle Name"
                          value={formData.middleName}
                          onChange={handleInputChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>
                      <div className="w-full xl:w-1/3">
                        <label className="md:mb-2.5 block text-black dark:text-white">
                          Last Name <span className="text-meta-1">*</span>
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          placeholder="Last Name"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>
                    </div>
                    {/* Email */}
                    <div className="mb-4.5 flex flex-col gap-6 md:flex-row">
                      <div className="w-full xl:w-1/3">
                        <label className="md:mb-2.5 block text-black dark:text-white">
                          Email <span className="text-meta-1">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          placeholder="Email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>
                      <div className="w-full xl:w-1/3">
                        <label className="md:mb-2.5 block text-black dark:text-white">
                          Phone <span className="text-meta-1">*</span>
                        </label>
                        <input
                          type="tel"
                          name="number"
                          placeholder="number"
                          value={formData.number}
                          onChange={handleInputChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>
                      <div className="w-full xl:w-1/3">
                        <label className="md:mb-2.5 block text-black dark:text-white">
                          Date of Birth <span className="text-meta-1">*</span>
                        </label>
                        <input
                          type="date"
                          name="dob"
                          value={formData.dob.split("T")[0]} // Assuming the dob is in ISO format
                          onChange={handleInputChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <button
                        className="bg-primary text-white font-bold uppercase text-sm px-3 py-1 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Save
                      </button>
                      <button
                        className="bg-danger text-white font-bold uppercase text-sm px-3 py-1 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setEdit(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ViewUser;
