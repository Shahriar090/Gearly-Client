import { TProduct } from "../products.types";

export const extractSpecificationFilters = (products: TProduct[]) => {
  const filters: { [key: string]: Set<string> } = {};

  products.forEach((product) => {
    product.specifications.forEach((specGroup) => {
      specGroup.fields.forEach((field) => {
        const key = field.name;
        const value = field.value;

        if (!filters[key]) {
          // using set to avoid duplicate adding
          filters[key] = new Set();
        }
        filters[key].add(value);
      });
    });
  });

  // converting sets to array with a new object
  const filtersArray: { [key: string]: string[] } = {};

  Object.keys(filters).forEach((key) => {
    filtersArray[key] = Array.from(filters[key]);
  });

  //   return the final filter object with arrays
  return filtersArray;
};

// filter by specifications utility function
export const filterBySpecifications = (
  products: TProduct[],
  selectedSpecifications: Record<string, string[]>
): TProduct[] => {
  return products.filter((product) => {
    // every() ensures all filters match for the current product.
    return Object.entries(selectedSpecifications).every(
      ([key, selectedValues]) => {
        // check if the product has this specification and one of its values matches.
        return product.specifications.some((specGroup) =>
          specGroup.fields.some(
            (field) =>
              field.name === key && selectedValues.includes(field.value)
          )
        );
      }
    );
  });
};
