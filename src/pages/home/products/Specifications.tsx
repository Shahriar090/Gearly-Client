import { TSpecificationsGroup } from "./products.types";

const Specifications = ({
  specifications,
}: {
  specifications: TSpecificationsGroup[];
}) => {
  return (
    <div className="main-container bg-[var(--color-white)] p-4 shadow flex flex-col md:flex-row items-start gap-4">
      {/* product specifications */}
      <div className="flex-[4]">
        <h1 className="text-xl font-medium text-[var(--color-black)]">
          Specifications
        </h1>

        <div className="my-6">
          {/* loop through each specification group */}

          {specifications?.map((group) => (
            <div key={group.groupName} className="my-4">
              {/* render the group name  */}
              <h2 className="font-medium text-lg text-[var(--color-blue)] mb-2 bg-[var(--color-bg-gray)] p-2 rounded">
                {group.groupName}
              </h2>

              <ul className="grid grid-cols-1">
                {/* loop through fields withing each group */}
                {group.fields.map((field, index) => (
                  <li
                    key={index}
                    className="bg-[var(--color-white)] flex items-center gap-4 border-b p-2"
                  >
                    {/* render field name and value */}
                    <p className="font-normal text-sm text-[var(--color-gray)]">
                      {field.name}
                    </p>
                    :
                    <p className="text-[var(--color-black)] text-sm font-medium">
                      {field.value}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* related products */}
      <div className="flex-1 w-full shadow bg-[var(--color-white)] h-full">
        <h1 className="text-xl font-medium text-[var(--color-blue)] text-center p-2">
          Related Products
        </h1>
        {/* divider */}
        <div className="w-full h-0.5 bg-gray-100/50 my-2"></div>

        {/* products */}
        <div className="">
          <h1 className="text-center text-sm">Will be added soon</h1>
        </div>
      </div>
    </div>
  );
};

export default Specifications;
