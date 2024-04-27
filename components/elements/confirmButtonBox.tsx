import { memo, useState } from "react";
import { css } from "@emotion/react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type Props = {
  children?: string;
  onClick?: () => void;
  variant?: "text" | "contained" | "outlined";
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  className?: string;
  dialogTitle: string;
  dialogContentText: string;
  decisionText: string;
  cancelText: string;
  decisionColor?: "error" | "warning";
  cancelColor?: "error" | "warning";
};

export const ConfirmButtonBox = memo(
  ({
    children,
    onClick,
    variant,
    disabled,
    size,
    className,
    dialogTitle,
    dialogContentText,
    decisionText,
    cancelText,
    decisionColor,
    cancelColor,
  }: Props) => {
    const [open, setOpen] = useState(false);

    const onClickOpen = () => {
      setOpen(true);
    };

    const onClickDecision = () => {
      if (onClick) {
        onClick();
        setOpen(false);
      }
    };

    const onClickClose = () => {
      setOpen(false);
    };

    return (
      <>
        <Button
          onClick={onClickOpen}
          variant={variant !== undefined ? variant : "contained"}
          disabled={disabled}
          size={size}
          className={className}
        >
          {children}
        </Button>
        <Dialog
          open={open}
          onClose={onClickClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText>{dialogContentText}</DialogContentText>
          </DialogContent>
          <div css={dialogBtn}>
            <Button
              onClick={onClickDecision}
              variant={variant !== undefined ? variant : "contained"}
              color={decisionColor}
            >
              {decisionText}
            </Button>
            <Button
              onClick={onClickClose}
              variant={variant !== undefined ? variant : "contained"}
              color={cancelColor}
            >
              {cancelText}
            </Button>
          </div>
        </Dialog>
      </>
    );
  }
);

ConfirmButtonBox.displayName = "ConfirmButtonBox";

const dialogBtn = css`
  button {
    margin: 14px auto;
    display: block;
  }
`;
