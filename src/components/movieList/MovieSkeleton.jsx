import { Card, CardContent, Skeleton } from "@mui/material";

const MovieSkeleton = () => {
  return (
    <Card sx={{ width: 200 }}>
      <Skeleton variant="rectangular" height={300} />
      <CardContent>
        <Skeleton height={24} width="80%" />
        <Skeleton height={18} width="60%" />
      </CardContent>
    </Card>
  );
};

export default MovieSkeleton;
