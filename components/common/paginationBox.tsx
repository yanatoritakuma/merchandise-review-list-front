import { memo, useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { animateScroll as scroll, scroller } from "react-scroll";

type Props = {
  count: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  targetScroll?: string;
  noScroll?: boolean;
};

export const PaginationBox = memo(
  ({ count, currentPage, setCurrentPage, targetScroll, noScroll }: Props) => {
    const [beforeCurrentPage, _] = useState(currentPage);
    console.log("noScroll", noScroll);
    useEffect(() => {
      if (noScroll === undefined) {
        if (currentPage !== beforeCurrentPage) {
          if (!targetScroll) {
            scroll.scrollToTop();
          } else {
            scroller.scrollTo(targetScroll, {
              smooth: true,
              duration: 500,
              offset: -150,
            });
          }
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    return (
      <Stack spacing={2} style={{ margin: "0 auto", width: "fit-content" }}>
        <Pagination
          count={count}
          page={currentPage}
          onChange={(event: React.ChangeEvent<unknown>, value: number) =>
            setCurrentPage(value)
          }
          color="primary"
        />
      </Stack>
    );
  }
);

PaginationBox.displayName = "PaginationBox";
