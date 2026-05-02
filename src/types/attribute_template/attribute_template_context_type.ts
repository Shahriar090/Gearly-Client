import {
  AttributeState,
  GroupState,
  TemplateState,
} from "./attribute_template_types";

export type AttributeTemplateContextType = {
  state: TemplateState;

  addGroup: (groupName: string) => void;
  updateGroup: (groupId: string, data: Partial<GroupState>) => void;
  deleteGroup: (groupId: string) => void;

  addAttribute: (groupId: string, attribute: AttributeState) => void;
  updateAttribute: (
    groupId: string,
    attributeId: string,
    data: Partial<AttributeState>,
  ) => void;
  deleteAttribute: (groupId: string, attributeId: string) => void;

  resetTemplate: () => void;
};
