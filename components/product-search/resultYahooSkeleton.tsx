import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { css } from "@emotion/react";
import { Typography } from "@mui/material";

export const ResultYahooSkeleton = () => {
  return (
    <Stack spacing={1}>
      <div css={resultYahooSkeleton}>
        <h4>{<Skeleton sx={{ fontSize: "2rem" }} />}</h4>
        <h5>{<Skeleton sx={{ fontSize: "1.2rem" }} />}</h5>
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        <div className="resultYahooSkeleton__img">
          <Skeleton variant="rectangular" width={320} height={320} />
        </div>
      </div>
    </Stack>
  );
};

const resultYahooSkeleton = css`
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  width: 46%;

  h4 {
    width: 40%;
  }
  h5 {
    width: 30%;
  }
  .resultYahooSkeleton__img {
    margin: 20px auto;
    display: block;
    width: 60%;
    height: auto;
    object-fit: contain;
  }
`;
