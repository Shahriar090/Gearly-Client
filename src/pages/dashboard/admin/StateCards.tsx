import {
  ArrowDown,
  ArrowUp,
  DollarSign,
  Package,
  ShoppingBag,
  XCircle,
} from "lucide-react";

const stats = [
  {
    title: "Total Sales",
    value: "1,245",
    percentage: "12.5%",
    increase: true,
    icon: <ShoppingBag className="w-10 h-10 text-blue-500" />,
  },
  {
    title: "Total Revenue",
    value: "$25,430",
    percentage: "8.2%",
    increase: true,
    icon: <DollarSign className="w-10 h-10 text-green-500" />,
  },
  {
    title: "Total Orders",
    value: "842",
    percentage: "5.8%",
    increase: false,
    icon: <Package className="w-10 h-10 text-yellow-500" />,
  },
  {
    title: "Total Canceled",
    value: "35",
    percentage: "3.4%",
    increase: false,
    icon: <XCircle className="w-10 h-10 text-red-500" />,
  },
];

const StateCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 cursor-pointer">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-4 bg-white shadow-lg rounded-xl hover:shadow-2xl transition-all duration-200 w-full sm:max-w-sm"
        >
          <div className="p-3 bg-gray-100 rounded-lg">{stat.icon}</div>
          <div className="text-right">
            <h3 className="text-lg font-semibold text-gray-700">
              {stat.title}
            </h3>
            <p className="text-xl md:text-2xl font-bold text-gray-900">
              {stat.value}
            </p>
            <div
              className={`flex items-center text-sm ${
                stat.increase ? "text-green-500" : "text-red-500"
              }`}
            >
              {stat.increase ? (
                <ArrowUp className="w-4 h-4" />
              ) : (
                <ArrowDown className="w-4 h-4" />
              )}
              <span className="ml-1">{stat.percentage} from last month</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StateCards;
