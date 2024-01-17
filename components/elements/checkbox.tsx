import React, { memo } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

type Props = {
  label?: string;
  defaultChecked?: boolean;
  disabled?: boolean;
  check: boolean;
  onChange:
    | ((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void)
    | undefined;
};

export const CheckBox = memo(
  ({ label, defaultChecked, disabled, check, onChange }: Props) => {
    return (
      <div>
        <FormGroup style={{ width: "fit-content" }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={check}
                onChange={onChange}
                defaultChecked={defaultChecked}
                disabled={disabled}
              />
            }
            label={label}
          />
        </FormGroup>
      </div>
    );
  }
);

CheckBox.displayName = "CheckBox";
