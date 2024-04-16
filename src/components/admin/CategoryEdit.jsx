import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../constant";
import { useProducts } from "../../context/ProductContext";

const CategoryEdit = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useProducts;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    details: "",
    description: "",
  });

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/admin/category/${categoryId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const categoryData = response.data.data.category;
        setCategory(categoryData);
        setFormData({
          details: categoryData.details || "",
          description: categoryData.description || "",
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
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `${BASE_URL}/admin/category/edit/${categoryId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Category updated successfully!");
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <h1 className="text-title-lg mb-4">Category Details</h1>
      <div className="p-6 bg-white dark:bg-black shadow-md rounded-md dark:bg-gray-800">
        <p className="text-gray-600 mb-2 flex items-center gap-2">
          <span className="font-bold">Name :</span>
          {category.name}
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-2.5 flex flex-col gap-6 md:flex-row">
            <label className="mb-2.5 block text-black dark:text-white font-bold">
              Details:
              <input
                type="text"
                name="details"
                value={formData.details}
                onChange={handleInputChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </label>
          </div>
          <div className="mb-2.5">
            <label className="mb-2.5 block text-black dark:text-white font-bold">
              Description:
              <textarea
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              ></textarea>
            </label>
          </div>
          <button
            type="submit"
            className="bg-primary text-white font-bold uppercase text-sm px-3 py-1 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default CategoryEdit;
