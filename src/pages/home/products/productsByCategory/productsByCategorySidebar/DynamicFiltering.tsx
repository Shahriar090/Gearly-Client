const DynamicFiltering = ({ products }) => {
  const filteringFields = products?.[0]?.category?.filteringFields;
  if (!filteringFields || filteringFields.length === 0) {
    return null;
  }
  return (
    <div>
      {filteringFields.map((field) => (
        <div key={field.groupName} className="mt-4 border">
          <h1 className="font-medium text-[var(--color-black)]">
            {field.groupName}
          </h1>
          {/* divider */}
          <div className="w-full h-0.5 bg-gray-100"></div>
          {field.value.map((val) => (
            <div key={val[0]} className="flex items-center gap-3">
              <input type="checkbox" />
              <p>{val}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DynamicFiltering;
