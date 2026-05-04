import { GroupState } from "@/types/attribute_template/attribute_template_types";

const GroupCard = ({ group }: { group: GroupState }) => {
  return (
    <div className="border rounded p-4 space-y-3">
      {/* group name */}
      <div className="font-semibold">{group.groupName}</div>

      {/* attribute placeholder */}

      <div className="text-sm text-gray-500">No Attributes Yet!</div>

      {/* Future: Add Attribute Button */}

      <button className="text-blue-500 text-sm">+ Add Attribute</button>
    </div>
  );
};

export default GroupCard;
