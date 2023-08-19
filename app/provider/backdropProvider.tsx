"use client";
import { createContext, useState } from "react";

type TBackdrop = {
  backdropFlag: boolean;
  setBackdropFlag: React.Dispatch<React.SetStateAction<boolean>>;
  apiTimeOutFlag: boolean;
  setApiTimeOutFlag: React.Dispatch<React.SetStateAction<boolean>>;
};

export const BackdropContext = createContext<TBackdrop>({
  backdropFlag: false,
  setBackdropFlag: () => {},
  apiTimeOutFlag: false,
  setApiTimeOutFlag: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const BackdropProvider = (props: Props) => {
  const { children } = props;
  const [backdropFlag, setBackdropFlag] = useState(false);
  const [apiTimeOutFlag, setApiTimeOutFlag] = useState(false);

  return (
    <BackdropContext.Provider
      value={{
        backdropFlag,
        setBackdropFlag,
        apiTimeOutFlag,
        setApiTimeOutFlag,
      }}
    >
      {children}
    </BackdropContext.Provider>
  );
};
