import React, { createContext, useState } from "react";

type TBackdrop = {
  backdropFlag: boolean;
  setBackdropFlag: React.Dispatch<React.SetStateAction<boolean>>;
};

export const BackdropContext = createContext<TBackdrop>({
  backdropFlag: false,
  setBackdropFlag: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const BackdropProvider = (props: Props) => {
  const { children } = props;
  const [backdropFlag, setBackdropFlag] = useState(false);

  return (
    <BackdropContext.Provider
      value={{
        backdropFlag,
        setBackdropFlag,
      }}
    >
      {children}
    </BackdropContext.Provider>
  );
};
