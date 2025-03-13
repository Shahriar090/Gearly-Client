import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip } from "@/components/ui/tooltip";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

// conversions data
const conversionData = [
  { month: "Jan", conversions: 50 },
  { month: "Feb", conversions: 75 },
  { month: "Mar", conversions: 60 },
  { month: "Apr", conversions: 90 },
  { month: "May", conversions: 100 },
];

const Conversions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversions Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={conversionData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="conversions" stroke="#4F46E5" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default Conversions;
