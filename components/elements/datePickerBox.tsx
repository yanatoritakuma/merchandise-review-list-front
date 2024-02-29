import { memo } from "react";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

type Props = {
  value: Dayjs | null;
  onChange: (value: React.SetStateAction<Dayjs | null>) => void;
};

export const DatePickerBox = memo(({ value, onChange }: Props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker value={value} onChange={onChange} />
    </LocalizationProvider>
  );
});

DatePickerBox.displayName = "DatePickerBox";
