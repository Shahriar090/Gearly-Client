import { useAttributeTemplate } from "@/hooks/useAttributeTemplate";
import { GroupState } from "@/types/attribute_template/attribute_template_types";
import { useState } from "react";

type GroupCardProps = {
  group: GroupState;
  onAddAttribute: (groupId: string) => void;
};

const GroupCard = ({ group, onAddAttribute }: GroupCardProps) => {
  const { updateGroup, deleteGroup } = useAttributeTemplate();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(group.groupName);

  const handleSave = () => {
    if (!name.trim()) return;
    updateGroup(group.id, { groupName: name });
    setIsEditing(false);
  };
  return (
    <div className="border rounded p-4 space-y-3">
      {/* group name */}
      <div className="flex justify-between items-center">
        {isEditing ? (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={handleSave}
            className="border px-2 py-1"
            autoFocus
          />
        ) : (
          <div
            className="font-semibold cursor-pointer"
            onClick={() => setIsEditing(true)}
          >
            {group.groupName}
          </div>
        )}

        <button
          onClick={() => deleteGroup(group.id)}
          className="text-red-500 text-sm cursor-pointer"
        >
          Delete
        </button>
      </div>

      {/* attributes */}

      <div className="space-y-2">
        {group.attributes.length === 0 ? (
          <div className="text-sm text-gray-500">No Attributes Yet!</div>
        ) : (
          group.attributes.map((attr) => (
            <div key={attr.id} className="border p-2 text-sm">
              {attr.name} ({attr.type})
            </div>
          ))
        )}
      </div>

      {/* add attribute */}

      <button
        onClick={() => onAddAttribute(group.id)}
        className="text-blue-500 text-sm"
      >
        + Add Attribute
      </button>
    </div>
  );
};

export default GroupCard;
