// date型を文字列に変換する
export const convertDateString = (dateString: string) => {
  // 文字列を Date オブジェクトに変換
  const dateInitObject = new Date(dateString);

  // 年、月、日を取得
  const utcYear = dateInitObject.getUTCFullYear();
  const utcMonth = (dateInitObject.getUTCMonth() + 1)
    .toString()
    .padStart(2, "0");
  const urcDay = dateInitObject.getUTCDate().toString().padStart(2, "0");

  // 年月日を組み合わせて文字列に変換
  const resultString = `${utcYear}${utcMonth}${urcDay}`;
  return resultString;
};

// 年月日を文字列に変換
export const convertDateText = (numericValue: number): string => {
  // 数値から年、月、日を抽出
  const year = Math.floor(numericValue / 10000);
  const month = Math.floor((numericValue % 10000) / 100);
  const day = numericValue % 100;

  // 月と日を1桁に変換
  const formattedMonth = month.toString().padStart(1, "0");
  const formattedDay = day.toString().padStart(1, "0");

  // フォーマットした文字列を返す
  return `${year}年${formattedMonth}月${formattedDay}日`;
};
