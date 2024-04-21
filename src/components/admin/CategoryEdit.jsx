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
          },
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
        },
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
      <h1 className="mb-4 text-title-lg">Category Details</h1>
      <div className="dark:bg-gray-800 rounded-md bg-white p-6 shadow-md dark:bg-black">
        <p className="text-gray-600 mb-2 flex items-center gap-2">
          <span className="font-bold">Name :</span>
          {category.name}
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-2.5 flex flex-col gap-6 md:flex-row">
            <label className="mb-2.5 block font-bold text-black dark:text-white">
              Details:
              <input
                type="text"
                name="details"
                value={formData.details}
                onChange={handleInputChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-1.5 py-1 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </label>
          </div>
          <div className="mb-2.5">
            <label className="mb-2.5 block font-bold text-black dark:text-white">
              Description:
              <textarea
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-1.5 py-1 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              ></textarea>
            </label>
          </div>
          <button
            type="submit"
            className="mb-1 mr-1 bg-primary px-3 py-1 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default CategoryEdit;
