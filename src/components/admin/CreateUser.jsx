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
        },
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
        className=" active:bg-pink-600  mb-1 mr-1 rounded bg-primary px-3 py-1.5 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Create User
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
                    Create User
                  </h3>
                </div>
                {/*body*/}
                <div className="relative max-h-80 flex-auto overflow-y-auto p-6 md:max-h-90">
                  {/* Ensure to set max height and overflow for the content */}
                  <form className="text-sm font-thin ">
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
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-1.5 py-0.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>

                      <div className="w-full xl:w-1/3">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Middlename <span className="text-meta-1">*</span>
                        </label>
                        <input
                          type="text"
                          name="middlename"
                          placeholder="middlename"
                          onChange={(e) => setMiddleName(e.target.value)}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-1.5 py-0.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-1.5 py-0.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-1.5 py-0.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-1.5 py-0.5 font-medium outline-none transition [appearance:textfield] focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
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
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-1.5 py-0.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-1.5 py-0.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
                <div className="border-blueGray-200 flex items-center justify-end gap-2 rounded-b border-t border-solid p-2 text-title-sm">
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
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </>
  );
};
export default CreateUser;
