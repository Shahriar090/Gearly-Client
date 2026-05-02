export type TemplateState = {
  name: string;
  categoryId: string;
  groups: GroupState[];
};

export type GroupState = {
  id: string; // local id
  groupName: string;
  order: number;
  attributes: AttributeState[];
};

// Why local id? when I create new group/attr it doesn't
// exist in DB yet, so no _id. But React needs stable keys
// or identification for updates. That's why local id.
export type AttributeState = {
  id: string; // local id
  name: string;
  key: string;
  type: string;

  unit?: string;
  options?: string[];

  validations?: {
    min?: number;
    max?: number;
    pattern?: string;
    minLength?: number;
    maxLength?: number;
  };

  required: boolean;
  filterable: boolean;
  sortable?: boolean;
};
