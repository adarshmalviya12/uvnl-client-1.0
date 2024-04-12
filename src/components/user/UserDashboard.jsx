import { useLeads } from "../../context/LeadContext";
import { useOpportunities } from "../../context/OpportunityContext";
import CardOne from "../CardOne";

const UserDashboard = () => {
  const { leads } = useLeads();
  const { opportunities } = useOpportunities();
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 ">
        <CardOne count={leads.length} name={"leads"} />
        <CardOne count={opportunities.length} name={"opportunities"} />
      </div>
    </>
  );
};
export default UserDashboard;
