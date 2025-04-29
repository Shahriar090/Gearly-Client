import useAxios from "@/hooks/useAxios";
import { useEffect, useState } from "react";
import {
  createProductValidationSchema,
  TAddProduct,
} from "./products.validation";
import { toast } from "sonner";
import FormWrapper from "@/components/form/FormWrapper";
import { AVAILABILITY_STATUS } from "./products.constants";
import InputField from "@/components/form/InputField";

const AddProduct = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [specGroups, setSpecGroups] = useState<
    Array<{
      groupName: string;
      fields: Array<{
        name: string;
        type: "string" | "number" | "boolean";
        required: boolean;
        _id: string;
      }>;
    }>
  >([]);
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const { api } = useAxios();

  // fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_LOCAL_URL}/categories`
        );
        setCategories(response.data?.data || []);
      } catch (error) {
        console.error(error, "Error Fetching Categories");
      }
    };
    fetchCategories();
  }, [api]);

  // fetch sub categories (brands) when category changes

  useEffect(() => {
    if (!selectedCategory) return;

    const fetchSubCategories = async () => {
      try {
        const response = await api.get(
          `${
            import.meta.env.VITE_SERVER_LOCAL_URL
          }/sub-categories/sub-category-by-category?category=${selectedCategory}`
        );
        setSubCategories(response.data?.data || []);
      } catch (error) {
        console.error(error, "Error Fetching Sub Categories");
      }
    };
    fetchSubCategories();
  }, [api, selectedCategory]);

  // fetch specifications when category changes. specifications are in category model.
  useEffect(() => {
    if (!selectedCategory) return;
    const fetchSpecifications = async () => {
      try {
        const response = await api.get(
          `${
            import.meta.env.VITE_SERVER_LOCAL_URL
          }/categories/${selectedCategory}`
        );
        console.log(response, "from add product");
        setSpecGroups(response.data?.data?.specifications || []);
      } catch (error) {
        console.error(error, "Error Fetching Specifications");
      }
    };
    fetchSpecifications();
  }, [api, selectedCategory]);

  // form submission
  const handleSubmit = async (productData: TAddProduct) => {
    console.log(productData.specifications, "from add product");
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      // transforming specifications so that it match with back end structure.
      const transformedSpecs = specGroups.map((group) => {
        const groupSpecs = Object.entries(
          productData.specifications?.[group.groupName] || {}
        ).map(([key, value]) => ({
          name: key,
          value,
        }));

        return {
          groupName: group.groupName,
          fields: groupSpecs,
        };
      });

      console.log(transformedSpecs, "spec after transformation");

      // append non file data
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
            specifications: transformedSpecs,
          },
        })
      );

      // append images (multiple)
      const imagesArray = Array.isArray(productData.images)
        ? productData.images
        : Array.from(productData.images || []);

      imagesArray.forEach((file) => {
        formData.append("images", file);
      });

      const response = await api.post(
        `${import.meta.env.VITE_SERVER_LOCAL_URL}/products/create-product`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(response);

      toast.success("Product Created Successfully", {
        duration: 3000,
        position: "top-right",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Failed To Create Product",
        { duration: 3000, position: "top-right" }
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 shadow-lg p-4">
            {/* category selection */}
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
                form.setValue("category", value);
                setSelectedCategory(value);
              }}
            />

            {/* sub category (brand) selection */}
            <InputField
              control={form.control}
              name="subCategory"
              label="Brand (Sub Category)"
              type="select"
              options={subCategories.map(
                (sub: { brandName: string; _id: string }) => ({
                  label: sub.brandName,
                  value: sub._id,
                })
              )}
            />

            {/* grouped specifications */}
            {specGroups.map((group) => (
              <div
                key={group.groupName}
                className="col-span-full border p-4 rounded-lg"
              >
                <h3 className="font-medium text-lg mb-4">{group.groupName}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {group.fields.map((field) => (
                    <InputField
                      key={field._id}
                      control={form.control}
                      name={`specifications.${group.groupName}.${field.name}`}
                      label={field.name}
                      type={
                        field.type === "boolean"
                          ? "checkbox"
                          : field.type === "number"
                          ? "number"
                          : "text"
                      }
                      placeholder={
                        field.type === "boolean"
                          ? undefined
                          : `Enter ${field.name}`
                      }
                      required={field.required}
                    />
                  ))}
                </div>
              </div>
            ))}

            {/* other form fields */}
            <InputField
              control={form.control}
              name="modelName"
              label="Model Name"
              placeholder="Enter Model Name"
            />
            <InputField
              control={form.control}
              name="brandName"
              label="Brand Name"
              placeholder="Enter Brand Name"
            />
            <InputField
              control={form.control}
              name="description"
              label="Description"
              placeholder="Enter A Description About This Product"
            />
            <InputField
              control={form.control}
              name="price"
              label="Price"
              type="number"
              placeholder="Enter Price"
            />
            <InputField
              control={form.control}
              name="discount"
              label="Discount"
              type="number"
              placeholder="Enter Discount Amount (5, 10, 15, 20, etc.)"
            />
            <InputField
              control={form.control}
              name="stock"
              label="Stock"
              type="number"
              placeholder="Enter Stock"
            />
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
            <InputField
              control={form.control}
              name="images"
              label="Images (Multiple)"
              type="file"
              multipleFiles={true}
              onChange={(files: File[]) => {
                form.setValue("images", files);
              }}
            />
            <InputField
              control={form.control}
              name="tags"
              label="Tags"
              type="text"
              placeholder="Enter Tags (Comma-Separated)"
              onChange={(e) => {
                const value = e.target.value;
                form.setValue("tags", value);
              }}
            />
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
