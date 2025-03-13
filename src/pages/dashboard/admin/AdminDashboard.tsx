import StateCards from "./StateCards";
import MonthlySalesPerformance from "./MonthlySalesPerformance";
import RecentOrders from "./RecentOrders";
import Conversions from "./Conversions";
import CountrySessions from "./CountrySessions";
import TopPages from "./TopPages";

const AdminDashboard = () => {
  return (
    <div className="space-y-3">
      <div className="space-y-3">
        {/* state cards */}
        <StateCards />
        {/* monthly sales performance chart */}
        <MonthlySalesPerformance />

        {/* recent orders table */}
        <RecentOrders />
      </div>
      {/* conversions, country visit, and top pages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Conversions Chart */}
        <Conversions />

        {/* Sessions by Country */}
        <CountrySessions />

        {/* Top Pages Table */}
        <TopPages />
      </div>
    </div>
  );
};

export default AdminDashboard;
