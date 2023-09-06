import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { css } from "@emotion/react";

export const ProfileSkeleton = () => {
  return (
    <Stack spacing={1}>
      <div css={profileSkeleton}>
        <Skeleton variant="circular" width={80} height={80} />
        <div className="profileSkeleton__name">
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        </div>
      </div>
      <div className="profileSkeleton__useDate">
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
      </div>
    </Stack>
  );
};

const profileSkeleton = css`
  display: flex;
  align-items: center;

  .profileSkeleton__name {
    margin-left: 18px;
    width: 14%;
  }

  .profileSkeleton__useDate {
    width: 30%;
  }
`;
