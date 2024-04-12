import axios from "axios";
import { useEffect, useState } from "react";
import BASE_URL from "../../constant";
import { useParams } from "react-router-dom";
import {
  MdContentPaste,
  MdDetails,
  MdDriveFileRenameOutline,
} from "react-icons/md";

const CategoryView = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    details: "",
    description: "",
  });

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/admin/category/${categoryId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCategory(response.data.data.category);
        setFormData({
          name: response.data.data.category.name,
          details: response.data.data.category.details,
          description: response.data.data.category.description,
        });
        setLoading(false);
      } catch (error) {
        setError(error.response.data.message);
        setLoading(false);
      }
    };
    fetchCategory();
  }, [categoryId]);

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
        `${BASE_URL}/admin/category/${categoryId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCategory(response.data.data);
      alert("Category updated successfully!");
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
          <h1 className="text-title-lg mb-4">Category Details</h1>
          <div className="border-b border-stroke font-normal text-sm md:text-base px-3 md:px-5 py-2 dark:border-strokedark bg-white dark:bg-black">
            {!edit ? (
              <>
                <div>
                  <p className="text-gray-600 mb-2 flex items-center gap-2">
                    <MdDriveFileRenameOutline />{" "}
                    <span className="font-bold">Name :</span>
                    {category.name}
                  </p>
                  <p className="text-gray-600 mb-2 flex items-center gap-2">
                    <MdDetails />
                    <span className="font-bold">Details: </span>{" "}
                    {category.details}
                  </p>
                  <p className="text-gray-600 mb-2 flex items-center gap-2">
                    <MdContentPaste />
                    <span className="font-bold">Description: </span>{" "}
                    {category.description}
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
                    {/* Category Name */}
                    <div className="mb-4.5 flex flex-col gap-6 md:flex-row">
                      <div className="w-full xl:w-1/3">
                        <label className="md:mb-2.5 block text-black dark:text-white">
                          Name <span className="text-meta-1">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          placeholder="Name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>
                      <div className="w-full xl:w-1/3">
                        <label className="md:mb-2.5 block text-black dark:text-white">
                          Details
                        </label>
                        <input
                          type="text"
                          name="details"
                          placeholder="Details"
                          value={formData.details}
                          onChange={handleInputChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>
                      <div className="w-full xl:w-1/3">
                        <label className="md:mb-2.5 block text-black dark:text-white">
                          Description
                        </label>
                        <input
                          type="text"
                          name="description"
                          placeholder="Description"
                          value={formData.description}
                          onChange={handleInputChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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

export default CategoryView;
