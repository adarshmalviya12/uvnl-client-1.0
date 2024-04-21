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
          <div className="mb-3 flex items-center justify-between text-title-sm md:text-title-md   ">
            <h1 className="text-black dark:text-white">Users</h1>
            <div className="max-h-132.5">
              <CreateUser />
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

                    <th className="min-w-[100px] px-2 py-2 font-bold text-black dark:text-white">
                      Number
                    </th>
                    <th className="min-w-[100px] px-2 py-2 font-bold text-black dark:text-white">
                      Email
                    </th>
                    <th className=" min-w-[100px] px-2 py-2 text-center font-bold text-black dark:text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.length !== 0 ? (
                    users?.map((user) => (
                      <tr
                        className="text-center dark:bg-graydark"
                        key={user?._id}
                      >
                        <td className="dark:border-strokedark xl:pl-4 border-b border-[#eee] px-2  py-2">
                          {user?.firstName} {user?.lastName}
                        </td>

                        <td className="dark:border-strokedark xl:pl-4 border-b border-[#eee] px-2  py-2">
                          {user?.number}
                        </td>
                        <td className="dark:border-strokedark xl:pl-4 border-b border-[#eee] px-2  py-2">
                          {user?.email}
                        </td>
                        <td className="dark:border-strokedark xl:pl41 border-b border-[#eee] px-2   py-2">
                          <div className="flex justify-center gap-2  ">
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
                      <td className="dark:border-strokedark xl:pl-11 border-b border-[#eee] px-2 py-3 pl-9">
                        empty
                      </td>

                      <td className="dark:border-strokedark xl:pl-11 border-b border-[#eee] px-2 py-3 pl-9">
                        empty
                      </td>
                      <td className="dark:border-strokedark xl:pl-11 border-b border-[#eee] px-2 py-3 pl-9">
                        empty
                      </td>
                      <td className="dark:border-strokedark xl:pl-11 border-b border-[#eee] px-2 py-3  pl-9">
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
