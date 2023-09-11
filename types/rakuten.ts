export type TRakutenProducts = {
  Items: TItems[];
  count: number;
  page: number;
};

type TItems = {
  Item: {
    itemName: string; // 商品名
    itemPrice: number; // 値段
    itemCaption: string; // キャッチコピー
    itemUrl: string; // 商品URL
    reviewAverage: number; //レビュー平均
    availability: number; //在庫　0：在庫なし 1：在庫あり
    mediumImageUrls: [{ imageUrl: string }]; // 画像
  };
};
