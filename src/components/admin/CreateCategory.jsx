import axios from "axios";
import { useState } from "react";
import BASE_URL from "../../constant";

const CreateCategory = ({ setCategories }) => {
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    category: "",
    details: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessage("");
  };

  const token = localStorage.getItem("token");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/admin/category`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategories((prevCategory) => [
        ...prevCategory,
        response.data.data.newCategory,
      ]);
      setShowModal(false);
    } catch (error) {
      console.error("Error Creating Category:", error);
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
        Create Category
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
                    Create Category
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto overflow-y-auto max-h-80 md:max-h-90 lg:max-h-115">
                  <form action="" className="font-thin text-sm ">
                    {/* name  */}
                    <div className="mb-4.5 flex flex-col gap-3 md:flex-row">
                      <div className="w-full xl:w-1/3">
                        <label className="mb-1.5 block text-black dark:text-white">
                          Name <span className="text-meta-1">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          placeholder="Enter category Name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>

                      <div className="w-full xl:w-1/2">
                        <label className="mb-1.5 block text-black dark:text-white">
                          details <span className="text-meta-1">*</span>
                        </label>
                        <input
                          type="text"
                          name="details"
                          placeholder="details"
                          value={formData.details}
                          onChange={handleInputChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>

                      <div className="w-full xl:w-1/3">
                        <label className="mb-1.5 block text-black dark:text-white">
                          description <span className="text-meta-1">*</span>
                        </label>
                        <input
                          type="text"
                          name="description"
                          placeholder="enter decription"
                          value={formData.description}
                          onChange={handleInputChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>
                    </div>
                    {errorMessage && (
                      <p className="text-danger">{errorMessage}</p>
                    )}
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center text-title-sm justify-end gap-2 p-4 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="inline-flex items-center justify-center bg-danger px-1 py-1 text-center font-normal  text-white hover:bg-opacity-90 md:px-2 xl:px-4"
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
export default CreateCategory;
