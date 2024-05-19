export const monthMenuItem = [{ item: "", value: "" }];

for (let i = 0; i < 12; i++) {
  monthMenuItem.push({
    item: `${i + 1}月`,
    value: `${i + 1}月`,
  });
}

const currentYear = new Date().getFullYear();

export const yearMenuItem = [{ item: "", value: "" }];

for (let i = 0; i <= 50; i++) {
  const year = currentYear + i;
  yearMenuItem.push({
    item: `${year}年`,
    value: `${year}年`,
  });
}
