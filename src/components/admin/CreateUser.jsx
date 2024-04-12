import { useState } from "react";
import { useUsers } from "../../context/UsersContext";
import axios from "axios";
import BASE_URL from "../../constant";

const CreateUser = () => {
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [number, setNumber] = useState();

  const { setUsers } = useUsers();
  const token = localStorage.getItem("token");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const currentYear = new Date().getFullYear();
    const dobYear = new Date(dob).getFullYear();

    // Check if the DOB is at least five years ago
    if (currentYear - dobYear < 5) {
      setErrorMessage("DOB should be at least five years ago");
      return;
    }
    try {
      const newUser = {
        email,
        firstName,
        lastName,
        middleName,
        number,
        password,
        dob,
      };

      const response = await axios.post(
        `${BASE_URL}/admin/create-user`,
        newUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers((prevUsers) => [...prevUsers, response.data.data.createdUser]);
      setFirstName("");
      setEmail("");
      setPassword("");
      setLastName("");
      setNumber("");
      setDob("");
      setShowModal(false);
    } catch (error) {
      setErrorMessage(error?.response.data.message);
      alert(errorMessage);
    }
  };

  return (
    <>
      <button
        className=" bg-primary  text-white active:bg-pink-600 font-bold uppercase text-sm px-3 py-1.5 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Create User
      </button>
      {showModal ? (
        <>
          <div className="justify-center z-9999 items-center flex overflow-x-hidden overflow-y-auto   fixed inset-0  outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-black outline-none focus:outline-none">
                {/*header*/}
                <div className="border-b border-stroke px-5 py-2 dark:border-strokedark">
                  <h3 className="font-medium text-title-sm text-black dark:text-white">
                    Create User
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto overflow-y-auto max-h-80 md:max-h-90">
                  {/* Ensure to set max height and overflow for the content */}
                  <form className="font-thin text-sm ">
                    {/* name  */}
                    <div className="mb-4.5 flex flex-col gap-3 md:flex-row">
                      <div className="w-full xl:w-1/3">
                        <label className="mb-1.5 block text-black dark:text-white">
                          First name <span className="text-meta-1">*</span>
                        </label>
                        <input
                          type="text"
                          name="firstname"
                          placeholder="first name"
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>

                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Middlename <span className="text-meta-1">*</span>
                        </label>
                        <input
                          type="middlename"
                          name="middlename"
                          placeholder="middlename"
                          onChange={(e) => setMiddleName(e.target.value)}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>

                      <div className="w-full xl:w-1/3">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Last name <span className="text-meta-1">*</span>
                        </label>
                        <input
                          type="text"
                          name="lastname"
                          placeholder="last name"
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>
                    </div>
                    {/* email and phone no  */}
                    <div className="mb-4.5 flex flex-col gap-6 md:flex-row">
                      <div className="w-full xl:w-1/3">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Email <span className="text-meta-1">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          placeholder="email"
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>

                      <div className="w-full xl:w-1/3">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Phone No <span className="text-meta-1">*</span>
                        </label>
                        <input
                          type="number"
                          name="phone no"
                          placeholder="phone no"
                          onChange={(e) => setNumber(e.target.value)}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>
                      <div className="w-full xl:w-1/3">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Password <span className="text-meta-1">*</span>
                        </label>
                        <input
                          type="password"
                          name="password"
                          placeholder="password"
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>
                    </div>
                    {/* gender dob and lead status */}
                    <div className="mb-4.5 flex flex-col gap-6 md:flex-row">
                      <div className="w-full xl:w-1/3">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Data of Birth <span className="text-meta-1">*</span>
                        </label>
                        <input
                          type="date"
                          name="dob"
                          placeholder="Date of birth"
                          onChange={(e) => setDob(e.target.value)}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>

                      <div className="w-full xl:w-1/3"></div>
                      <div className="w-full xl:w-1/3"></div>
                    </div>

                    {/* Address */}
                    {/* error message  */}
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center text-title-sm justify-end gap-2 p-2 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="inline-flex items-center justify-center bg-danger px-1 py-1 text-center font-normal text-white hover:bg-opacity-90 md:px-2 xl:px-4"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="inline-flex items-center justify-center bg-primary px-1 py-1 text-center font-normal  text-white hover:bg-opacity-90 md:px-2 xl:px-4"
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
export default CreateUser;
