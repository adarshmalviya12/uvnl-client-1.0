import Loader from "../Loader";
import BASE_URL from "../../constant";
import axios from "axios";
import CreateProduct from "./CreateProduct";
import { FaEdit, FaEye } from "react-icons/fa";
import DeleteButton from "./DeleteButton";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useProducts } from "../../context/ProductContext";
import { useEffect } from "react";

const ProductTable = () => {
  const { loading, error, setError, setLoading } = useAuth();
  const { products, setProducts } = useProducts();

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

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
          <div className="mb-3 flex items-center justify-between text-title-sm md:text-title-md   ">
            <h1 className="text-black dark:text-white">Products</h1>
            <div className="max-h-132.5">
              <CreateProduct setProducts={setProducts} />
            </div>
          </div>
          <div className="">
            <div className="max-w-full overflow-x-auto">
              <table className=" w-full table-auto bg-white text-sm md:text-base">
                <thead>
                  <tr className="bg-bodydark text-center dark:bg-black">
                    <th className="min-w-[100px]  px-2 py-2 font-bold text-black dark:text-white xl:pl-11">
                      Name
                    </th>

                    <th className="min-w-[100px]  px-2 py-2 font-bold text-black dark:text-white xl:pl-11">
                      Category
                    </th>
                    <th className="min-w-[100px]  px-2 py-2 font-bold text-black dark:text-white xl:pl-11">
                      details
                    </th>
                    <th className="min-w-[100px]  px-2 py-2 font-bold text-black dark:text-white xl:pl-11">
                      description
                    </th>
                    <th className="min-w-[100px]  px-2 py-2 font-bold text-black dark:text-white xl:pl-11">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.length !== 0 ? (
                    products?.map((item) => (
                      <tr
                        className="text-center dark:bg-graydark"
                        key={item?._id}
                      >
                        <td className="dark:border-strokedark xl:pl-4 border-b border-[#eee] px-2  py-2">
                          {item?.name}
                        </td>

                        <td className="dark:border-strokedark xl:pl-4 border-b border-[#eee] px-2  py-2">
                          {item?.category.name}
                        </td>
                        <td className="dark:border-strokedark xl:pl-4 border-b border-[#eee] px-2  py-2">
                          {item?.details}
                        </td>
                        <td className="dark:border-strokedark xl:pl-4 border-b border-[#eee] px-2  py-2">
                          {item?.description}
                        </td>
                        <td className="dark:border-strokedark xl:pl-4 border-b border-[#eee] px-2  py-2">
                          <div className="flex justify-center gap-2">
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
                    <tr className="text-center dark:bg-graydark">
                      <td className="dark:border-strokedark xl:pl-4 border-b border-[#eee] px-2  py-2">
                        empty
                      </td>

                      <td className="dark:border-strokedark xl:pl-4 border-b border-[#eee] px-2  py-2">
                        empty
                      </td>
                      <td className="dark:border-strokedark xl:pl-4 border-b border-[#eee] px-2  py-2">
                        empty
                      </td>
                      <td className="dark:border-strokedark xl:pl-4 border-b border-[#eee] px-2  py-2">
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
