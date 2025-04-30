import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAxios from "@/hooks/useAxios";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import { TProduct } from "./product.type";

const Products = () => {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { api } = useAxios();

  // Fetching products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/products`
        );
        setProducts(response.data?.data?.products);
        console.log(response.data?.data?.products);
      } catch (error) {
        setError("Failed To Fetch Products");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [api]);

  if (loading) {
    return (
      <Card className="p-4 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-9 w-[120px]" />
        </div>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-4 shadow-lg">
        <div className="text-red-500 text-center py-8">{error}</div>
      </Card>
    );
  }

  if (products.length === 0) {
    return <p>No Product available</p>;
  }

  // delete logic
  const handleProductDelete = async (productId: string) => {
    setLoading(true);
    try {
      const response = await api.delete(
        `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/products/delete-product/${productId}`
      );
      if (response.status === 200) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
        toast.success("Product Is Deleted Successfully", {
          duration: 3000,
          position: "top-right",
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      toast.error("Failed To Delete Product", {
        duration: 3000,
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };
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
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>
                      <img
                        src={product.images[0]}
                        alt={product.modelName}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell>{product.modelName}</TableCell>
                    <TableCell>
                      $
                      {product.discountPrice
                        ? product.discountPrice.toFixed(2)
                        : product.price.toFixed(2)}
                      {product.discountPrice && (
                        <span className="line-through text-sm text-gray-500 ml-2">
                          ${product.price.toFixed(2)}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{product.category?.name || "N/A"}</TableCell>
                    <TableCell>
                      {product.averageRating} ⭐
                      <span className="text-xs text-gray-500 ml-1">
                        ({product.reviews?.length || 0})
                      </span>
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <Button size="sm" variant="destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you sure you want to delete this product?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete this product.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleProductDelete(product._id)}
                              disabled={loading}
                            >
                              {loading ? "Deleting..." : "Yes, Delete"}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
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
