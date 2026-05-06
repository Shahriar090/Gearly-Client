import { useAttributeTemplate } from "@/hooks/useAttributeTemplate";
import { useState } from "react";
import AttributeTemplateModal from "./components/AttributeTemplateModal";
import GroupSection from "./components/GroupSection";
import TemplateHeader from "./components/TemplateHeader";

const AttributeTemplateCreatePage = () => {
  const { state } = useAttributeTemplate();

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
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <TemplateHeader />

      {/* Groups */}
      <GroupSection groups={state.groups} onAddAttribute={openAttributeModal} />

      {/* modal */}
      <AttributeTemplateModal
        open={isModalOpen}
        onClose={closeModal}
        groupId={selectedGroupId}
      />
    </div>
  );
};

export default AttributeTemplateCreatePage;
