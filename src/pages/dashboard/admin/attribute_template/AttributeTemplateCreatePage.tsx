import { useAttributeTemplate } from "@/hooks/useAttributeTemplate";
import GroupSection from "./components/GroupSection";
import TemplateHeader from "./components/TemplateHeader";

const AttributeTemplateCreatePage = () => {
  const { state } = useAttributeTemplate();
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <TemplateHeader />

      {/* Groups */}
      <GroupSection groups={state.groups} />
    </div>
  );
};

export default AttributeTemplateCreatePage;
