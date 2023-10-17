import { SyntheticEvent, memo } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

type Props = {
  labels: string[];
  radioValues: string[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const RadioBox = memo(
  ({ labels, radioValues, value, onChange }: Props) => {
    return (
      <FormControl>
        {labels.map((label, index) => (
          <RadioGroup key={index} value={value} onChange={onChange}>
            <FormControlLabel
              value={radioValues[index]}
              control={<Radio />}
              label={label}
            />
          </RadioGroup>
        ))}
      </FormControl>
    );
  }
);

RadioBox.displayName = "RadioBox";
