import UserLeadsTable from "../components/user/UserLeadsTable";
import axios from "axios";
import { useEffect } from "react";
import { useLeads } from "../context/LeadContext";
import BASE_URL from "../constant";

const LeadPage = () => {
  const { leads, setLeads } = useLeads();

  const token = localStorage.getItem("token");

  const fetchLeads = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/leads`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLeads(response.data.data.leads);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);
  return (
    <>
      <UserLeadsTable leads={leads} setLeads={setLeads} />
    </>
  );
};
export default LeadPage;
