import { TProduct } from "../../products.types";

const DynamicFiltering = ({ products }: { products: TProduct[] }) => {
  const filteringFields = products?.[0]?.category?.filteringFields;
  if (!filteringFields || filteringFields.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {filteringFields.map((field) => (
        <div
          key={field.groupName}
          className="border rounded-xl shadow-sm bg-[var(--color-white)]"
        >
          <h2 className="text-lg font-semibold text-[var(--color-gray)] px-5 py-3 bg-[var(--color-bg-gray)] rounded-t-xl">
            {field.groupName}
          </h2>

          <div className="divide-y divide-[var(--color-bg-gray)] h-[200px] overflow-y-auto hide-scrollbar">
            {field.value.map((val, index) => (
              <label
                key={val[0] || index}
                className="flex items-center gap-3 px-5 py-3 hover:bg-[var(--color-bg-gray)] cursor-pointer"
              >
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm text-[var(--color-gray)]">{val}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DynamicFiltering;
