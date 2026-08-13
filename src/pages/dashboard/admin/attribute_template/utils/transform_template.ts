import { TemplateState } from "@/types/attribute_template/attribute_template_types";

export const transformeTemplate = (state: TemplateState) => {
  return {
    categoryId: state.categoryId,
    name: state.name,
    groups: state.groups.map((group, index) => ({
      groupName: group.groupName,
      order: index,
      attributes: group.attributes.map((attr) => ({
        name: attr.name,
        key: attr.key,
        type: attr.type,
        unit: attr.unit,
        options: attr.options,
        validations: attr.validations,
        required: attr.required,
        filterable: attr.filterable,
        sortable: attr.sortable,
      })),
    })),
  };
};
