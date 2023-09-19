export type TReqProduct = {
  name: string;
  description: string;
  stock: boolean;
  price: number;
  review: number;
  url: string;
  image: string;
  code: string;
};

export type TResProduct = {
  totalPageCount: number;
  products: {
    id: number;
    name: string;
    description: string;
    stock: boolean;
    price: number;
    review: number;
    url: string;
    image: string;
    createdAt: string;
  }[];
};
