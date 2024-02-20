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

export type TResProduct = {
  totalPageCount: number;
  products: TProduct[];
};

export type TResProductTimeLimit = {
  totalPageCount: number;
  productsTimeLimit: TProduct[];
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
