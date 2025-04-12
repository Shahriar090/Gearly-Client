import { TSpecifications } from "./products.types";

const Specifications = ({
  specifications,
}: {
  specifications: TSpecifications[];
}) => {
  console.log(specifications);
  return (
    <div>
      <h1 className="text-xl font-medium">Specifications</h1>
      <div className="my-6">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          {specifications.map((spec) => (
            <li
              key={spec._id}
              className="bg-gray-100 rounded-lg p-3 shadow-sm border"
            >
              <p className="font-semibold">{spec.name}</p>
              <p className="text-gray-700"> {String(spec.value)}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Specifications;
