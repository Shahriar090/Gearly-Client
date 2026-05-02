import { AttributeTemplateContext } from "@/contexts";
import { useContext } from "react";

export const useAttributeTemplate = () => {
  const context = useContext(AttributeTemplateContext);

  if (!context) {
    throw new Error(
      "useAttributeTemplate must be used within AttributeTemplateProvider",
    );
  }

  return context;
};
