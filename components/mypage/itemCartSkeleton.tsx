import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { css } from "@emotion/react";

export const ItemCartSkeleton = () => {
  return (
    <Stack spacing={1} css={itemCartSkeletonBox}>
      <div className="itemCartSkeletonBox__box">
        <h4>{<Skeleton sx={{ fontSize: "2rem" }} />}</h4>
        <h5>{<Skeleton sx={{ fontSize: "1.5rem" }} />}</h5>
        <p>
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        </p>
        <span>
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        </span>
        <span>
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        </span>
        <span>
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        </span>

        <div className="itemCartSkeletonBox__img">
          <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
        </div>
      </div>
    </Stack>
  );
};

const itemCartSkeletonBox = css`
  .itemCartSkeletonBox__box {
    margin: 20px 0;
    padding: 20px;
    display: block;
    width: 100%;
    height: 680px;
    border: 3px solid #aaa;
    border-radius: 10px;

    @media (max-width: 768px) {
      height: 560px;
    }

    @media (max-width: 425px) {
      height: 460px;
    }
  }

  .itemCartSkeletonBox__img {
    margin: 20px auto;
    display: block;
    width: 60%;
    height: 360px;

    @media (max-width: 768px) {
      height: 240px;
    }

    @media (max-width: 768px) {
      height: 140px;
    }
  }
`;
