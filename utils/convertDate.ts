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

// 日本時間をUTCに変換
export const convertDateUtc = (resultString: string) => {
  //   年、月、日を抽出
  const getYear = parseInt(resultString.slice(0, 4), 10);
  const getMonth = parseInt(resultString.slice(4, 6), 10) - 1; // 月は0-indexedなので1引く
  const getDay = parseInt(resultString.slice(6, 8), 10);
  //   新しい Date オブジェクトを作成
  const dateNewObject = new Date(getYear, getMonth, getDay);

  // バリデーション: 有効な日付でない場合、0を返す
  if (isNaN(dateNewObject.getTime())) {
    return 0;
  }

  //   UTC 時間に変換された Date オブジェクト
  const dateUtc = dateNewObject.toISOString();
  //   文字列を Date オブジェクトに変換
  const dateObject = new Date(dateUtc);
  // 年、月、日を取得
  const year = dateObject.getUTCFullYear();
  const month = (dateObject.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = dateObject.getUTCDate().toString().padStart(2, "0");
  // 年月日を組み合わせて数値に変換
  const numericDate = parseInt(`${year}${month}${day}`, 10);
  return numericDate;

  return 0;
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
