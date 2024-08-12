export type TReqHouseholdBudget = {
  title: string;
};

type THouseholdBudgets = {
  id: number;
  user_id: number;
  title: string;
  created_at: string;
};

export type TResHouseholdBudget = {
  householdBudgets: THouseholdBudgets[];
  totalPageCount: number;
};
