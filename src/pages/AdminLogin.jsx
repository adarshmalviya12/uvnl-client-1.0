import axios from "axios";
import { useState } from "react";
import BASE_URL from "../constant";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/admin/login`, {
        email,
        password,
      });

      localStorage.setItem("token", response.data.data.token);
      navigate("/admin/dashboard");
    } catch (error) {
      setErrorMessage(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray ">
      {/* <!-- Sign In Form --> */}
      <div className="flex-col ">
        <h1 className="text-title-xl">Welcome Admin</h1>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:w-100">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Sign In Form
            </h3>
          </div>
          <form onSubmit={handleFormSubmit}>
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-3 py-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-2.5 block text-black dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-3 py-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
              {!errorMessage ? (
                <div></div>
              ) : (
                <div className="pb-2 pt-2 text-sm text-danger">
                  {errorMessage}
                </div>
              )}

              <button
                className="mt-3 flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AdminLogin;
