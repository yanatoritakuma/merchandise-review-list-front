export type TReqMoneyManagementMutation = {
  title: string;
  category: string;
  quantity: number;
  unit_price: number;
  total_price: number;
};

export type TResMoneyManagement = {
  food: TMoneyManagements[];
  drink: TMoneyManagements[];
  book: TMoneyManagements[];
  fashion: TMoneyManagements[];
  furniture: TMoneyManagements[];
  gamesToys: TMoneyManagements[];
  beauty: TMoneyManagements[];
  everyDayItems: TMoneyManagements[];
  other: TMoneyManagements[];
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
