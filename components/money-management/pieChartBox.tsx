import { memo, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

type TData = {
  data: TDataObject[];
  colors: string[];
  setPieChartCategory: React.Dispatch<React.SetStateAction<string[]>>;
};
type TDataObject = {
  name: string;
  value: number;
};

// const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({
//   cx,
//   cy,
//   midAngle,
//   innerRadius,
//   outerRadius,
//   percent,
// }: any) => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return `${(percent * 100).toFixed(0)}%`;
// };

export const PieChartBox = memo(
  ({ data, colors, setPieChartCategory }: TData) => {
    useEffect(() => {
      if (data.map((v) => !Number.isNaN(v.value))) {
        const newLabels = data.map((entry) => {
          const percent =
            entry.value / data.reduce((acc, cur) => acc + cur.value, 0);
          return !Number.isNaN(percent)
            ? `${(percent * 100).toFixed(0)}%`
            : "0%";
        });
        setPieChartCategory(newLabels);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            // label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
                onClick={(e) => console.log(e)}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  }
);

PieChartBox.displayName = "PieChartBox";
