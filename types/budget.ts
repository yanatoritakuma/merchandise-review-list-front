export type TReqBudget = {
  id?: number;
  month: string;
  year: string;
  total_price: number;
  food: number;
  drink: number;
  book: number;
  fashion: number;
  furniture: number;
  games_toys: number;
  beauty: number;
  every_day_items: number;
  other: number;
};

export type TResBudget = {
  budget: {
    id: number;
    month: string;
    year: string;
    total_price: number;
    food: number;
    drink: number;
    book: number;
    fashion: number;
    furniture: number;
    games_toys: number;
    beauty: number;
    every_day_items: number;
    other: number;
    notice: boolean;
    created_at: Date;
  };
};
