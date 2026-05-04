import { GroupState } from "@/types/attribute_template/attribute_template_types";
import AddGroupButton from "./AddGroupButton";
import GroupCard from "./GroupCard";

const GroupSection = ({ groups }: { groups: GroupState[] }) => {
  return (
    <div className="space-y-4">
      {groups.map((group) => (
        <GroupCard key={group.id} group={group} />
      ))}
      <AddGroupButton />
    </div>
  );
};

export default GroupSection;
