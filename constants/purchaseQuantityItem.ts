export const purchaseQuantityItem = (max: number) => {
  const item = [{ item: "1", value: "1" }];
  for (let i = 2; i <= max; i++) {
    item.push({ item: String(i), value: String(i) });
  }

  return item;
};
