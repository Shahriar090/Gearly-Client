import { AttributeTemplateProvider } from "@/providers/AttributeTemplateProvider";
import AttributeTemplateCreatePage from "./AttributeTemplateCreatePage";

const CreateTemplatePage = () => {
  return (
    <AttributeTemplateProvider>
      <AttributeTemplateCreatePage />
    </AttributeTemplateProvider>
  );
};

export default CreateTemplatePage;
