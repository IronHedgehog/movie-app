import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const MovieSkeletonList = ({ count = 6 }) => {
  return (
    <Stack spacing={2}>
      {Array.from({ length: count }).map((_, index) => (
        <Stack direction="row" spacing={2} key={index}>
          <Skeleton variant="rectangular" width={100} height={150} />
          <Stack spacing={1} flex={1}>
            <Skeleton variant="text" width="70%" height={28} />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="90%" />
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};

export default MovieSkeletonList;
