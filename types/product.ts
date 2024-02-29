import dayjs from "dayjs";

export type TReqProduct = {
  name: string;
  description: string;
  stock: boolean;
  price: number;
  review: number;
  url: string;
  image: string;
  provider: "yahoo" | "rakuten";
  code: string;
};

export type TReqProductTime = {
  productId: number;
  timeLimit: dayjs.Dayjs | null;
};

export type TResProduct = {
  totalPageCount: number;
  products: TProduct[];
};

export type TResProductYearMonth = {
  productNumbers: TProductNumbers[];
};

export type TProduct = {
  id: number;
  name: string;
  description: string;
  stock: boolean;
  price: number;
  review: number;
  url: string;
  image: string;
  provider: "yahoo" | "rakuten";
  timeLimit: string;
  createdAt: string;
};

type TProductNumbers = {
  timeLimit: string;
};
