"use client";

import { BackdropContext } from "@/provider/backdropProvider";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { memo, useContext } from "react";

type Props = {
  open: boolean;
};

export const BackdropBox = memo(({ open }: Props) => {
  const { backdropFlag } = useContext(BackdropContext);
  return (
    <div>
      {open ? (
        <Backdrop
          open={true}
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={backdropFlag}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </div>
  );
});

BackdropBox.displayName = "BackdropBox";
