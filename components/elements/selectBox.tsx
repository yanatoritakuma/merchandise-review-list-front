import { memo } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type Props = {
  label: string;
  value: string;
  onChange: (event: SelectChangeEvent) => void;
  menuItem: {
    item: string;
    value: string;
  }[];
};

export const SelectBox = memo(({ label, value, onChange, menuItem }: Props) => {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select value={value} label={label} onChange={onChange}>
        {menuItem.map((items, index) => (
          <MenuItem key={index} value={items.value}>
            {items.item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});

SelectBox.displayName = "SelectBox";
