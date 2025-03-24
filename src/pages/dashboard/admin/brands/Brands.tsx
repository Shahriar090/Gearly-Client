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
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAxios from "@/hooks/useAxios";
import { Edit, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

// NOTE: In this project, "Brands" and "Sub Categories" refer to the same concept. I am using "Brands" on the front end for clarity. On the back end, I refer to each brand as a "Sub Category." A "Sub Category" represents a brand under a main category (e.g., "Smart Phones" as the category, and "Apple" as the sub category or brand under the Smart Phones category).

type TBrand = {
  _id: string;
  brandName: string;
  categoryName: string;
  imageUrl: string;
  productCount: number;
};
const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const { api } = useAxios();

  useEffect(() => {
    const fetchBrands = async () => {
      const response = await api.get(
        `${import.meta.env.VITE_LOCAL_SERVER_URL}/sub-categories`
      );
      console.log(response.data?.data?.result);
      setBrands(response.data?.data?.result);
    };
    fetchBrands();
  }, [api]);

  // delete logic
  const handleBrandDelete = async (id: string) => {
    try {
      setLoading(true);

      const response = await api.delete(
        `${import.meta.env.VITE_LOCAL_SERVER_URL}/sub-categories/${id}`
      );

      if (response.status === 200) {
        // removing the brand from state
        setBrands((prevBrands) =>
          prevBrands.filter((brand: TBrand) => brand._id !== id)
        );
        toast.success("Brand Is Deleted Successfully", {
          duration: 3000,
          position: "top-right",
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      toast.error("Failed To Delete Brand", {
        duration: 3000,
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-[300px] sm:max-w-full">
      <Link to="/admin/add-brand">Add New brand</Link>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-200 text-black font-semibold text-center">
            <TableCell>Brand Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Available Products</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {brands.map((brand: TBrand) => (
            <TableRow key={brand._id} className="text-center">
              <TableCell>{brand.brandName}</TableCell>
              <TableCell>{brand.categoryName}</TableCell>
              <TableCell>
                <img
                  src={brand.imageUrl}
                  alt={brand.brandName}
                  width={60}
                  height={60}
                  className="rounded-sm mx-auto"
                />
              </TableCell>
              <TableCell>{brand.productCount}</TableCell>
              <TableCell>
                <button>
                  <Edit />
                </button>
              </TableCell>
              <TableCell>
                <AlertDialog>
                  <AlertDialogTrigger>
                    <button>
                      <Trash />
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to delete this brand?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete this brand.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleBrandDelete(brand._id)}
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
  );
};

export default Brands;
