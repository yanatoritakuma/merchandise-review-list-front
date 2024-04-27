export type TReqMoneyManagementMutation = {
  id?: number;
  title: string;
  category: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  updated_at: string;
};

export type TResMoneyManagement = {
  food: TMoneyManagementItem;
  drink: TMoneyManagementItem;
  book: TMoneyManagementItem;
  fashion: TMoneyManagementItem;
  furniture: TMoneyManagementItem;
  gamesToys: TMoneyManagementItem;
  beauty: TMoneyManagementItem;
  everyDayItems: TMoneyManagementItem;
  other: TMoneyManagementItem;
  totalPrice: number;
};

type TMoneyManagementItem = {
  items: TMoneyManagements[];
  itemTotalPrice: number;
};

type TMoneyManagements = {
  category: string;
  created_at: string;
  id: number;
  quantity: number;
  title: string;
  total_price: number;
  unit_price: number;
  updated_at: string;
};

export type TManagementRowData = {
  id: number;
  date: string;
  name: string;
  category: string;
  quantity: number;
  totalPrice: number;
  unitPrice: number;
};
