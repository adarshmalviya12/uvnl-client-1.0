import AdminKycTable from "./AdminKycTable";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import BASE_URL from "../../../constant";

const Kyc = () => {
  const { user } = useAuth();
  const [kycData, setKycData] = useState([]);
  const token = localStorage.getItem("token");

  const fetchKycData = async () => {
    try {
      if (user && user._id) {
        // Check if user and user._id are defined
        const response = await axios.get(`${BASE_URL}/admin/kycs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setKycData(response.data.data);
      }
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchKycData();
  }, [user]);

  return (
    <>
      <AdminKycTable kycData={kycData} setKycData={setKycData} />
    </>
  );
};
export default Kyc;
