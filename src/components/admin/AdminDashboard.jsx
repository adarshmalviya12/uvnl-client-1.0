import { useEffect } from "react";
import { useOpportunities } from "../../context/OpportunityContext";
import { useProducts } from "../../context/ProductContext";
import CardOne from "../CardOne";
import BASE_URL from "../../constant";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
  const { opportunities, setOpportunities } = useOpportunities(); // Update context hook
  const { products, setProducts } = useProducts();
  const { setError, setLoading } = useAuth();

  const token = localStorage.getItem("token");
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

  const fetchOpportunities = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/opportunities`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOpportunities(response.data.data.opportunities);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchOpportunities();
    fetchProducts();
  }, []);
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 ">
        <CardOne count={opportunities.length} name={"opportunities"} />
        <CardOne count={products.length} name={"Products"} />
      </div>
    </>
  );
};
export default AdminDashboard;
