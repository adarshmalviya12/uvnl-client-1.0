import { FaEdit, FaEye } from "react-icons/fa";
import DeleteButton from "./DeleteButton";
import CreateUser from "./CreateUser";
import { useUsers } from "../../context/UsersContext";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../constant";
import axios from "axios";
import { useEffect, useState } from "react";

const AdminUserTable = () => {
  const { users, setUsers } = useUsers();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(response.data.data.users);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log("hiir");
      await axios.delete(`${BASE_URL}/admin/user/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(users.filter((item) => item._id !== id));
    } catch (error) {
      console.error("error", error?.response.data.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <div className="flex justify-between items-center text-title-sm md:text-title-md mb-3   ">
            <h1 className="text-black dark:text-white">Users</h1>
            <div className="max-h-132.5">
              <CreateUser />
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

                    <th className="min-w-[100px] py-2 px-2 font-bold text-black dark:text-white">
                      Number
                    </th>
                    <th className="min-w-[100px] py-2 px-2 font-bold text-black dark:text-white">
                      Email
                    </th>
                    <th className=" min-w-[100px] py-2 px-2 font-bold text-center text-black dark:text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.length !== 0 ? (
                    users?.map((user) => (
                      <tr className="dark:bg-graydark text-center">
                        <td className="border-b border-[#eee] py-2 px-2  dark:border-strokedark xl:pl-4">
                          {user?.firstName} {user?.lastName}
                        </td>

                        <td className="border-b border-[#eee] py-2 px-2  dark:border-strokedark xl:pl-4">
                          {user?.number}
                        </td>
                        <td className="border-b border-[#eee] py-2 px-2  dark:border-strokedark xl:pl-4">
                          {user?.email}
                        </td>
                        <td className="border-b border-[#eee] py-2 px-2   dark:border-strokedark xl:pl41">
                          <div className="flex gap-2 justify-center  ">
                            <button
                              onClick={() =>
                                navigate(`/admin/user/${user?._id}`)
                              }
                            >
                              {<FaEye />}
                            </button>
                            <button
                              onClick={() =>
                                navigate(`/admin/user/edit/${user?._id}`)
                              }
                            >
                              {<FaEdit />}
                            </button>
                            <DeleteButton
                              onDelete={() => handleDelete(user?._id)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="  dark:bg-meta-4">
                      <td className="border-b border-[#eee] py-3 px-2 pl-9 dark:border-strokedark xl:pl-11">
                        empty
                      </td>

                      <td className="border-b border-[#eee] py-3 px-2 pl-9 dark:border-strokedark xl:pl-11">
                        empty
                      </td>
                      <td className="border-b border-[#eee] py-3 px-2 pl-9 dark:border-strokedark xl:pl-11">
                        empty
                      </td>
                      <td className="border-b border-[#eee] py-3 px-2 pl-9  dark:border-strokedark xl:pl-11">
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
export default AdminUserTable;
