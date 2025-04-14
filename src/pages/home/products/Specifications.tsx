import { TSpecifications } from "./products.types";

const Specifications = ({
  specifications,
}: {
  specifications: TSpecifications[];
}) => {
  return (
    <div className="main-container bg-white p-4 shadow">
      <h1 className="text-xl font-medium text-[var(--color-black)]">
        Specifications
      </h1>

      <div className="my-6">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid gap-4">
          {specifications.map((spec) => (
            <li key={spec._id} className="bg-white rounded p-3 shadow">
              <p className="font-semibold text-sm text-[var(--color-black)]">
                {spec.name}
              </p>
              <p className="text-[var(--color-black)] text-sm font-medium">
                {spec.value}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Specifications;
