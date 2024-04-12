import { useEffect, useState } from "react";
import Loader from "../Loader";
import BASE_URL from "../../constant";
import axios from "axios";
import CreateProduct from "./CreateProduct";
import { FaEdit, FaEye } from "react-icons/fa";
import DeleteButton from "./DeleteButton";
import { useNavigate } from "react-router-dom";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(response.data.data.products);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/admin/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(products.filter((item) => item._id !== id));
    } catch (error) {
      console.error("error", error?.response.data.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <div className="flex justify-between items-center text-title-sm md:text-title-md mb-3   ">
            <h1 className="text-black dark:text-white">Products</h1>
            <div className="max-h-132.5">
              <CreateProduct setProducts={setProducts} />
            </div>
          </div>
          <div className="">
            <div className="max-w-full overflow-x-auto">
              <table className=" bg-white text-sm md:text-base w-full table-auto">
                <thead>
                  <tr className="bg-bodydark text-center dark:bg-black">
                    <th className="min-w-[100px]  py-2 px-2 font-bold text-black dark:text-white xl:pl-11">
                      Name
                    </th>

                    <th className="min-w-[100px]  py-2 px-2 font-bold text-black dark:text-white xl:pl-11">
                      Category
                    </th>
                    <th className="min-w-[100px]  py-2 px-2 font-bold text-black dark:text-white xl:pl-11">
                      details
                    </th>
                    <th className="min-w-[100px]  py-2 px-2 font-bold text-black dark:text-white xl:pl-11">
                      description
                    </th>
                    <th className="min-w-[100px]  py-2 px-2 font-bold text-black dark:text-white xl:pl-11">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.length !== 0 ? (
                    products?.map((item) => (
                      <tr
                        className="dark:bg-graydark text-center"
                        key={item?._id}
                      >
                        <td className="border-b border-[#eee] py-2 px-2  dark:border-strokedark xl:pl-4">
                          {item?.name}
                        </td>

                        <td className="border-b border-[#eee] py-2 px-2  dark:border-strokedark xl:pl-4">
                          {item?.category.name}
                        </td>
                        <td className="border-b border-[#eee] py-2 px-2  dark:border-strokedark xl:pl-4">
                          {item?.details}
                        </td>
                        <td className="border-b border-[#eee] py-2 px-2  dark:border-strokedark xl:pl-4">
                          {item?.description}
                        </td>
                        <td className="border-b border-[#eee] py-2 px-2  dark:border-strokedark xl:pl-4">
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() =>
                                navigate(`/admin/product/${item._id}`)
                              }
                            >
                              <FaEye />
                            </button>
                            <button
                              onClick={() =>
                                navigate(`/admin/product/edit/${item._id}`)
                              }
                            >
                              <FaEdit />
                            </button>
                            <DeleteButton
                              onDelete={() => handleDelete(item._id)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="dark:bg-graydark text-center">
                      <td className="border-b border-[#eee] py-2 px-2  dark:border-strokedark xl:pl-4">
                        empty
                      </td>

                      <td className="border-b border-[#eee] py-2 px-2  dark:border-strokedark xl:pl-4">
                        empty
                      </td>
                      <td className="border-b border-[#eee] py-2 px-2  dark:border-strokedark xl:pl-4">
                        empty
                      </td>
                      <td className="border-b border-[#eee] py-2 px-2  dark:border-strokedark xl:pl-4">
                        empty
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default ProductTable;
