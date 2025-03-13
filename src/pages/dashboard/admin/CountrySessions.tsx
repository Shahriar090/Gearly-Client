import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip } from "@/components/ui/tooltip";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
// country data
const countryData = [
  { country: "USA", sessions: 1200 },
  { country: "India", sessions: 980 },
  { country: "UK", sessions: 750 },
  { country: "Germany", sessions: 680 },
  { country: "Canada", sessions: 600 },
];

const CountrySessions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sessions by Country</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={countryData}>
            <XAxis dataKey="country" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sessions" fill="#F59E0B" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CountrySessions;
