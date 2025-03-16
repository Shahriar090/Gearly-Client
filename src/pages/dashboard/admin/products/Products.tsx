import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router";

type TProduct = {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  rating: number;
  reviews: number;
  image: string;
};

const products: TProduct[] = [
  {
    id: "1",
    name: "Walton Primo X5",
    price: 250,
    stock: 50,
    category: "Smartphones",
    rating: 4.5,
    reviews: 120,
    image: "https://via.placeholder.com/50",
  },
  {
    id: "2",
    name: "Walton Smartwatch G2",
    price: 80,
    stock: 30,
    category: "Gadgets",
    rating: 4.2,
    reviews: 75,
    image: "https://via.placeholder.com/50",
  },
];

const Products = () => {
  return (
    <div>
      {" "}
      <Card className="p-4 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Product Management</h2>
          <Link to="/admin/add-product">
            {" "}
            <Button variant="default" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </Link>
        </div>

        <CardContent>
          <div className="max-w-[300px] sm:max-w-full">
            {" "}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Price ($)</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Reviews</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.rating} ⭐</TableCell>
                    <TableCell>{product.reviews}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Products;
