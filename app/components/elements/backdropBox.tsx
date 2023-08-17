"use client";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { memo } from "react";

export const BackdropBox = memo(() => {
  return (
    <div>
      <Backdrop open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
});

BackdropBox.displayName = "BackdropBox";
