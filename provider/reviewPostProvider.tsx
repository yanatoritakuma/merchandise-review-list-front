import React, { createContext, useState } from "react";

type TReviewPostGlobal = {
  reviewPostGlobal: {
    id: number;
    title: string;
    text: string;
    image: string;
    review: number;
  };
  setReviewPostGlobal: React.Dispatch<
    React.SetStateAction<{
      id: number;
      title: string;
      text: string;
      image: string;
      review: number;
    }>
  >;
  reviewPostProcess: boolean;
  setReviewPostProcess: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ReviewPostContext = createContext<TReviewPostGlobal>({
  reviewPostGlobal: {
    id: 0,
    title: "",
    text: "",
    image: "",
    review: 0,
  },
  setReviewPostGlobal: () => {},
  reviewPostProcess: false,
  setReviewPostProcess: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const ReviewPostProvider = (props: Props) => {
  const { children } = props;
  const [reviewPostGlobal, setReviewPostGlobal] = useState({
    id: 0,
    title: "",
    text: "",
    image: "",
    review: 0,
  });

  const [reviewPostProcess, setReviewPostProcess] = useState(false);

  return (
    <ReviewPostContext.Provider
      value={{
        reviewPostGlobal,
        setReviewPostGlobal,
        reviewPostProcess,
        setReviewPostProcess,
      }}
    >
      {children}
    </ReviewPostContext.Provider>
  );
};