type TemplateHeaderPresenterProps = {
  name: string;
  categoryId: string;
  categories: [];
  onNameChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSave: () => void;
  isSaving: boolean;
  isLoadingCategories?: boolean;
};

const TemplateHeaderPresenter = ({
  name,
  categoryId,
  categories,
  onNameChange,
  onCategoryChange,
  onSave,
  isSaving,
  isLoadingCategories,
}: TemplateHeaderPresenterProps) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex w-full gap-4">
        <input
          type="text"
          placeholder="Template Name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className="w-1/2 border p-2"
        />

        <select
          value={categoryId}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-1/2 border p-2"
          disabled={isLoadingCategories}
        >
          <option value="">
            {isLoadingCategories ? "Loading Categories..." : "Select Category"}
          </option>

          {categories.map((cat: any) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={onSave}
        disabled={isSaving}
        className="rounded bg-black px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSaving ? "Saving..." : "Save"}
      </button>
    </div>
  );
};

export default TemplateHeaderPresenter;
