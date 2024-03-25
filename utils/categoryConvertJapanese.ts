export const categoryConvertJapanese = (name: string) => {
  switch (name) {
    case "food":
      return "食品";

    case "drink":
      return "飲料";

    case "book":
      return "本";

    case "fashion":
      return "ファッション";

    case "furniture":
      return "家具";

    case "gamesToys":
      return "ゲーム・おもちゃ";

    case "beauty":
      return "美容";

    case "everyDayItems":
      return "日用品";

    case "その他":
      return "other";

    default:
      return "その他";
  }
};
