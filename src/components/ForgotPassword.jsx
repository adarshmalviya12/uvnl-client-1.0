import { useState } from "react";
import BASE_URL from "../constant";
import axios from "axios";
import OtpInput from "./OtpInput";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [showOtpInput, setOptInput] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/user/forgot-password`, {
        email,
      });
      if (response.data.statusCode === 200) {
        setOptInput(true);
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  const onOtpSubmit = async (otp, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/user/reset-password`, {
        email,
        newPassword: password,
        otp,
      });
      if (response.data.statusCode === 200) {
        alert(response.data.message);
        navigate("/");
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  const handleFormInput = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setEmail(e.target.value);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray ">
      {/* <!-- Sign In Form --> */}
      <div className="flex-col ">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:w-100">
          <div className="border-b border-stroke px-3.5 py-2 dark:border-strokedark">
            <h3 className="font-medium text-primary ">Forgot Password</h3>
          </div>
          {!showOtpInput ? (
            <form onSubmit={handleFormSubmit}>
              <div className="p-3.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    onChange={handleFormInput}
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
                <div className="flex justify-end">
                  <button
                    className=" iteme bg-primary p-1.5 font-medium text-gray"
                    type="submit"
                  >
                    Send OTP
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div>
              <p className="mt-2 px-2 font-light ">
                Enter 6 digit OTP Send to{" "}
                <span className="font-medium text-primary">{email}</span>
              </p>
              <p className="mt-2 px-2 font-light text-danger ">
                {errorMessage}
              </p>
              <OtpInput onOtpSubmit={onOtpSubmit} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
