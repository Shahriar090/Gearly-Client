import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";

// top pages data
const topPages = [
  { id: 1, page: "/home", views: 2500, avgTime: "3m 20s" },
  { id: 2, page: "/products", views: 2000, avgTime: "4m 10s" },
  { id: 3, page: "/cart", views: 1200, avgTime: "2m 30s" },
  { id: 4, page: "/checkout", views: 800, avgTime: "5m 10s" },
];

const TopPages = () => {
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Top Pages</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Page</TableCell>
              <TableCell>Views</TableCell>
              <TableCell>Avg. Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topPages.map((page) => (
              <TableRow key={page.id}>
                <TableCell>{page.page}</TableCell>
                <TableCell>{page.views}</TableCell>
                <TableCell>{page.avgTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TopPages;
