import axios from "axios";
import { useEffect, useState } from "react";
import BASE_URL from "../../constant";
import { useParams } from "react-router-dom";
import {
  MdContentPaste,
  MdDetails,
  MdDriveFileRenameOutline,
} from "react-icons/md";

const ProductView = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    details: "",
    description: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/admin/product/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setProduct(response.data.data.product);
        setFormData({
          name: response.data.data.product.name,
          details: response.data.data.product.details,
          description: response.data.data.product.description,
        });
        setLoading(false);
      } catch (error) {
        setError(error.response.data.message);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

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
        `${BASE_URL}/admin/product/${productId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setProduct(response.data.data);
      alert("Product updated successfully!");
      setEdit(false);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <>
            <h1 className="mb-4 text-title-lg">Product Details</h1>
            <div className="border-b border-stroke bg-white px-3 py-2 text-sm font-normal dark:border-strokedark dark:bg-black md:px-5 md:text-base">
              {!edit ? (
                <>
                  <div>
                    <p className="text-gray-600 mb-2 flex items-center gap-2">
                      <MdDriveFileRenameOutline />{" "}
                      <span className="font-bold">Name :</span>
                      {product.name}
                    </p>
                    <p className="text-gray-600 mb-2 flex items-center gap-2">
                      <MdDetails />
                      <span className="font-bold">Details: </span>{" "}
                      {product.details}
                    </p>
                    <p className="text-gray-600 mb-2 flex items-center gap-2">
                      <MdContentPaste />
                      <span className="font-bold">Description: </span>{" "}
                      {product.description}
                    </p>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <button
                      className="mb-1 mr-1 bg-primary px-3 py-1 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
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
                      {/* Product Name */}
                      <div className="mb-4.5 flex flex-col gap-6 md:flex-row">
                        <div className="w-full xl:w-1/3">
                          <label className="block text-black dark:text-white md:mb-2.5">
                            Name <span className="text-meta-1">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-1.5 py-1 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          />
                        </div>
                        <div className="w-full xl:w-1/3">
                          <label className="block text-black dark:text-white md:mb-2.5">
                            Details
                          </label>
                          <input
                            type="text"
                            name="details"
                            placeholder="Details"
                            value={formData.details}
                            onChange={handleInputChange}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-3 py-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          />
                        </div>
                        <div className="w-full xl:w-1/3">
                          <label className="block text-black dark:text-white md:mb-2.5">
                            Description
                          </label>
                          <input
                            type="text"
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-3 py-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          />
                        </div>
                      </div>
                      <div className="mt-3 flex justify-end">
                        <button
                          className="mb-1 mr-1 bg-primary px-3 py-1 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
                          type="submit"
                        >
                          Save
                        </button>
                        <button
                          className="mb-1 mr-1 bg-danger px-3 py-1 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
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
    </>
  );
};

export default ProductView;
