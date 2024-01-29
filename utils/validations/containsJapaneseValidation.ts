export const containsJapanese = (fileName: string) => {
  const japaneseRegex =
    /[一-龠々〆ヵヶぁ-ゔゞァ-・ヽヾ゛゜ー「」｢｣()〔〕［］｛｝〈〉《》【】〖〗〘〙〚〛〜～]/;
  return japaneseRegex.test(fileName);
};
