import { AttributeTemplateContext } from "@/contexts";
import {
  AttributeState,
  GroupState,
  TemplateState,
} from "@/types/attribute_template/attribute_template_types";
import React, { useState } from "react";

const initialState: TemplateState = {
  name: "",
  categoryId: "",
  groups: [],
};

export const AttributeTemplateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, setState] = useState<TemplateState>(initialState);

  // add group

  const addGroup = (groupName: string) => {
    const newGroup: GroupState = {
      id: crypto.randomUUID(),
      groupName,
      order: state.groups.length,
      attributes: [],
    };

    setState((prev) => ({
      ...prev,
      groups: [...prev.groups, newGroup],
    }));
  };

  // update group

  const updateGroup = (groupId: string, payload: Partial<GroupState>) => {
    setState((prev) => ({
      ...prev,
      groups: prev.groups.map((group) =>
        group.id === groupId ? { ...group, ...payload } : group,
      ),
    }));
  };

  // delete group

  const deleteGroup = (groupId: string) => {
    setState((prev) => ({
      ...prev,
      groups: prev.groups.filter((group) => group.id !== groupId),
    }));
  };

  // add attribute

  const addAttribute = (groupId: string, attribute: AttributeState) => {
    setState((prev) => ({
      ...prev,
      groups: prev.groups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              attributes: [
                ...group.attributes,
                { ...attribute, id: crypto.randomUUID() },
              ],
            }
          : group,
      ),
    }));
  };

  // update attribute

  const updateAttribute = (
    groupId: string,
    attributeId: string,
    payload: Partial<AttributeState>,
  ) => {
    setState((prev) => ({
      ...prev,
      groups: prev.groups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              attributes: group.attributes.map((attr) =>
                attr.id === attributeId ? { ...attr, ...payload } : attr,
              ),
            }
          : group,
      ),
    }));
  };

  // delete attribute

  const deleteAttribute = (groupId: string, attributeId: string) => {
    setState((prev) => ({
      ...prev,
      groups: prev.groups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              attributes: group.attributes.filter(
                (attr) => attr.id !== attributeId,
              ),
            }
          : group,
      ),
    }));
  };

  // reset template

  const resetTemplate = () => {
    setState(initialState);
  };

  // attribute template meta infos: categoryId, template name
  const setTemplateMeta = (data: { name?: string; categoryId?: string }) => {
    setState((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const value = {
    state,
    addGroup,
    updateGroup,
    deleteGroup,
    addAttribute,
    updateAttribute,
    deleteAttribute,
    resetTemplate,
    setTemplateMeta,
  };

  return (
    <AttributeTemplateContext.Provider value={value}>
      {children}
    </AttributeTemplateContext.Provider>
  );
};
