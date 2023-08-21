import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function ProfileSkeleton() {
  return (
    <Stack spacing={1}>
      <div className="profileSkeleton">
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
}
