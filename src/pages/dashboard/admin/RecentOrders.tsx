import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

// orders data
const orders = [
  {
    id: "#ORD12345",
    date: "2024-03-10",
    product: "Wireless Headphones",
    customer: "John Doe",
    email: "johndoe@example.com",
    phone: "+1 234 567 890",
    address: "123 Main St, NY",
    payment: "Credit Card",
    status: "Completed",
  },
  {
    id: "#ORD12346",
    date: "2024-03-11",
    product: "Smart Watch",
    customer: "Jane Smith",
    email: "janesmith@example.com",
    phone: "+1 987 654 321",
    address: "456 Elm St, CA",
    payment: "PayPal",
    status: "Pending",
  },
  {
    id: "#ORD12347",
    date: "2024-03-12",
    product: "Gaming Laptop",
    customer: "Alex Johnson",
    email: "alexjohnson@example.com",
    phone: "+1 456 789 123",
    address: "789 Pine St, TX",
    payment: "Bank Transfer",
    status: "Completed",
  },
  {
    id: "#ORD12348",
    date: "2024-03-13",
    product: "Bluetooth Speaker",
    customer: "Emily Davis",
    email: "emilydavis@example.com",
    phone: "+1 321 654 987",
    address: "567 Oak St, FL",
    payment: "Cash on Delivery",
    status: "Pending",
  },
];

const RecentOrders = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // pagination logic
  const rowsPerPage = 3; // Change this value as needed

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentOrders = orders.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(orders.length / rowsPerPage);
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 ">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Recent Orders
      </h2>
      <div className="max-w-[300px] sm:max-w-full">
        {" "}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentOrders.map((order, index) => (
              <TableRow key={index}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.product}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.email}</TableCell>
                <TableCell>{order.phone}</TableCell>
                <TableCell>{order.address}</TableCell>
                <TableCell>{order.payment}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.status === "Completed" ? "default" : "secondary"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          variant="outline"
        >
          Previous
        </Button>
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          variant="outline"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default RecentOrders;
