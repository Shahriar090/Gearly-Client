const Heading = () => {
  return (
    <>
      <div className="bg-[var(--color-heading-text-bg)] p-3 rounded">
        <p className="text-sm text-[var(--color-gray)] uppercase font-medium">
          If the product price is inconsistent due to technical errors, Gearly
          E-commerce reserves the right to cancel the order.
        </p>
      </div>
      <div className="mt-5">
        <h1 className="text-xl font-medium text-[var(--color-gray)]">
          Checkout
        </h1>
      </div>
    </>
  );
};

export default Heading;
