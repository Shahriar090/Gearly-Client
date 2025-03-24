import useAxios from "@/hooks/useAxios";
import { useEffect, useState } from "react";
import {
  createProductValidationSchema,
  TAddProduct,
} from "./products.validation";
import { toast } from "sonner";
import FormWrapper from "@/components/form/FormWrapper";
import InputField from "@/components/form/InputField";
import { AVAILABILITY_STATUS } from "./products.constants";

const AddProduct = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [specifications, setSpecifications] = useState<[]>([]);
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  const { api } = useAxios();

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_LOCAL_SERVER_URL}/categories`
        );
        setCategories(response.data?.data || []);
      } catch (error) {
        console.error(error, "Error fetching categories");
      }
    };
    fetchCategories();
  }, [api]);

  // Fetch subcategories when category changes
  useEffect(() => {
    if (!selectedCategory) return;

    const fetchSubCategories = async () => {
      try {
        const response = await api.get(
          `${
            import.meta.env.VITE_LOCAL_SERVER_URL
          }/sub-categories/sub-category-by-category?category=${selectedCategory}`
        );
        setSubCategories(response.data?.data || []);
      } catch (error) {
        console.error(error, "Error fetching sub categories");
      }
    };
    fetchSubCategories();
  }, [api, selectedCategory]);

  // Fetch specifications when category changes
  useEffect(() => {
    if (!selectedCategory) return;

    const fetchSpecifications = async () => {
      try {
        const response = await api.get(
          `${
            import.meta.env.VITE_LOCAL_SERVER_URL
          }/categories/${selectedCategory}`
        );
        setSpecifications(response.data?.data?.specifications || []);
      } catch (error) {
        console.error(error, "Error fetching specifications");
      }
    };
    fetchSpecifications();
  }, [api, selectedCategory]);

  // Handle form submission
  const handleSubmit = async (productData: TAddProduct) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      // Append non-file data
      formData.append(
        "data",
        JSON.stringify({
          product: {
            modelName: productData.modelName,
            brandName: productData.brandName,
            description: productData.description,
            price: productData.price,
            discount: productData.discount,
            tags: productData.tags,
            availabilityStatus: productData.availabilityStatus,
            stock: productData.stock,
            category: productData.category,
            subCategory: productData.subCategory,
            brand: productData.brand,
            isFeatured: productData.isFeatured,
            isDeleted: productData.isDeleted,
            specifications: productData.specifications,
          },
        })
      );

      // Append multiple files
      const imagesArray = Array.isArray(productData.images)
        ? productData.images
        : Array.from(productData.images || []);

      // Append images correctly
      imagesArray.forEach((file) => {
        formData.append("images", file);
      });

      // Submit the form data
      const response = await api.post(
        `${import.meta.env.VITE_LOCAL_SERVER_URL}/products/create-product`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log(response);
      toast.success("Product Created Successfully!", {
        duration: 3000,
        position: "top-right",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Failed to create product",
        {
          duration: 3000,
          position: "top-right",
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormWrapper
      schema={createProductValidationSchema}
      defaultValues={{
        modelName: "",
        brandName: "",
        description: "",
        price: 0,
        discount: 0,
        tags: [],
        availabilityStatus: AVAILABILITY_STATUS.IN_STOCK,
        stock: 0,
        category: "",
        subCategory: "",
        brand: "",
        images: [],
        isFeatured: false,
        isDeleted: false,
        specifications: {},
      }}
      onSubmit={handleSubmit}
      submitButtonLabel={isSubmitting ? "Please Wait..." : "Add Product"}
      submitButtonIsDisabled={isSubmitting}
    >
      {(form) => {
        return (
          <div className="space-y-4">
            {/* Category Selection */}
            <InputField
              control={form.control}
              name="category"
              label="Category Name"
              type="select"
              options={categories.map((cat: { name: string; _id: string }) => ({
                label: cat.name,
                value: cat._id,
              }))}
              onChange={(value: string) => {
                form.setValue("category", value); // Update the form value
                setSelectedCategory(value); // Update the state
              }}
            />

            {/* Subcategory (Brand) Selection */}
            <InputField
              control={form.control}
              name="subCategory"
              label="Brand (Subcategory)"
              type="select"
              options={subCategories.map(
                (sub: { brandName: string; _id: string }) => ({
                  label: sub.brandName,
                  value: sub._id,
                })
              )}
            />

            {/* Dynamic Specifications */}
            {Array.isArray(specifications) &&
              specifications.map(
                (spec: {
                  _id: string;
                  name: string;
                  required: boolean;
                  type: "text" | "number" | "boolean";
                }) => (
                  <InputField
                    key={spec._id}
                    control={form.control}
                    name={`specifications.${spec.name}`}
                    label={spec.name}
                    type={spec.type === "boolean" ? "checkbox" : spec.type}
                    placeholder={
                      spec.type === "boolean" ? undefined : `Enter ${spec.name}`
                    }
                    required={spec.required}
                  />
                )
              )}

            {/* Model Name */}
            <InputField
              control={form.control}
              name="modelName"
              label="Model Name"
              placeholder="Enter model name"
            />
            {/* Brand Name */}
            <InputField
              control={form.control}
              name="brandName"
              label="Brand Name"
              placeholder="Enter model name"
            />

            {/* Description */}
            <InputField
              control={form.control}
              name="description"
              label="Description"
              type="textarea"
              placeholder="Enter description"
            />

            {/* Price */}
            <InputField
              control={form.control}
              name="price"
              label="Price"
              type="number"
              placeholder="Enter price"
            />

            {/* Discount */}
            <InputField
              control={form.control}
              name="discount"
              label="Discount"
              type="number"
              placeholder="Enter discount amount (5, 10, 20, etc.)"
            />

            {/* Stock */}
            <InputField
              control={form.control}
              name="stock"
              label="Stock"
              type="number"
              placeholder="Enter stock"
            />

            {/* Availability Status */}
            <InputField
              control={form.control}
              name="availabilityStatus"
              label="Availability Status"
              type="select"
              options={Object.values(AVAILABILITY_STATUS).map((status) => ({
                label: status,
                value: status,
              }))}
            />

            {/* Images */}
            <InputField
              control={form.control}
              name="images"
              label="Images"
              type="file"
              multipleFiles={true}
              onChange={(files: File[]) => {
                form.setValue("images", files); // Directly set the files array
              }}
            />

            {/* Tags */}
            <InputField
              control={form.control}
              name="tags"
              label="Tags"
              type="text"
              placeholder="Enter tags (comma-separated)"
              onChange={(e) => {
                const value = e.target.value;
                form.setValue("tags", value); // Store as comma-separated string
              }}
            />

            {/* Is Featured */}
            <InputField
              control={form.control}
              name="isFeatured"
              label="Is Featured"
              type="checkbox"
            />
          </div>
        );
      }}
    </FormWrapper>
  );
};

export default AddProduct;
