import { useAttributeTemplate } from "@/hooks/useAttributeTemplate";
import { useState } from "react";
import GroupSection from "./components/GroupSection";
import TemplateHeader from "./components/TemplateHeader";

const AttributeTemplateCreatePage = () => {
  // modal related state
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openAttributeModal = (groupId: string) => {
    setSelectedGroupId(groupId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedGroupId(null);
    setIsModalOpen(false);
  };
  const { state } = useAttributeTemplate();
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <TemplateHeader />

      {/* Groups */}
      <GroupSection groups={state.groups} onAddAttribute={openAttributeModal} />
    </div>
  );
};

export default AttributeTemplateCreatePage;
