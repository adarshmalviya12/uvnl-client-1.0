import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import UserKycTable from "./UserKycTable";
import BASE_URL from "../../constant";

const UserKycs = () => {
  const { user } = useAuth();
  const [kycData, setKycData] = useState([]);
  const token = localStorage.getItem("token");

  const fetchKycData = async () => {
    try {
      if (user && user._id) {
        // Check if user and user._id are defined
        const response = await axios.get(
          `${BASE_URL}/user/kyc-by-user/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setKycData(response.data.data);
      }
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchKycData();
  }, [user]); // Fetch data whenever user object changes

  return (
    <>
      <UserKycTable kycData={kycData} setKycData={setKycData} />
    </>
  );
};

export default UserKycs;
