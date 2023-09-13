import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { css } from "@emotion/react";

export const ResultSkeleton = () => {
  return (
    <Stack spacing={1} css={resultSkeletonMain}>
      <div css={resultSkeleton}>
        <h4>{<Skeleton sx={{ fontSize: "2rem" }} />}</h4>
        <h5>{<Skeleton sx={{ fontSize: "1.2rem" }} />}</h5>
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        <div className="resultYahooSkeleton__img">
          <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
        </div>
      </div>
    </Stack>
  );
};

const resultSkeletonMain = css`
  width: 46%;

  @media (max-width: 768px) {
    margin: 0 auto;
    width: 100%;
    max-width: 600px;
  }

  @media (max-width: 425px) {
    height: 400px;
  }
`;

const resultSkeleton = css`
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  width: 100%;

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
    height: 300px;
    object-fit: contain;

    @media (max-width: 1024px) {
      height: 240px;
    }
  }
`;
