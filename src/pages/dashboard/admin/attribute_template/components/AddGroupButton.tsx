import { useAttributeTemplate } from "@/hooks/useAttributeTemplate";

const AddGroupButton = () => {
  const { addGroup } = useAttributeTemplate();

  const handleAdd = () => {
    const name = prompt("Enter group name");

    if (!name) return;

    addGroup(name);
  };
  return (
    <button
      onClick={handleAdd}
      className="border border-dashed p-4 w-full text-center"
    >
      + Add Group
    </button>
  );
};

export default AddGroupButton;
