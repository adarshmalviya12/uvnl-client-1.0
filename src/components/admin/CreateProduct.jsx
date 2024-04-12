import axios from "axios";
import { useEffect, useState } from "react";
import BASE_URL from "../../constant";

const CreateProduct = ({ setProducts }) => {
  const [categories, setCategories] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    product: "",
    details: "",
    description: "",
    categoryId: "",
  });

  const handleInputChange = (e) => {
    setErrorMessage("");
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessage("");
  };

  const token = localStorage.getItem("token");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/admin/product`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts((prevProduct) => [
        ...prevProduct,
        response.data.data.newProduct,
      ]);
      setShowModal(false);
    } catch (error) {
      setErrorMessage(error.response.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/admin/categories`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCategories(response.data.data.categories);
      } catch (error) {
        setErrorMessage(error?.response.data.message || "An error occurred");
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <button
        className="bg-primary text-white active:bg-pink-600 font-bold uppercase text-sm px-3 py-1.5 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Create Product
      </button>
      {showModal && (
        <div className="justify-center z-9999 items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-black outline-none focus:outline-none">
              {/*header*/}
              <div className="border-b border-stroke px-5 py-2 dark:border-strokedark">
                <h3 className="font-medium text-title-sm text-black dark:text-white">
                  Create Product
                </h3>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto overflow-y-auto max-h-80 md:max-h-90 lg:max-h-115">
                <form action="" className="font-thin text-sm">
                  {/* name  */}
                  {errorMessage && (
                    <p className="text-danger">{errorMessage}</p>
                  )}
                  <div className="mb-4.5 flex flex-col gap-3 md:flex-row">
                    <div className="w-full xl:w-1/3">
                      <label className="mb-1.5 block text-black dark:text-white">
                        Name <span className="text-meta-1">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter Product Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full xl:w-1/3">
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
                  <div className="mb-4.5 flex flex-col gap-3 md:flex-row">
                    <div className="w-full xl:w-1/3">
                      <label className="mb-1.5 block text-black dark:text-white">
                        Category <span className="text-meta-1">*</span>
                      </label>
                      <select
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleInputChange}
                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-1.5 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      >
                        <option value="" disabled>
                          select
                        </option>
                        {categories &&
                          categories.map((item) => (
                            <option key={item._id} value={item._id}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="w-full xl:w-1/3"></div>
                    <div className="w-full xl:w-1/3"></div>
                  </div>
                </form>
              </div>
              {/*footer*/}
              <div className="flex items-center text-title-sm justify-end gap-2 p-4 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="inline-flex items-center justify-center bg-danger px-1 py-1 text-center font-normal text-white hover:bg-opacity-90 md:px-2 xl:px-4"
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
      )}
    </>
  );
};

export default CreateProduct;
