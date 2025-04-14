const Descriptions = ({ description }: { description: string }) => {
  return (
    <div className="main-container  bg-white p-4 shadow">
      <h1 className="text-xl font-medium text-[var(--color-black)]">
        Description
      </h1>
      <article className="my-6">
        <p className="text-[var(--color-black)] text-sm">{description}</p>
      </article>
    </div>
  );
};

export default Descriptions;
