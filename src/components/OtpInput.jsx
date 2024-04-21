import React, { useState } from "react";

const OtpInput = ({ onOtpSubmit }) => {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (otp.length === 6 && password.length > 0) {
      onOtpSubmit(otp, password);
    } else {
      setErrorMessage("Please enter a valid OTP and password");
    }
  };

  const handleFormInput = (setter) => (e) => {
    setErrorMessage("");
    setter(e.target.value);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="p-3.5">
        <div>
          <label>Otp</label>
          <input
            type="number"
            maxLength="6"
            placeholder="Enter OTP"
            value={otp}
            onChange={handleFormInput(setOtp)}
            autoComplete="off" // Disable autocomplete
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-3 py-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
        <div className="mt-3">
          <label>New Password</label>
          <input
            type="password"
            placeholder="Enter New Password"
            value={password}
            onChange={handleFormInput(setPassword)}
            autoComplete="off" // Disable autocomplete
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-3 py-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
        {errorMessage && (
          <div className="pb-2 pt-2 text-sm text-danger">{errorMessage}</div>
        )}
        <div className="mt-3 flex justify-end">
          <button
            className="bg-primary p-1.5 font-medium text-gray"
            type="submit"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default OtpInput;
