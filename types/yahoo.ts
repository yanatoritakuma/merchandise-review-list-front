export type TYahooProducts = {
  totalResultsAvailable: number; //総検索ヒット件数
  totalResultsReturned: number; //返却された商品件数
  firstResultsPosition: number; //最初のデータが何件目にあたるか（最初＝1）
  request: {
    query: string; //検索クエリ
  };
  hits: TYahooHit[];
};

export type TYahooHit = {
  index: number; //検索結果の順番
  name: string; //商品名
  description: string; //商品説明
  url: string; //商品URL
  code: string; // 商品コード
  inStock: boolean; //true：在庫ありのみ false：在庫なしのみ
  price: number; //価格
  image: {
    small: string;
    medium: string;
  };
  exImage: {
    url: string;
  };
  review: {
    rate: number; //レビュー平均
  };
};
