import { GroupState } from "@/types/attribute_template/attribute_template_types";
import AddGroupButton from "./AddGroupButton";
import GroupCard from "./GroupCard";

type GroupSectionProps = {
  groups: GroupState[];
  onAddAttribute: (groupId: string) => void;
};
const GroupSection = ({ groups, onAddAttribute }: GroupSectionProps) => {
  return (
    <div className="space-y-4">
      {groups.map((group) => (
        <GroupCard
          key={group.id}
          group={group}
          onAddAttribute={onAddAttribute}
        />
      ))}
      <AddGroupButton />
    </div>
  );
};

export default GroupSection;
