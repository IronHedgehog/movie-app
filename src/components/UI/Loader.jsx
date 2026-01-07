import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = () => (
  <Box display="flex" justifyContent="center" py={3}>
    <CircularProgress />
  </Box>
);

export default Loader;
