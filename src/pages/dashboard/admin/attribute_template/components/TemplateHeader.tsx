import { useAttributeTemplate } from "@/hooks/useAttributeTemplate";

const TemplateHeader = () => {
  const { state } = useAttributeTemplate();

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex gap-4 w-full">
        <input
          type="text"
          placeholder="Template Name"
          value={state.name}
          className="border p-2 w-1/2"
          readOnly
        />

        <select className="border p-2 w-1/2" disabled>
          <option>Select Category</option>
        </select>
      </div>

      <button className="bg-black text-white px-4 py-2 rounded">Save</button>
    </div>
  );
};

export default TemplateHeader;
