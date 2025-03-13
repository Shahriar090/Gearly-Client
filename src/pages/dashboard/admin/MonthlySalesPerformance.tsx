import { Tooltip } from "@/components/ui/tooltip";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

// chart data
const data = [
  { month: "Jan", revenue: 12000, orders: 450 },
  { month: "Feb", revenue: 15000, orders: 520 },
  { month: "Mar", revenue: 18000, orders: 610 },
  { month: "Apr", revenue: 16000, orders: 580 },
  { month: "May", revenue: 19000, orders: 640 },
  { month: "Jun", revenue: 22000, orders: 700 },
  { month: "Jul", revenue: 25000, orders: 780 },
  { month: "Aug", revenue: 23000, orders: 720 },
  { month: "Sep", revenue: 21000, orders: 680 },
  { month: "Oct", revenue: 27000, orders: 850 },
  { month: "Nov", revenue: 30000, orders: 920 },
  { month: "Dec", revenue: 32000, orders: 1000 },
];

const MonthlySalesPerformance = () => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-4">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Monthly Sales Performance
      </h2>
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="orders"
            barSize={30}
            fill="#4f46e5"
            name="Total Orders"
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#ff7300"
            strokeWidth={3}
            name="Revenue ($)"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlySalesPerformance;
